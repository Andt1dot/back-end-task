const authRouter = require("express").Router();
const userController = require("../../controller/usersController");
const { generateToken } = require("../../middleware/security");
const { validateUser, loginValidation } = require("../../middleware/validation");

//3.authentication with name/email and password, with sign-up and sign-in for bloggers, but only sign-in for admins
authRouter.post("/register",validateUser, userController.createNewUser);
authRouter.post("/login", loginValidation, generateToken);

module.exports = authRouter;
