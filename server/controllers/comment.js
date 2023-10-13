const Recipe = require("../models/recipe");

exports.addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const recipes = await Recipe.find({ userId: user._id });
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
