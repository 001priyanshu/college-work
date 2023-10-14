const express = require("express");
const router = express.Router();
const authentication = require("../middleware/auth");
const { login, register, addFavRecipe,removeFavRecipe,getFavoriteRecipes } = require("../controllers/user");

router.post("/signin", login);
router.post("/signup", register);
router.put("/addFavRecipe/:id", addFavRecipe);
router.delete("/removeFavRecipe/:id", removeFavRecipe);

router.get("/favoriteRecipes/:id",getFavoriteRecipes);
module.exports = router;
