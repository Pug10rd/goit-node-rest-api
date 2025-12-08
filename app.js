import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";

import contactsRouter from "./routes/contactsRouter.js";
import connectDatabase from "./services/db/connectDatabase.js";
import authRouter from "./routes/authRouter.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/users", authRouter);
app.use("/api/contacts", contactsRouter);

app.use(notFoundHandler);
app.use(errorHandler);

await connectDatabase();

const port = Number(process.env.PORT) | 3000;

app.listen(port, () => {
  console.log("Server is running. Use our API on port: 3000");
});
