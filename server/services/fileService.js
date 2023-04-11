const fs = require("fs");

class FileService {
  createDir(file) {
    const filePath = `${process.env.FILE_PATH}\/${file.user}\/${file.path}`;
    return new Promise((resolve, reject) => {
      try {
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath);
          return resolve({ message: "File was created" });
        } else {
          return reject({ message: "File already exist" });
        }
      } catch (e) {
        return reject({ message: "File error" });
      }
    });
  }

  deleteFile(file) {
    const path = this.getPath(file);
    if (file.type === 'dir') {
      fs.rmSync(path, {recursive: true})
    } else {
      fs.unlinkSync(path)
    }
  }

  getPath(file) {
    return `${process.env.FILE_PATH}\/${file.user}\/${file.path}`;
  }
}

module.exports = new FileService();
