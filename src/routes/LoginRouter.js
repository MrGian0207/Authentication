import LoginController from "../app/controllers/LoginController.js";
import express from 'express';

const LoginRouter = express.Router();
const loginController = new LoginController();


LoginRouter.post("/authentication", loginController.authentication);
LoginRouter.get("/login", loginController.login);

export default LoginRouter;