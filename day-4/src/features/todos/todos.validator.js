import { loginTimeOutMessage } from "../../../constant/messages/loginMessages.js";
import {
  mandatoryFieldsMessage,
  idIsRequiredMessage,
  idNotFound,
} from "../../../constant/messages/todosMessages.js";
import { todos } from "../../../todoData.js";
import { createResponse } from "../../../utiltities/response handler/todosResponse.js";
import { verifyToken } from "../../services/JWT/token.js";

export const getToDoValidation = (req, res, next) => next();

export const addToDoValidation = (req, res, next) => {
  const { title, description } = req.body;
  const userCookie = req.cookies.user;
  const user = verifyToken(userCookie);
  if (!user) {
    return res.status(401).send(loginTimeOutMessage);
  }
  if (!title || !description) {
    const response = createResponse(
      { title, description },
      mandatoryFieldsMessage
    );
    res.status(400).json(response);
    return;
  }
  next();
};

export const IdValidation = (req, res, next) => {
  const { id } = req.params;
  const userCookie = req.cookies.user;
  const user = verifyToken(userCookie);
  if (!user) {
    return res.status(401).send(loginTimeOutMessage);
  }
  if (!id) {
    const response = createResponse(null, idIsRequiredMessage);
    res.status(400).json(response);
    return;
  }
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex === -1) {
    const response = createResponse(null, idNotFound);
    res.status(400).json(response);
    return;
  }
  next();
};

export const editToDoValidation = (req, res, next) => {
  const { title, description } = req.body;
  const { id } = req.params;
  const userCookie = req.cookies.user;
  const user = verifyToken(userCookie);
  if (!user) {
    return res.status(401).send(loginTimeOutMessage);
  }
  if (!id) {
    const response = createResponse(null, idIsRequiredMessage);
    res.status(400).json(response);
    return;
  }
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex === -1) {
    const response = createResponse(null, idNotFound);
    res.status(400).json(response);
    return;
  }
  if (!title || !description) {
    const response = createResponse(
      { title, description },
      mandatoryFieldsMessage
    );
    res.status(400).json(response);
    return;
  }
  next();
};
