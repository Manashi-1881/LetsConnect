
import mongoose from 'mongoose';
import { saveComment } from '../repo/comment.repo';
import { ERROR, SUCCESS } from '../response';
import { NextFunction, Response } from 'express';
import { isValidMongodbId } from '../library/utils';
import { getPost } from '../repo/post-repo';

const createComment = async (req: any, res: Response, next: NextFunction) => {
    const { body, postId } = req.body;
    const post = await getPost(postId);
    if (!isValidMongodbId(postId) || !post) {
        return res.status(400).json({ message: ERROR.POST.INVALID_ID });
    }
    const data = await saveComment({
        body: body,
        postId: new mongoose.Types.ObjectId(postId),
        userId: new mongoose.Types.ObjectId(req.userId)
    })
    return res.status(200).json({ message: SUCCESS.COMMENT.CREATE, data: data });
}

export default { createComment };