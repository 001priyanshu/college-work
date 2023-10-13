const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    recipeName: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    ingredients: [
      {
        type: String,
      },
    ],
    instruction: String,
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    contentUrl: String,
    category: String,
  },
  {
    timestamps: true,
  }
);
const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
