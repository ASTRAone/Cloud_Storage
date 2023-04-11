const UserModel = require("../models/User");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const MailService = require("../services/mailService");
const TokenService = require("../services/tokenService");
const UserDto = require("../dtos/userDto");
const ApiError = require("../exceptions/apiError");
const File = require("../models/File");
const FileService = require("../services/fileService");

class UserService {
  async registration(email, password, language) {
    console.log('language: ' + language);
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequestError(`User with email ${email} already exists`);
    }
    const hashPassword = await bcrypt.hash(password, 8);
    const activationLink = uuid.v4();

    const user = await UserModel.create({
      email,
      password: hashPassword,
      activationLink,
      language,
    });
    user.save();
    // await MailService.sendActivationMail(
    //   email,
    //   `${process.env.API_URL}/api/activate/${activationLink}`
    // );

    const userDto = new UserDto(user);
    await FileService.createDir(new File({user: user.id, name: ''}));
    const tokens = await TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }
  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequestError("Activation link is invalid");
    }
    user.isActivated = true;
    await user.save();
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw ApiError.BadRequestError("User not found");
    }
    const isPassEquals = await bcrypt.compare(password, user.password);

    if (!isPassEquals) {
      throw ApiError.BadRequestError("Invalid password");
    }
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });

    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnathorizedError("Invalid refresh token");
    }
    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await TokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnathorizedError("Invalid refresh token");
    }

    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });

    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }

  async changeLanguage(user, language) {
    if (!user) {
      throw ApiError.BadRequestError("User not found");
    }
    user.language = language;
    await user.save();

    return {
      user
    };
  }
}

module.exports = new UserService();
