import express from "express";
import controller from "../controller/user-controller";
import { schemas, validateSchema } from "../middleware/validation";

const userRoutes = express.Router();

userRoutes.post('/user', validateSchema(schemas.user.create), controller.createUser);
userRoutes.post('/login', validateSchema(schemas.user.login), controller.login);

export default userRoutes;
