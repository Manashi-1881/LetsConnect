
import Joi, { ObjectSchema } from 'joi';
import { Response, Request, NextFunction } from 'express'
import Logging from '../library/log';

export const validateSchema = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try{
            await schema.validateAsync(req.body);
            next();
        }catch(error){
            Logging.error(error);
            return res.status(400).json(error)
        }
    }
}

export const validateQuery = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try{
            await schema.validateAsync(req.query);
            next();
        }catch(error){
            Logging.error(error);
            return res.status(400).json(error)
        }
    }
}

export const schemas = {
    user: {
        create: Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }),
        login: Joi.object({
            email: Joi.string().required(),
            password: Joi.string().required()
        }),
        update: Joi.object({
            name: Joi.string().required(),
        }),
    },
    todo: {
        create: Joi.object({
            title: Joi.string().required(),
        }),
        update: Joi.object({
            title: Joi.string().required(),
        }),
    },
    post: {
        create: Joi.object({
            title: Joi.string().required(),
            body: Joi.string().required(),
        }),
        update: Joi.object({
            body: Joi.string().required(),
        }),
        fetchComment: Joi.object({
            page: Joi.number().required(),
            limit: Joi.number().required(),
        }),
    },
    comment: {
        create: Joi.object({
            postId: Joi.string().required(),
            body: Joi.string().required(),
        }),
    }
}