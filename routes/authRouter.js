import express from "express";
import validateBody from "../helpers/validateBody.js";
import { registrationSchema, loginSchema } from "../schemas/authSchemas.js";
import {
  registerController,
  loginController,
  getCurrentController,
  logoutController,
  updateAvatarController,
} from "../controllers/authControllers.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  upload.single("avatar"),
  validateBody(registrationSchema),
  registerController
);

authRouter.post("/login", validateBody(loginSchema), loginController);

authRouter.get("/current", authenticate, getCurrentController);

authRouter.post("/logout", authenticate, logoutController);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  updateAvatarController
);

export default authRouter;
