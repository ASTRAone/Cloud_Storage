const Router = require("express");
const router = new Router();
const { body } = require("express-validator");
const authMiddleware = require("../middleware/auth.middleware");
const fileController = require("../controllers/fileController");
const UserController = require("../controllers/userController");

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  UserController.registration
);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.post("/file", authMiddleware, fileController.createDir);
router.post("/files/upload", authMiddleware, fileController.uploadFile);
router.post('/files/avatar', authMiddleware, fileController.uploadAvatar);
router.get("/activate/:link", UserController.activate);
router.get("/refresh", UserController.refresh);
router.get("/users", authMiddleware, UserController.getUsers);
router.get("/user", authMiddleware, UserController.getUser);
router.get("/files", authMiddleware, fileController.getFiles);
router.get("/files/download", authMiddleware, fileController.downloadFile);

module.exports = router;
