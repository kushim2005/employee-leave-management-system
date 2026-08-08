const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");

const {
    applyLeave,
    getMyLeaves
} = require("../controllers/leaveController");

// =========================
// UPLOADS DIRECTORY
// =========================

const uploadDir = path.join(__dirname, "..", "uploads");

// Create uploads folder if it doesn't exist
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// =========================
// MULTER STORAGE
// =========================

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },

    filename: (req, file, cb) => {
        const uniqueName =
            Date.now() + "-" + file.originalname;

        cb(null, uniqueName);
    }
});

const upload = multer({
    storage: storage
});

// =========================
// APPLY LEAVE
// =========================

router.post(
    "/apply",
    verifyToken,
    authorizeRole("employee"),
    upload.single("document"),
    applyLeave
);

// =========================
// GET MY LEAVES
// =========================

router.get(
    "/my-leaves",
    verifyToken,
    authorizeRole("employee"),
    getMyLeaves
);

module.exports = router;