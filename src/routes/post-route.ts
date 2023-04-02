import express from "express";
import controller from "../controller/post-controller";
import { schemas, validateQuery, validateSchema } from "../middleware/validation";
import { verifyToken } from "../library/jwt";

const postRoutes = express.Router();

postRoutes.post('/post', verifyToken, validateSchema(schemas.post.create), controller.createPost);
postRoutes.delete('/post/:id', verifyToken, controller.delPost);
postRoutes.put('/post/:id', verifyToken, validateSchema(schemas.post.update), controller.resetPost);
postRoutes.get('/post', verifyToken ,controller.fetchPosts)
postRoutes.get('/post/:id', verifyToken, controller.fetchPost);
postRoutes.get('/post/:id/comment', verifyToken, validateQuery(schemas.post.fetchComment), controller.fetchPostComments);

export default postRoutes;

