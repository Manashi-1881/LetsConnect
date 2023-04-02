
import mongoose from 'mongoose';
import { savePost, deletePost, updatePost, getPost, getPosts, getPostComments } from '../repo/post-repo';
import { ERROR, SUCCESS } from '../response';
import { NextFunction, Response } from 'express';
import { getLimitAndSkip } from '../library/utils';

const createPost = async (req: any, res: Response, next: NextFunction) => {
    const { title, body } = req.body;
    const data = await savePost({
        title, body, userId: new mongoose.Types.ObjectId(req.userId)
    })
    return res.status(200).json({ message: SUCCESS.POST.CREATE, data: data });
}
const delPost = async (req: any, res: Response, next: NextFunction) => {
    try {
        const post = await getPost(req.params.id);
        if (!post || post.userId.toString() !== req.userId) {
            return res.status(400).json({ message: ERROR.POST.UNAUTHORIZED });
        }
        await deletePost(req.params.id);
        return res.status(200).json({ message: SUCCESS.POST.DELETE });
    } catch (err: any) {
        return res.status(400).json({ message: ERROR.POST.INVALID_ID });
    }
}
const resetPost = async (req: any, res: Response, next: NextFunction) => {
    try {
        const post = await getPost(req.params.id);
        if (!post || post.userId.toString() !== req.userId) {
            return res.status(400).json({ message: ERROR.POST.UNAUTHORIZED });
        }
        await updatePost(post, req.body);
        return res.status(200).json({ message: SUCCESS.POST.UPDATE });
    }
    catch (err: any) {
        return res.status(400).json({ message: ERROR.POST.INVALID_ID });
    }
}
const fetchPosts = async (req: any, res: Response, next: NextFunction) => {
    const posts = await getPosts();
    return res.status(200).json({ message: SUCCESS.POST.POSTS, data: posts });
}

const fetchPost = async (req: any, res: Response, next: NextFunction) => {
    const post = await getPost(req.params.id);
    if (!post || post.userId.toString() !== req.userId) {
        return res.status(400).json({ message: ERROR.POST.UNAUTHORIZED });
    }
    return res.status(200).json({ message: SUCCESS.TODO.TODO, data: post });
}

const fetchPostComments = async (req: any, res: Response, next: NextFunction) => {
    const { limit, skip } = getLimitAndSkip(req.query.page, req.query.limit);
    const post = await getPost(req.params.id);
    if (!post || post.userId.toString() !== req.userId) {
        return res.status(400).json({ message: ERROR.POST.UNAUTHORIZED });
    }
    const posts = await getPostComments(req.params.id, skip, limit);
    return res.status(200).json({ message: SUCCESS.POST.POSTS, data: posts });
}

export default {createPost, delPost, resetPost, fetchPosts, fetchPost, fetchPostComments}
