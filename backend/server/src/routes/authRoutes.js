const express = require("express");
const router = express.Router();
const { login, create_user } = require("../controllers/authController");

router.post("/login", login);
router.post("/create_user", create_user);

module.exports = router;
