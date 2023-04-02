import express from "express";
import controller from "../controller/todo-controller";
import { schemas, validateSchema } from "../middleware/validation";
import { verifyToken } from "../library/jwt";

const todoRoutes = express.Router();

todoRoutes.post('/todo', verifyToken, validateSchema(schemas.todo.create), controller.createTodo);
todoRoutes.delete('/todo/:id', verifyToken, controller.delTodo);
todoRoutes.put('/todo/:id', verifyToken, validateSchema(schemas.todo.update), controller.resetTodo);
todoRoutes.put('/complete/:id', verifyToken, controller.markTodo);
todoRoutes.get('/todos', verifyToken, controller.fetchTodos);
todoRoutes.get('/todo/:id', verifyToken, controller.fetchTodo);

export default todoRoutes;
