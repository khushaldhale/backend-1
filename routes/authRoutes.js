const express = require("express");
const { login, signup, logout } = require("../controllers/user");
const router = express.Router();


router.post("/signup", signup);
router.post("/signin", login);
router.get("/signout", logout)

module.exports = router