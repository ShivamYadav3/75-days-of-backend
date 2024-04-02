import {
  mandatoryFieldsMessage,
  idIsRequiredMessage,
} from "../../../constant/messages/todosMessages.js";
import { createResponse } from "../../../utiltities/response handler/todosResponse.js";

export const getToDoValidation = (req, res, next) => {
  next();
};

export const addToDoValidation = (req, res, next) => {
  const { title, description } = req.body;
  if (!title) {
    const response = createResponse({ title, description }, mandatoryFields);
    res.status(400).json(response);
  }
  if (!description) {
    const response = createResponse({ title, description }, mandatoryFields);
    res.status(400).json(response);
  }
  next();
};

export const IdValidation = (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    const response = createResponse(null, idIsRequiredMessage);
    res.status(400).json(response);
  }
  next();
};

export const editToDoValidation = (req, res, next) => {
  const { title, description } = req.body;
  const { id } = req.params;
  if (!id) {
    const response = createResponse(null, idIsRequiredMessage);
    res.status(400).json(response);
  }
  if (!title || !description) {
    const response = createResponse(
      { title, description },
      mandatoryFieldsMessage
    );
    res.status(400).json(response);
  }
  next();
};
