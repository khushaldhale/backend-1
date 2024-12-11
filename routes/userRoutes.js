const express = require("express");
const { authentication, isAdmin } = require("../middlewares/authentication");
const { getAllUsers } = require("../controllers/user");
const router = express.Router();



router.get("/", authentication, isAdmin, getAllUsers)

module.exports = router