import express from "express";
import LogoutController from "../app/controllers/LogoutController.js";

const LogoutRouter = express.Router();
const logoutController = new LogoutController();

LogoutRouter.post("/logout", logoutController.logout);

export default LogoutRouter;