
import mongoose, { Schema, Types } from 'mongoose';

export interface ITODO {
    title: String,
    completed: Boolean,
    userId: Types.ObjectId
}

const TodoSchema: Schema = new Schema({
    title: { type: String, require: true },
    completed: { type: Boolean, require: true, default: false },
    userId: { type: Schema.Types.ObjectId, require: true, ref: 'User' }
},{
    versionKey: false
});

export default mongoose.model<ITODO>('Todo', TodoSchema);