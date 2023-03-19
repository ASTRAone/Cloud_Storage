const UserModel = require('../models/User');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const MailService = require('../services/mailService');
const TokenService = require('../services/tokenService');
const UserDto = require('../dtos/userDto');
const config = require('../config/default.json');
const activate = require('../controllers/userController');
const ApiError = require('../exceptions/apiError');

class UserService {
    async registration(email, password) {
        const candidate = await UserModel.findOne({ email });
        if (candidate) {
            throw ApiError.BadRequestError(`User with email ${email} already exists`);
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const activationLink = uuid.v4();

        const user = await UserModel.create({ email, password: hashPassword, activationLink });
        await MailService.sendActivationMail( email, `${config.api_url}/api/active/${activationLink}`);

        const userDto = new UserDto(user);
        const tokens = await TokenService.generateTokens({...userDto});
        console.log('token', tokens)
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
        }
        async activate(activationLink) {
            const user = await UserModel.findOne({ activationLink });
            if (!user) {
                throw ApiError.BadRequestError('Activation link is invalid');
            }
            user.isActivated = true;
            await user.save();
        }

        async login(email, password) {
            const user = await UserModel.findOne({ email });

            if (!user) {
                throw ApiError.BadRequestError('User not found');
            }
            const isPassEquals = await bcrypt.compare(password, user.password);

            if(!isPassEquals) {
                throw ApiError.BadRequestError('Invalid password');
            }
            const userDto = new UserDto(user);
            const tokens = TokenService.generateTokens({...userDto});

            await TokenService.saveToken(userDto.id, tokens.refreshToken);

            return {
                ...tokens,
                user: userDto
            }
        }

        async logout(refreshToken) {
            const token = await TokenService.removeToken(refreshToken);
            return token;
        }
}

module.exports = new UserService();