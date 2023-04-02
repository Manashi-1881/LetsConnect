import * as jwt from "jsonwebtoken";
import { NextFunction } from "express";
import { ERROR } from "../response/index"
import { config } from "../config/config";
import { message } from "../response/messages";

const generateAccessToken = (userId: any, email: string): string => {
    const payload = { userId, email };
    const options: jwt.SignOptions = {
        expiresIn: config.accessTokenExpireIn || '1h',
    };    
    const token = jwt.sign(payload, config.acessTokenSecret || "", options);
    return token;
};

const verifyJwtToken = async(
    refreshToken: any,
    secretKey: string,
    response: any
): Promise<string | jwt.JwtPayload> => {
    let result;
    try {
        result = await jwt.verify(refreshToken, secretKey);
    } catch (err: any) {
        if (err.name === message.libError.jwtTokenExpire) {
            return response.validationError({
                message: ERROR.JWT_TOKEN_EXPIRE,
            });
        } else if (err.name === message.libError.jwtError) {
            return response.validationError({
                message: ERROR.JWT_ERROR,
            });
        }
        throw err;
    }
    return result;
};

const verifyToken = async(req: any, res: any, next: NextFunction) => {
        let accessToken = req.headers.authorization || "";  
        const [_, token] = accessToken.split(" ");
        const result: any = await verifyJwtToken(
            token,
            config.acessTokenSecret || "",
            res
        );
        if(!result){
            throw new Error(message.libError.jwtError);
        }
        req.userId = result?.userId;
        req.email = result?.email;
        next();
};

export { generateAccessToken, verifyToken };