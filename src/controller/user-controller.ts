
import { Request, Response, NextFunction } from 'express';
import { ERROR, SUCCESS } from '../response';
import { encodePassword, isPasswordCorrect } from '../library/auth';
import { getUser, saveUser } from '../repo/user-repo';
import { generateAccessToken } from '../library/jwt';


const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
    const userDetails = await getUser(email);
    if (userDetails) {
        return res.status(400).json({ message: ERROR.USER.EMAIL_EXISTS });
    }
    const encodedPwd = encodePassword(password);
    await saveUser({ name: name, email: email, password: encodedPwd });
    return res.status(200).json({ message: SUCCESS.USER.SIGNUP });
}

const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const userDetails = await getUser(email);
    if (!userDetails) {
        return res.status(400).json({ message: ERROR.USER.USER_NOT_EXISTS });
    }
    if (!(await isPasswordCorrect(userDetails.password, password))) {
        return res.status(400).json({ message: ERROR.USER.INCORRECT_PASSWORD });
    }
    const accessToken = generateAccessToken(userDetails._id, email);
    return res.status(200).json({ message: SUCCESS.USER.LOGIN, data: { accessToken } });
}

export default { createUser, login };
