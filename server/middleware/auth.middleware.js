const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  if (req.methods === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log("token", token);
    if (!token) {
      return res.status(401).json({ message: "Auth error" });
    }

    const decoded = jwt.verify(token, config.get("secretKey"));
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Auth error" });
  }
};
