module.exports = class UserDto {
  email;
  id;
  diskSpace;
  avatar;
  usedSpace;
  isActivated;

  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.avatar = model.avatar;
    this.diskSpace = model.diskSpace;
    this.usedSpace = model.usedSpace;
    this.isActivated = model.isActivated;
  }
};
