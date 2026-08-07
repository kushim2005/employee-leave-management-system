const db = require("../config/db");

const getEmployees = (req, res) => {

    const sql = `
        SELECT id, username, created_at
        FROM users
        WHERE role = 'employee'
        ORDER BY created_at DESC
    `;

    db.query(sql, (err, results) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                message: "Failed to fetch employees"
            });
        }

        res.status(200).json({
            employees: results
        });

    });
};
const getAllLeaves = (req, res) => {

    const sql = `
        SELECT
            leave_requests.id,
            users.username,
            leave_requests.reason,
            leave_requests.start_date,
            leave_requests.end_date,
            leave_requests.document,
            leave_requests.status,
            leave_requests.remarks,
            leave_requests.created_at
        FROM leave_requests
        JOIN users
            ON leave_requests.user_id = users.id
        ORDER BY leave_requests.created_at DESC
    `;

    db.query(sql, (err, results) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                message: "Failed to fetch leave requests"
            });
        }

        res.status(200).json({
            leaves: results
        });

    });
};
const updateLeaveStatus = (req, res) => {

    const { id } = req.params;
    const { status, remarks } = req.body;

    if (!status || !["Approved", "Rejected"].includes(status)) {
        return res.status(400).json({
            message: "Status must be Approved or Rejected"
        });
    }

    // First find which employee submitted this leave
    const findLeaveSql = `
        SELECT user_id
        FROM leave_requests
        WHERE id = ?
    `;

    db.query(findLeaveSql, [id], (err, leaveResults) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                message: "Failed to find leave request"
            });
        }

        if (leaveResults.length === 0) {
            return res.status(404).json({
                message: "Leave request not found"
            });
        }

        const user_id = leaveResults[0].user_id;

        // Update leave status
        const updateSql = `
            UPDATE leave_requests
            SET status = ?, remarks = ?
            WHERE id = ?
        `;

        db.query(
            updateSql,
            [status, remarks || null, id],
            (err, result) => {

                if (err) {
                    console.error(err);

                    return res.status(500).json({
                        message: "Failed to update leave status"
                    });
                }

                // Create notification
                const message =
                    status === "Approved"
                        ? "Your leave request has been approved."
                        : "Your leave request has been rejected.";

                const notificationSql = `
                    INSERT INTO notifications
                    (user_id, leave_id, message)
                    VALUES (?, ?, ?)
                `;

                db.query(
                    notificationSql,
                    [user_id, id, message],
                    (err) => {

                        if (err) {
                            console.error(err);

                            return res.status(500).json({
                                message: "Leave updated but notification failed"
                            });
                        }

                        res.status(200).json({
                            message: `Leave request ${status.toLowerCase()} successfully`
                        });

                    }
                );
            }
        );
    });
};

module.exports = {
    getEmployees,
    getAllLeaves,
    updateLeaveStatus
};