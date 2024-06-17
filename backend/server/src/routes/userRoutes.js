const express = require("express");
const router = express.Router();
const { getUsers } = require("../controllers/userController");
const { authenticate } = require("../middlewares/authenticationMiddleware");

router.get("/users", authenticate, getUsers);

module.exports = router;
