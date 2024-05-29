import { Request, Response } from "express";
import todoModel from "../model/todoModel";
export const getTodoList = async (req: Request, res: Response) => {
  const todos = await todoModel.find();
  return res.status(200).json(todos);
};

export const addTodo = async (req: Request, res: Response) => {
  try{
    const { title, completed } = req.body;
    const todo = new todoModel({ title, completed });
    await todo.save();
    return res.status(200).json(todo);
  }catch (e){
    return res.sendStatus(500)
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await todoModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Todo Deleted" });
  } catch (error) {
    res.sendStatus(500);
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    const todo = await todoModel.findById(id);
    if (todo) {
      todo.title = title;
      todo.completed = completed;
      await todo.save();
      return res.status(200).json(todo);
    }
  } catch (error) {
    res.sendStatus(500);
  }
};
