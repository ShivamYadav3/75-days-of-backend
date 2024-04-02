import { router } from "../../../server.js";
import {
  createToDo,
  deleteTodo,
  getToDo,
  getToDoDetails,
  updateToDo,
} from "./todos.controller.js";
import {
  IdValidation,
  addToDoValidation,
  editToDoValidation,
  getToDoValidation,
} from "./todos.validator.js";

router.get("/todos", getToDoValidation, getToDo);
router.get("/todos/:id", IdValidation, getToDoDetails);
router.put("/todos/:id", editToDoValidation, updateToDo);
router.post("/todos", addToDoValidation, createToDo);
router.delete("/todos/:id", IdValidation, deleteTodo);

export default router;
