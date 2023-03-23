const fs = require("fs");

class FileService {
  createDir(file) {
    // change to windows
    // const filePath = `${config.get(process.env.FILE_PATH)}\\${file.user}\\${file.path}`;
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
}

module.exports = new FileService();
