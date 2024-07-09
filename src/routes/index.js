const express = require("express");
const router = express.Router();
const {registerUser} = require("../controller/auth_controller");

router.post("/register",registerUser);

module.exports = router;