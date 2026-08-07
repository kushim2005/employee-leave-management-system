const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register User
const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if username already exists
        db.query(
            "SELECT * FROM users WHERE username = ?",
            [username],
            async (err, result) => {
                if (err) {
                    return res.status(500).json(err);
                }

                if (result.length > 0) {
                    return res.status(400).json({
                        message: "Username already exists",
                    });
                }

                // Encrypt password
                const hashedPassword = await bcrypt.hash(password, 10);

                // Insert user
                db.query(
                    "INSERT INTO users(username,password) VALUES(?,?)",
                    [username, hashedPassword],
                    (err) => {
                        if (err) {
                            return res.status(500).json(err);
                        }

                        res.status(201).json({
                            message: "Registration Successful",
                        });
                    }
                );
            }
        );
    } catch (error) {
        res.status(500).json(error);
    }
};
const login = (req, res) => {

    const { username, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE username = ?",
        [username],
        async (err, result) => {

            if (err)
                return res.status(500).json(err);

            if (result.length === 0) {
                return res.status(401).json({
                    message: "Invalid Username or Password"
                });
            }

            const user = result[0];

            const isMatch = await bcrypt.compare(
                password,
                user.password
            );

            if (!isMatch) {
                return res.status(401).json({
                    message: "Invalid Username or Password"
                });
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    role: user.role
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1d"
                }
            );

            res.status(200).json({
                message: "Login Successful",
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    role: user.role
                }
            });

        }
    );

};

module.exports = {
    register,
    login
};