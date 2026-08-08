const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// =========================
// REGISTER USER
// =========================
const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        console.log("========== REGISTER START ==========");
        console.log("Username:", username);
        console.log("Password received:", !!password);

        // Validate input
        if (!username || !password) {
            return res.status(400).json({
                message: "Username and password are required"
            });
        }

        // Check if username already exists
        console.log("CHECKING USERNAME IN DATABASE...");

        db.query(
            "SELECT * FROM users WHERE username = ?",
            [username],
            async (err, result) => {

                if (err) {
                    console.error("SELECT ERROR:", err);

                    return res.status(500).json({
                        message: "Database error while checking username",
                        error: err.message,
                        code: err.code
                    });
                }

                console.log(
                    "SELECT SUCCESS. Users found:",
                    result.length
                );

                // Username already exists
                if (result.length > 0) {
                    return res.status(400).json({
                        message: "Username already exists"
                    });
                }

                // Encrypt password
                console.log("HASHING PASSWORD...");

                try {
                    const hashedPassword = await bcrypt.hash(
                        password,
                        10
                    );

                    console.log("PASSWORD HASHED SUCCESSFULLY");

                    // Insert user
                    console.log("INSERTING USER INTO DATABASE...");

                    db.query(
                        "INSERT INTO users (username, password) VALUES (?, ?)",
                        [username, hashedPassword],
                        (err, result) => {

                            if (err) {
                                console.error(
                                    "INSERT ERROR:",
                                    err
                                );

                                return res.status(500).json({
                                    message: "Database error while creating user",
                                    error: err.message,
                                    code: err.code
                                });
                            }

                            console.log(
                                "USER INSERTED SUCCESSFULLY. ID:",
                                result.insertId
                            );

                            console.log(
                                "========== REGISTER SUCCESS =========="
                            );

                            return res.status(201).json({
                                message: "Registration Successful"
                            });
                        }
                    );

                } catch (hashError) {
                    console.error(
                        "PASSWORD HASH ERROR:",
                        hashError
                    );

                    return res.status(500).json({
                        message: "Password hashing failed",
                        error: hashError.message
                    });
                }
            }
        );

    } catch (error) {
        console.error("REGISTER CATCH ERROR:", error);

        return res.status(500).json({
            message: "Registration failed",
            error: error.message
        });
    }
};


// =========================
// LOGIN USER
// =========================
const login = (req, res) => {

    const { username, password } = req.body;

    console.log("========== LOGIN START ==========");
    console.log("Username:", username);

    db.query(
        "SELECT * FROM users WHERE username = ?",
        [username],
        async (err, result) => {

            if (err) {
                console.error("LOGIN DATABASE ERROR:", err);

                return res.status(500).json({
                    message: "Database error",
                    error: err.message
                });
            }

            if (result.length === 0) {
                return res.status(401).json({
                    message: "Invalid Username or Password"
                });
            }

            const user = result[0];

            try {
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

                console.log("LOGIN SUCCESS:", username);

                return res.status(200).json({
                    message: "Login Successful",
                    token,
                    user: {
                        id: user.id,
                        username: user.username,
                        role: user.role
                    }
                });

            } catch (error) {
                console.error("LOGIN PASSWORD ERROR:", error);

                return res.status(500).json({
                    message: "Login failed",
                    error: error.message
                });
            }
        }
    );
};


// =========================
// EXPORT
// =========================
module.exports = {
    register,
    login
};