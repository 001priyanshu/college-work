const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      error: "you must be logged in",
    });
  }
  const token = authorization.replace("Bearer ", "");

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({
        error: "you must be logged in",
      });
    }
    const { _id } = payload;
    User.findById(_id, (err, user) => {
      if (err) {
        console.log("Error in requireLogin middleware");
        return res.json({
          error: err,
        });
      }
      req.user = user;
      next();
    });
  });
};
