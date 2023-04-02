
import mongoose from 'mongoose';
import Post, { IPOST } from '../models/post-model';
import { aggregationUtilWithPagination } from '../library/utils';
import { ERROR } from '../response';
import { deleteAllCommentofPost } from './comment.repo';

export async function getPosts() {
    const posts = await Post.find();
    return posts;
}
export async function getPost(id: string) {
    const post = await Post.findById(id);
    return post;
}

export async function getPostComments(id: string, skip: number, limit: number) {
    const pipeLine = [
        {
            $match: {
              _id: new mongoose.Types.ObjectId(id),
            },
        },
        {
            $lookup: {
                from: "comments",
                localField: "_id",
                foreignField: "postId",
                as: "commentDetails",
            },
        },
        { $unwind: "$commentDetails" },
        { $skip: skip },
        { $limit: limit },
        {
            $lookup: {
                from: "users",
                localField: "commentDetails.userId",
                foreignField: "_id",
                as: "userDetails",
            },
        },
        { $unwind: "$userDetails" },
        {
            $project: {
                userId: "$commentDetails.userId",
                userName: "$userDetails.name",
                body: "$commentDetails.body"
            }
        }

    ]
    const data = await Post.aggregate(pipeLine);
    return data;
}

export async function savePost(data: IPOST) {
    return Post.create(data);
}
export async function updatePost(doc: any, data: any) {
    if (doc) {
        doc.set(data);
        await doc.save();
    }
}
export async function deletePost(id: string) {
    await deleteAllCommentofPost(id);
    await Post.findByIdAndDelete(id);
}

