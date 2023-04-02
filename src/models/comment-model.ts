
import mongoose, { Schema, Types } from 'mongoose';

export interface ICOMMENT {
    postId: Types.ObjectId,
    userId: Types.ObjectId
    body: String,
}

const CommentSchema: Schema = new Schema({
    postId: { type: Schema.Types.ObjectId, require: true, ref: 'Post' },
    userId: { type: Schema.Types.ObjectId, require: true, ref: 'User' },
    body: { type: String, require: true },
},{
    versionKey: false
});

export default mongoose.model<ICOMMENT>('Comment', CommentSchema);