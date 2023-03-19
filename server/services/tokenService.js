const config = require('../config/default.json');
const tokenModel = require('../models/Token');
const jwt = require('jsonwebtoken');

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, config.secretKey, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, config.secretRefreshKey, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, config.secretKey);
            return userData;
        } catch (error) {

        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, config.secretRefreshKey);
            return userData;
        } catch (error) {
            
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await tokenModel.findOne({user: userId})
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await tokenModel.create({user: userId, refreshToken});
        return token;
    }

    async removeToken(refreshToken) {
        const tokenData = await tokenModel.deleteOne({refreshToken});
        return tokenData;
    }

    async findToken(refreshToken) {
        const tokenData = await tokenModel.findOne({refreshToken});
        return tokenData;
    }
}

module.exports = new TokenService();