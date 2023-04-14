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

  async getPathsFiles(req, res) {
    try {
      const files = await File.find({
        user: req.user.id,
        parent: req.query.parent,
        type: 'dir',
      }, { path: 1, _id: 1});
      return res.json(files);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Can not get files" });
    }
  }

  async getRecentlyUpdatedFiles(req, res) {
    try {
      const files = await File.find({
        user: req.user.id,
        parent: req.query.parent,
      }).sort({$natural:-1}).limit(4);
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
        path = `${process.env.FILE_PATH}\/${user._id}\/${parent.path}\/${
          file.name
        }`;
      } else {
        path = `${process.env.FILE_PATH}\/${user._id}\/${file.name}`;
      }

      if (fs.existsSync(path)) {
        return res.status(400).json({ message: "File already exist" });
      }

      file.mv(path);
      const type = file.name.split(".").pop();
      let filePath = file.name;
      if (parent) {
        filePath = parent.path + `\/${file.name}`
      }
      const dbFile = new File({
        name: file.name,
        type,
        size: file.size,
        path: filePath,
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

  async downloadFile(req,res) {
    try {
      const file = await File.findOne({_id: req.query.id, user: req.user.id});
      if (file) {
        const path = `${process.env.FILE_PATH}\/${req.user.id}\/${file.path}`;
        if (fs.existsSync(path)) {
          return res.download(path, file.name);
        }
      } else {
        return res.status(400).json({message: 'Download Error'});
      }
      
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Download error" });
    }
  }

  async uploadAvatar(req, res) {
    try {
      const file = req.files.file;
      const user = await User.findById(req.user.id);
      const fileType = file.name.split(".").pop();
      const avatarName = `${uuid.v4()}.${fileType}`;
      file.mv(process.env.STATIC_PATH + "\/" + avatarName);
      user.avatar = avatarName;
      await user.save();
      return res.json({ message: "Avatar was uploaded" });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Upload avatar error" });
    }
  }

  async deleteFile(req, res) {
    try {
      const file = await File.findOne({_id : req.query.id, user: req.user.id});
      if (!file) {
        return res.status(400).json('File not found');
      }
      fileService.deleteFile(file);
      await file.remove();
      return res.json({message: 'File was removed'});
    } catch (e) {
      console.log(e)
      return res.status(400).json({message: 'Dir is not empty'});
    }
  }
}

module.exports = new FileController();
