import express, { Express } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import todoRoute from "./routes/todoRoute";
import bodyParser from "body-parser";
import cors from "cors";
dotenv.config();

const app: Express = express();
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URL as string, { dbName: process.env.DB_NAME })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => console.log(err));

app.use("/api/todo", todoRoute);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
