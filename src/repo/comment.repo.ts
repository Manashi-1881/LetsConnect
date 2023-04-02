import mongoose from 'mongoose';
import Comment, { ICOMMENT } from '../models/comment-model';

export async function saveComment(data: ICOMMENT) {
    return Comment.create(data);
}

export async function deleteCommentById(id: string) {
    await Comment.findByIdAndDelete(id);
}
export async function deleteAllCommentofPost(postId: string) {
    await Comment.deleteMany({postId : new mongoose.Types.ObjectId(postId)})
}