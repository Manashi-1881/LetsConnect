
import mongoose, { Schema } from 'mongoose';

export interface IUSER {
    name: String,
    email: String,
    password: String
}

const UserSchema: Schema = new Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true }
},{
    versionKey: false
});

export default mongoose.model<IUSER>('User', UserSchema);