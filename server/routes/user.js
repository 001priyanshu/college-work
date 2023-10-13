const express = require("express");
const router = express.Router();
const requireLogin = require("../middleware/auth");
const { login, register } = require("../controllers/user");

router.post("/signin", login);
router.post("/signup", register);
router.post("/addFavRecipe", register);

module.exports = router;
