const Router = require("express");
const router = new Router();
const { body } = require("express-validator");
const authMiddleware = require("../middleware/auth.middleware");
const fileController = require("../controllers/fileController");
const UserController = require("../controllers/userController");

//Authorization
router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  UserController.registration
);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);

//folder
router.post("/file", authMiddleware, fileController.createDir);

//email activator
router.get("/activate/:link", UserController.activate);

//token refresh
router.get("/refresh", UserController.refresh);

//users
router.get("/users", authMiddleware, UserController.getUsers);
router.get("/user", authMiddleware, UserController.getUser);
router.post("/user/update", authMiddleware, UserController.postUser);
router.post("/changeLanguage", authMiddleware, UserController.postLanguage);

//CRUD files
router.get("/files", authMiddleware, fileController.getFiles);
router.get("/breadcrumbs", authMiddleware, fileController.getBreadcrumbs);
router.get("/paths_files", authMiddleware, fileController.getPathsFiles);
router.get("/recently_files", authMiddleware, fileController.getRecentlyUpdatedFiles);
router.get("/files/download", authMiddleware, fileController.downloadFile);
router.get('/files/search', authMiddleware, fileController.searchFile);
router.post("/files/upload", authMiddleware, fileController.uploadFile);
router.delete("/files/delete", authMiddleware, fileController.deleteFile);
router.post('/files/avatar', authMiddleware, fileController.uploadAvatar);

module.exports = router;
