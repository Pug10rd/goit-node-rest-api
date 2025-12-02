import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";

import contactsRouter from "./routes/contactsRouter.js";
import connectDatabase from "./services/db/connectDatabase.js";
import { ValidationError } from "sequelize";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/contacts/:id", contactsRouter);
app.use("/api/contacts/favorite/:id", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    err.status = 400;
  }
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

await connectDatabase();

const port = Number(process.env.PORT) | 3000;

app.listen(port, () => {
  console.log("Server is running. Use our API on port: 3000");
});
