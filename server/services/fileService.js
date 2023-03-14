const fs = require("fs");
const File = require("../models/File");
const config = require("config");

class FileService {
  createDir(file) {
    const filePath = `${config.get("filePath")}\\${file.user}\\${file.path}`;
    console.log('filePath', fs.mkdirSync(filePath))
    return new Promise((resolve, reject) => {
      try {
        // TODO разобраться почему не создается файл
        if (!fs.existsSync(filePath)) {
          fs.mkdtempSync(filePath);
          return resolve({ message: "File was created" });
        } else {
          return reject({ message: "File already exist" });
        }
      } catch (error) {
        return reject({ message: "File error" });
      }
    });
  }
}

module.exports = new FileService();
