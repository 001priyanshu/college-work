const Recipe = require("../models/recipe");
const User = require("../models//user");
const Comment = require("../models/comment");
const { use } = require("../routes/recipe");

exports.createRecipe = async (req, res) => {
  try {
    const { name, description, ingredients, instructions, imageUrl, mealType } =
      req.body;
    const user = req.user;
    const recipe = await Recipe.create({
      name,
      userId: user._id,
      ingredients,
      instructions,
      description,
      imageUrl,
      mealType,
    });

    await recipe.save();
    return res.status(200).json({
      message: "Successfully created recipe!",
      recipe,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

exports.updateRecipe = async (req, res) => {
  try {
    const { recipeName, ingredients, instruction, category, contentUrl } =
      req.body;

    const { id } = req.params;
    const recipe = await Recipe.findById({ _id: id });
    recipe.recipeName = recipeName;
    recipe.ingredients = ingredients;
    recipe.instruction = instruction;
    recipe.contentUrl = contentUrl;
    recipe.category = category;

    await recipe.save();
    return res.status(200).json({
      message: "Successfully updated recipe!",
      recipe,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

exports.deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    await Recipe.findByIdAndDelete({ _id: id });
    await Comment.deleteMany({ recipeId: id });
    const userId = req.user._id;
    const user = await User.findById(userId);
    user.favRecipes = user.favRecipes.filter((Id) => String(Id) !== String(id));
    await user.save();

    return res.status(200).json({
      message: "Successfully deleted recipe!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

exports.getAllRecipe = async (req, res) => {
  try {
    const allRecipes = await Recipe.find({});
    return res.status(200).json({
      message: "Success!",
      allRecipes,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

exports.getMyRecipe = async (req, res) => {
  try {
    const user = req.user;
    const allRecipes = await Recipe.find({ userId: user._id });
    return res.status(200).json({
      message: "Success!",
      allRecipes,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};
