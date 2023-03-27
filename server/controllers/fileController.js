const fileService = require("../services/fileService");
const User = require("../models/User");
const File = require("../models/File");
const fs = require("fs");
const uuid = require("uuid");

class FileController {
  async createDir(req, res) {
    try {
      const { name, type, parent } = req.body;
      const file = new File({ name, type, parent, user: req.user.id });
      const parentFile = await File.findOne({ _id: parent });
      if (!parentFile) {
        file.path = name;
        await fileService.createDir(file);
      } else {
        // change to windows
        // file.path = `${parentFile.path}//${file.name}`;
        file.path = `${parentFile.path}\/${file.name}`;
        await fileService.createDir(file);
        parentFile.childs.push(file._id);
        await parentFile.save();
      }
      await file.save();
      return res.json(file);
    } catch (e) {
      console.log(e);
      return res.status(400).json(e);
    }
  }

  async getFiles(req, res) {
    try {
      const files = await File.find({
        user: req.user.id,
        parent: req.query.parent,
      });
      return res.json(files);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Can not get files" });
    }
  }

  async uploadFile(req, res) {
    try {
      const file = req.files.file;
      const parent = await File.findOne({
        user: req.user.id,
        _id: req.body.parent,
      });
      const user = await User.findOne({ _id: req.user.id });

      if (user.usedSpace + file.size > user.diskSpace) {
        return res.status(400).json({ message: "There no space on the disk" });
      }

      user.usedSpace = user.usedSpace + file.size;
      let path;

      if (parent) {
        // change to windows
        path = `${process.env.FILE_PATH}\\${user._id}\\${parent.path}\\${file.name}`;
        // path = `${process.env.FILE_PATH}\/${user._id}\/${parent.path}\/${
        //   file.name
        // }`;
      } else {
        // change to windows
        path = `${process.env.FILE_PATH}}\\${user._id}\\${file.name}`;
        // path = `${process.env.FILE_PATH}\/${user._id}\/${file.name}`;
      }

      if (fs.existsSync(path)) {
        return res.status(400).json({ message: "File already exist" });
      }

      file.mv(path);
      const type = file.name.split(".").pop();
      const dbFile = new File({
        name: file.name,
        type,
        size: file.size,
        path: parent?.path,
        parent: parent?._id,
        user: user._id,
      });

      await dbFile.save();
      await user.save();

      return res.json(dbFile);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Upload error" });
    }
  }

  async uploadAvatar(req, res) {
    try {
      const file = req.files.file;
      const user = await User.findById(req.user.id);
      const fileType = file.name.split(".").pop();
      const avatarName = `${uuid.v4()}.${fileType}`;
      file.mv(process.env.STATIC_PATH + "\\" + avatarName);
      user.avatar = avatarName;
      await user.save();
      return res.json({ message: "Avatar was uploaded" });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Upload avatar error" });
    }
  }
}

module.exports = new FileController();
