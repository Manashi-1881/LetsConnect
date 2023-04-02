import express from "express";
import userRoutes from "./user-route";
import todoRoutes from "./todo-route";
import postRoutes from "./post-route";
import commentRoutes from "./comment-route";
const versionOneRouter = express.Router();

versionOneRouter.use(`/v1/api`, userRoutes);
versionOneRouter.use(`/v1/api`, todoRoutes);
versionOneRouter.use(`/v1/api`, postRoutes);
versionOneRouter.use(`/v1/api`, commentRoutes);

export const _routes = versionOneRouter;