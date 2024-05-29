import express from "express";
import {
  addTodo,
  getTodoList,
  deleteTodo,
  updateTodo,
} from "../controller/todoController";
const router = express.Router();
router.post("/", addTodo);
router.get("/", getTodoList);
router.delete("/:id", deleteTodo);
router.put("/:id", updateTodo);

export default router;
