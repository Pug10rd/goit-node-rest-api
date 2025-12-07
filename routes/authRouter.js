import express from "express";
import validateBody from "../helpers/validateBody.js";
import { registrationSchema, loginSchema } from "../schemas/authSchemas.js";
import {
  registerController,
  loginController,
  getCurrentController,
  logoutController,
} from "../controllers/authControllers.js";
import authenticate from "../middlewares/authenticate.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(registrationSchema),
  registerController
);

authRouter.post("/login", validateBody(loginSchema), loginController);

authRouter.get("/current", authenticate, getCurrentController);

authRouter.post("/logout", authenticate, logoutController);

export default authRouter;
