
import mongoose, { Schema, Types } from 'mongoose';

export interface IPOST {
    title: String,
    body: String,
    userId: Types.ObjectId
}

const PostSchema: Schema = new Schema({
    title: { type: String, require: true },
    body: { type: String, require: true },
    userId: { type: Schema.Types.ObjectId, require: true, ref: 'User' }
},{
    versionKey: false
});

export default mongoose.model<IPOST>('Post', PostSchema);