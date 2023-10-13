const Recipe = require("../models/recipe");

exports.createRecipe = async (req, res) => {
  try {
    const { recipeName, ingredients, instruction, category, contentUrl } =
      req.body;
    const user = req.user;
    console.log(user);
    const recipe = await Recipe.create({
      recipeName,
      userId: user._id,
      ingredients,
      instruction,
      category,
      contentUrl,
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
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

exports.deleteRecipe = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

exports.getAllRecipe = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};
