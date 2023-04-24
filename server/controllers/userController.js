const userService = require("../services/userService");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/apiError");
const User = require("../models/User");
const UserModel = require("../models/User");
const omit = require("lodash/omit");
class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequestError("Error validation", errors.array())
        );
      }
      const { email, password, language, name, surname } = req.body;
      const userData = await userService.registration(email, password, language, name, surname);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (error) {
      next(error);
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json({accessToken: userData.accessToken, refreshToken: userData.refreshToken});
    } catch (error) {
      next(error);
    }
  }

  async getUser(req, res, next) {
    try {
      const user = await User.findOne({ _id: req.user.id });
      const omittedUser = omit( user.toObject(), ["password", "activationLink", "files"]);
      return res.json(omittedUser);
    } catch (error) {
      next(error);
    }
  }

  async postUser(req, res, next) {
    try {
      const { email } = req.body;
      // const doesEmailExist = await User.findOne({ email });
      // if (doesEmailExist) {
      //   throw ApiError.BadRequestError(`Email already exists ${email}`);
      // }
      const user = await UserModel.findOneAndUpdate({ _id: req.user.id
      }, {$set: req.body}, {new: true});
      if (!user) {
        throw ApiError.BadRequestError(`Error operation with ${email}`);
      }
      const omittedUser = omit( user.toObject(), ["password", "activationLink", "files"]);
      return res.json(omittedUser);
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (error) {
      next(error);
    }
  }


  async postLanguage(req, res, next) {
    try {
      const user = await User.findOne({ _id: req.user.id });
      console.log('user ', user);
      const { language } = req.body;
      const userData = await userService.changeLanguage(user, language);
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

}

module.exports = new UserController();
