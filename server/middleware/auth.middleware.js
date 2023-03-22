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