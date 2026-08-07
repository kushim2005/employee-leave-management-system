const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");
const {
    getEmployees,getAllLeaves,updateLeaveStatus
} = require("../controllers/managerController");


router.get(
    "/dashboard",
    verifyToken,
    authorizeRole("manager"),
    (req, res) => {

        res.json({
            message: "Welcome Manager!",
            user: req.user
        });

    }
);
router.get(
    "/employees",
    verifyToken,
    authorizeRole("manager"),
    getEmployees
);
router.get(
    "/leaves",
    verifyToken,
    authorizeRole("manager"),
    getAllLeaves
);
router.put(
    "/leaves/:id/status",
    verifyToken,
    authorizeRole("manager"),
    updateLeaveStatus
);
module.exports = router;

module.exports = router;