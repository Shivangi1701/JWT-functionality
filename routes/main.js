const express = require("express");
const router = express.Router();

const { login, dashboard } = require("../controllers/main");

const authMiddleware = require("../middleware/auth");

router.route("/dashboard").get(authMiddleware, dashboard); // protected by authorization
router.route("/login").post(login); // full public access

module.exports = router;
