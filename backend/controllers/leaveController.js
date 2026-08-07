const db = require("../config/db");

const applyLeave = (req, res) => {

    const { reason, start_date, end_date } = req.body;

    const user_id = req.user.id;

    if (!reason || !start_date || !end_date) {
        return res.status(400).json({
            message: "Reason, start date and end date are required"
        });
    }

    if (new Date(start_date) > new Date(end_date)) {
        return res.status(400).json({
            message: "End date cannot be before start date"
        });
    }

    const document = req.file ? req.file.filename : null;

    const sql = `
        INSERT INTO leave_requests
        (user_id, reason, start_date, end_date, document)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [user_id, reason, start_date, end_date, document],
        (err, result) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    message: "Failed to submit leave request"
                });
            }

            res.status(201).json({
                message: "Leave request submitted successfully",
                leave_id: result.insertId
            });
        }
    );
};
const getMyLeaves = (req, res) => {

    const user_id = req.user.id;

    const sql = `
        SELECT
            id,
            reason,
            start_date,
            end_date,
            document,
            status,
            remarks,
            created_at
        FROM leave_requests
        WHERE user_id = ?
        ORDER BY created_at DESC
    `;

    db.query(sql, [user_id], (err, results) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                message: "Failed to fetch leave history"
            });
        }

        res.status(200).json({
            leaves: results
        });

    });
};

module.exports = {
    applyLeave,
    getMyLeaves
};