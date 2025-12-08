import User from "./db/models/User.js";
import bcrypt from "bcrypt";
import HttpError from "../helpers/HttpError.js";
import { createToken, verifyToken } from "../helpers/jwt.js";
import path from "node:path";
import fs from "node:fs/promises";
import gravatar from "gravatar";
import sendEmail from "../helpers/sendEmail.js";

const avatarsDir = path.resolve("public", "avatars");

const { GLOBAL_URL } = process.env;

export const findUser = (where) => User.findOne({ where });

export const registerUser = async (payload, file) => {
  const hashPassword = await bcrypt.hash(payload.password, 10);

  let avatarURL = gravatar.url(payload.email, { s: "200", r: "pg", d: "mp" });

  if (file) {
    const newPath = path.join(avatarsDir, file.filename);
    await fs.rename(file.path, newPath);
    avatarURL = path.join("avatars", file.filename);
  }

  const user = User.create({
    ...payload,
    password: hashPassword,
    avatarURL: avatarURL,
  });

  const verificationToken = createToken({ email: payload.email });

  const verifyEmail = {
    to: payload.email,
    subject: "Verify email",
    html: `<a href="${GLOBAL_URL}/api/users/verify/${verificationToken}" target="_blanc" >Click verify</a>`,
  };

  await sendEmail(verifyEmail);

  return user;
};

export const verifyUser = async (verificationToken) => {
  const { data, error } = verifyToken(verificationToken);
  if (error) throw HttpError(401, error.message);

  const user = await findUser({ email: data.email });
  if (user.verify) throw HttpError(401, "Email already verified");

  await user.update({ verify: true, verificationToken: verificationToken });
};

export const resendVerifyUser = async ({ email }) => {
  const user = await findUser({ email });
  if (!user) throw HttpError(401, "Email not found");
  if (user.verify) throw HttpError(401, "Email already verified");
  const verificationToken = createToken({ email: email });
  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a href="${GLOBAL_URL}/api/users/verify/${verificationToken}" target="_blanc" >Click verify</a>`,
  };

  await sendEmail(verifyEmail);
};

export const loginUser = async ({ email, password }) => {
  const user = await findUser({ email });
  if (!user) throw HttpError(401, "Email or password is wrong");

  if (!user.verify) throw HttpError(401, "Email not verified");

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
