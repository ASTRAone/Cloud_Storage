module.exports = class UserDto {
  email;
  id;
  diskSpace;
  usedSpace;
  isActivated;

  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.diskSpace = model.diskSpace;
    this.usedSpace = model.usedSpace;
    this.isActivated = model.isActivated;
  }
};
