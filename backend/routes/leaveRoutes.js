const express = require("express");
const multer = require("multer");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");

const { applyLeave,getMyLeaves} = require("../controllers/leaveController");

// File storage configuration
const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    }

});

const upload = multer({ storage });

// Apply Leave
router.post(
    "/apply",
    verifyToken,
    authorizeRole("employee"),
    upload.single("document"),
    applyLeave
);
router.get(
    "/my-leaves",
    verifyToken,
    authorizeRole("employee"),
    getMyLeaves
);

module.exports = router;