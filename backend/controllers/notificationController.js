const db = require("../config/db");

const getNotifications = (req, res) => {

    const user_id = req.user.id;

    const sql = `
        SELECT
            id,
            leave_id,
            message,
            is_read,
            created_at
        FROM notifications
        WHERE user_id = ?
        ORDER BY created_at DESC
    `;

    db.query(sql, [user_id], (err, results) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                message: "Failed to fetch notifications"
            });
        }

        res.status(200).json({
            notifications: results
        });
    });
};

module.exports = {
    getNotifications
};