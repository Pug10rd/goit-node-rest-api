import User from "./db/models/User.js";
import bcrypt from "bcrypt";
import HttpError from "../helpers/HttpError.js";
import { createToken } from "../helpers/jwt.js";
import path from "node:path";
import fs from "node:fs/promises";
import gravatar from "gravatar";

const avatarsDir = path.resolve("public", "avatars");

export const findUser = (where) => User.findOne({ where });

export const registerUser = async (payload, file) => {
  const hashPassword = await bcrypt.hash(payload.password, 10);

  let avatarURL = gravatar.url(payload.email, { s: "200", r: "pg", d: "mp" });

  if (file) {
    const newPath = path.join(avatarsDir, file.filename);
    await fs.rename(file.path, newPath);
    avatarURL = path.join("avatars", file.filename);
  }

  return User.create({
    ...payload,
    password: hashPassword,
    avatarURL: avatarURL,
  });
};

export const loginUser = async ({ email, password }) => {
  const user = await findUser({ email });
  if (!user) throw HttpError(401, "Email or password is wrong");

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) throw HttpError(401, "Email or password is wrong");

  const payload = {
    id: user.id,
  };

  const token = createToken(payload);

  await user.update({ token });

  return {
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  };
};

export const refreshUser = async (user) => {
  const token = createToken({ id: user.id });

  await user.update({ token });

  return {
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  };
};

export const logoutUser = async (user) => {
  await user.update({ token: null });

  return true;
};

export const updateAvatar = async (userId, avatarURL) => {
  const user = await User.findByPk(userId);
  if (!user) {
    return null;
  }

  await user.update({ avatarURL });
  return user;
};
