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
router.get("/activate/:link", UserController.activate);
router.get("/refresh", UserController.refresh);
router.get("/users", authMiddleware, UserController.getUsers);
router.get("/files", authMiddleware, fileController.getFiles);
router.post("/upload", authMiddleware, fileController.uploadFile);

module.exports = router;
