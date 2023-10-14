const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Invalid email or password",
      });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    const isPasswordValid = bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      return res.status(200).json({
        message: "User Successfully logged In",
        token,
        user: user,
      });
    } else {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      email: email,
      password: hashedPassword,
      name: name,
      favRecipe: [],
    });

    await newUser.save();

    return res.status(201).json({
      message: "Signup successful",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

exports.addFavRecipe = async (req, res) => {
  
  console.log("fav");
  try {
    // console.log("******");
    const requestBody = JSON.parse(req.body.userID);
    const userId =requestBody._id;
    const  id  = req.body.recipeID;
  
   
 
    const loggedInUser = await User.findById({ _id:userId });
    loggedInUser.favRecipes.push(id);
  
    loggedInUser.save();
    return res.status(200).json({
      message: "Success!",
      favoriteRecipes:loggedInUser.favRecipes,
    });
  } catch (error) {
    
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

exports.removeFavRecipe = async (req, res) => {
  
  
  console.log("removeFav");

  try {

   const userId = JSON.parse(req.body.userID)
   const recipeId = req.body.recipeID
    // console.log(user._id,"UU")
    // console.log(recipe,"RR");  
  
    const loggedInUser = await User.findById(userId);
    loggedInUser.favRecipes = loggedInUser.favRecipes.filter((recipe) => recipe.toString() !== recipeId);
    await loggedInUser.save();

    return res.status(200).json({
      message: "Removed from favorites successfully!",
      favoriteRecipes: loggedInUser.favRecipes,
    });
  } catch (error) {
    console.log(error,"EEE");
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};
exports.getFavoriteRecipes = async (req, res) => {
  console.log("III");
  try {
    const userID = req.params; // Get the user ID from the URL parameter
     

    const loggedInUser = await User.findById(userID.id);
  
    if (!loggedInUser) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    const favoriteRecipes = loggedInUser.favRecipes;
    
    return res.status(200).json({
      favoriteRecipes,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};
