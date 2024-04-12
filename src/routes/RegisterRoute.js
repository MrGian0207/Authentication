import RegisterController from "../app/controllers/RegisterController.js";
import express from "express";

const RegisterRouter = express.Router(); 
const registerController = new RegisterController();


RegisterRouter.post("/store", registerController.store);
RegisterRouter.get("/register", registerController.register);

export default RegisterRouter;

