
import User from '../models/user-model';
import { IUSER } from '../models/user-model';

export async function getUser(email: string) {
    const userDetails = await User.findOne({ email: email });
    return userDetails;
}

export async function saveUser(data: IUSER) {
    return User.create(data);
}