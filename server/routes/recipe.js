const express = require("express");
const router = express.Router();
const authentication = require("../middleware/auth");
const {
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getAllRecipe,
  getMyRecipe,
} = require("../controllers/recipe");


router.post("/createRecipe", createRecipe);
router.put("/updateRecipe/:id", authentication, updateRecipe);
router.delete("/deleteRecipe/:id", deleteRecipe);
router.get("/getAllRecipes", getAllRecipe);
router.get("/getMyRecipes", authentication, getMyRecipe);

module.exports = router;
