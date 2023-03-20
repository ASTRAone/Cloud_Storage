const ApiError = require('../exceptions/apiError');
const tokenService = require('../services/tokenService');

module.exports = function (req,res,next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnathorizedError());
    }

    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      return next(ApiError.UnathorizedError());
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if(!userData) {
      return next(ApiError.UnathorizedError());
    }

    req.user = userData;
    next();
  } catch (e) {
    return next(ApiError.UnathorizedError())
  }
}

// const jwt = require("jsonwebtoken");
// const config = require("config");

// module.exports = (req, res, next) => {
//   if (req.methods === "OPTIONS") {
//     return next();
//   }

//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     console.log("token", token);
//     if (!token) {
//       return res.status(401).json({ message: "Auth error" });
//     }

//     const decoded = jwt.verify(token, config.get("secretKey"));
//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Auth error" });
//   }
// };

