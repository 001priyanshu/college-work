const express = require("express");
const router = express.Router();
const authentication = require("../middleware/auth");
const { login, register, addFavRecipe } = require("../controllers/user");

router.post("/signin", login);
router.post("/signup", register);
router.put("/addFavRecipe/:id", addFavRecipe);
router.delete("/removeFavRecipe/:id", addFavRecipe);

module.exports = router;
