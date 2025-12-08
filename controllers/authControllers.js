import path from "node:path";
import {
  loginUser,
  logoutUser,
  refreshUser,
  registerUser,
  updateAvatar,
} from "../services/authServices.js";

import fs from "fs/promises";

export const registerController = async (req, res) => {
  const newUser = await registerUser(req.body, req.file);

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

export const loginController = async (req, res) => {
  const result = await loginUser(req.body);

  res.json(result);
};

export const getCurrentController = async (req, res) => {
  const result = await refreshUser(req.user);

  res.json(result);
};

export const logoutController = async (req, res) => {
  await logoutUser(req.user);

  res.status(204).send();
};

export const updateAvatarController = async (req, res) => {
  const { path: tempPath, originalname } = req.file;
  const ext = path.extname(originalname);
  const filename = `${req.user.id}${ext}`;
  const avatarsDir = path.resolve("public", "avatars");
  const newPath = path.join(avatarsDir, filename);

  await fs.rename(tempPath, newPath);

  const avatarURL = `/avatars/${filename}`;
  const user = await updateAvatar(req.user.id, avatarURL);

  if (!user) {
    throw HttpError(401, "Not authorized");
  }

  res.status(200).json({
    avatarURL: user.avatarURL,
  });
};
