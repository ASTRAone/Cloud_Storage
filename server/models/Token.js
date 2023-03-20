const {Schema, model} = require('mongoose');

const Token = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    refreshToken: {type: String, default: false},
})

module.exports = model('Token', Token);