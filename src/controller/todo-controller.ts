
import { Request, Response, NextFunction } from 'express';
import { ERROR, SUCCESS } from '../response';
import { saveTodo, getTodos, updateTodo, deleteTodo, getTodo } from '../repo/todo-repo';
import mongoose from 'mongoose';


const createTodo = async (req: any, res: Response, next: NextFunction) => {
    const { title } = req.body;
    const data = await saveTodo({
        title, completed: false, userId: new mongoose.Types.ObjectId(req.userId)
    })
    return res.status(200).json({ message: SUCCESS.TODO.CREATE, data: data });
}

const delTodo = async (req: any, res: Response, next: NextFunction) => {
    try{
        const todo = await getTodo(req.params.id);
        if(!todo || todo.userId.toString() !== req.userId){
            return res.status(400).json({ message: ERROR.TODO.UNAUTHORIZED });
        }
        await deleteTodo(req.params.id);
        return res.status(200).json({ message: SUCCESS.TODO.DELETE });
    }catch(err: any){
        return res.status(400).json({ message: ERROR.TODO.INVALID_ID });
    }
}

const resetTodo = async (req: any, res: Response, next: NextFunction) => {
    try{
        const todo = await getTodo(req.params.id);
        if(!todo || todo.userId.toString() !== req.userId){
            return res.status(400).json({ message: ERROR.TODO.UNAUTHORIZED });
        }
        await updateTodo(todo, req.body);
        return res.status(200).json({ message: SUCCESS.TODO.UPDATE });
    }
    catch(err: any){
        return res.status(400).json({ message: ERROR.TODO.INVALID_ID });
    }
}

const markTodo = async (req: any, res: Response, next: NextFunction) => {
    try{
        const todo = await getTodo(req.params.id);
        if(!todo || todo.userId.toString() !== req.userId){
            return res.status(400).json({ message: ERROR.TODO.UNAUTHORIZED });
        }
        await updateTodo(todo, { completed: true });
        return res.status(200).json({ message: SUCCESS.TODO.MARK });
    }catch(err: any){
        return res.status(400).json({ message: ERROR.TODO.INVALID_ID });
    }
}

const fetchTodos = async (req: Request, res: Response, next: NextFunction) => {
    const todos = await getTodos();
    return res.status(200).json({ message: SUCCESS.TODO.TODOS, data: todos });
}

const fetchTodo = async (req: any, res: Response, next: NextFunction) => {
    const todo = await getTodo(req.params.id);
    if(!todo || todo.userId.toString() !== req.userId){
        return res.status(400).json({ message: ERROR.TODO.UNAUTHORIZED });
    }
    return res.status(200).json({ message: SUCCESS.TODO.TODO, data: todo });
}

export default { createTodo, delTodo, resetTodo, markTodo, fetchTodos, fetchTodo };
