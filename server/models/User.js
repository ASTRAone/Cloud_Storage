const { Schema, model, ObjectId } = require("mongoose");

const User = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  diskSpace: { type: Number, default: 1024 ** 3 * 10 },
  usedSpace: { type: Number, required: true, default: 0 },
  avatar: { type: String },
  files: [{ type: ObjectId, ref: "File" }],
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
  language: { type: String, default: 'en-US'},
  name: { type: String, required: true, default: false },
  surname: { type: String, required: true, default: false }
});

module.exports = model("User", User);
