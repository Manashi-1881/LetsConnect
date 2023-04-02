import express from "express";
import controller from "../controller/comment-controller";
import { schemas, validateSchema } from "../middleware/validation";
import { verifyToken } from "../library/jwt";

const commentRoutes = express.Router();

commentRoutes.post('/comment', verifyToken, validateSchema(schemas.comment.create), controller.createComment);

export default commentRoutes;

