const ApiError = require('../exceptions/apiError');
const tokenService = require('../services/tokenService');

module.exports = function (req,res,next) {
  try {
<<<<<<< HEAD
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Auth error" });
=======
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnathorizedError());
>>>>>>> c73417a (added middleware checker token)
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

