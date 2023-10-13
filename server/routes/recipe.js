const express = require("express");
const router = express.Router();
const authentication = require("../middleware/auth");
const {
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getAllRecipe,
} = require("../controllers/recipe");

router.post("/createRecipe", authentication, createRecipe);
router.post("/updateRecipe", authentication, updateRecipe);
router.get("/deleteRecipe/:id", authentication, deleteRecipe);
router.get("/getAllRecipes", authentication, getAllRecipe);

module.exports = router;
