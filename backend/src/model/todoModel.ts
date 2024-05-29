import { Schema, model } from "mongoose";

const todo = new Schema(
  {
    title: { type: String, required: true },
    completed: { type: Boolean, required: true },
  },
  { timestamps: true },
);

const todoModel = model("todo", todo);
export default todoModel;
