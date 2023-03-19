const UserModel = require('../models/User');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const MailService = require('../services/mailService');
const TokenService = require('../services/tokenService');
const UserDto = require('../dtos/userDto');

class UserService {
    async registration(email, password) {
        const candidate = await UserModel.findOne({ email });
        if (candidate) {
            throw new Error(`User with email ${email} already exists`);
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const activationLink = uuid.v4();

        const user = await UserModel.create({ email, password: hashPassword, activationLink });
        await MailService.sendActivationMail( email, activationLink );

        const userDto = new UserDto(user);
        const tokens = await TokenService.generateTokens({...userDto});
        console.log('token', tokens)
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }
}

module.exports = new UserService();