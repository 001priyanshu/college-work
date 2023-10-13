const express = require("express");
const router = express.Router();
const requireLogin = require("../middleware/auth");
const {
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getAllRecipe,
} = require("../controllers/recipe");

router.post("/createRecipe", createRecipe);
router.post("/updateRecipe", updateRecipe);
router.post("/deleteRecipe", deleteRecipe);
router.post("/getAllRecipes", getAllRecipe);

module.exports = router;
