module.exports = class UserDto {
  email;
  id;
  diskSpace;
  avatar;
  usedSpace;
  isActivated;
  language;
  name;
  surname;

  constructor(model) {
    this.email = model.email;
    this.name = model.name;
    this.surname = model.surname;
    this.id = model._id;
    this.avatar = model.avatar;
    this.diskSpace = model.diskSpace;
    this.usedSpace = model.usedSpace;
    this.isActivated = model.isActivated;
    this.language = model.language;
  }
};
