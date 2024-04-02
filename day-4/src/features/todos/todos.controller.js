import {
  addToDoMessage,
  deleteToDoMessage,
  editToDoMessage,
  getToDoMessage,
  noToDoFoundMessage,
} from "../../../constant/messages/todosMessages.js";
import { todos } from "../../../todoData.js";
import { v4 as uuidv4 } from "uuid";
import { createResponse } from "../../../utiltities/response handler/todosResponse.js";

export const getToDo = (req, res) => {
  try {
    const response = createResponse(
      { todos, totalRecords: todos.length },
      todos.length > 0 ? getToDoMessage : noToDoFoundMessage
    );

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createToDo = (req, res) => {
  try {
    const { title, description } = req.body;
    const timestamp = new Date().toISOString();
    const newTodo = { id: uuidv4(), title, description, timestamp };
    todos.push(newTodo);
    const response = createResponse(newTodo, addToDoMessage);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getToDoDetails = (req, res) => {
  try {
    const { id } = req.params;
    const todo = todos.find((todo) => todo.id === id);
    const response = createResponse(todo, getToDoDetails);
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTodo = (req, res) => {
  try {
    const { id } = req.params;
    todos = todos.filter((todo) => todo.id !== id);
    const response = createResponse(null, deleteToDoMessage);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateToDo = (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    todos[todoIndex] = { ...todos[todoIndex], title, description };
    const response = createResponse(todos[todoIndex], editToDoMessage);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
