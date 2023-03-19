const Router = require("express");
const UserController = require("../controllers/userController");
const User = require("../models/User");
const router = new Router();
const jwt = require("jsonwebtoken");
const { check, validationResult, body } = require("express-validator");
const bcrypt = require("bcryptjs");
const config = require("config");
const authMiddleware = require("../middleware/auth.middleware");

router.post('/registration',
    body("email").isEmail(),
    body("password").isLength({ min: 3, max: 32 }),
    UserController.registration,
);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/activate/:link', UserController.activate);
router.get('/refresh', UserController.refresh);
router.get('/users', authMiddleware, UserController.getUsers);


module.exports = router;
