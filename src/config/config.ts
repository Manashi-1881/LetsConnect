import dotenv from "dotenv";
dotenv.config();

const MONGO_URL = process.env.MONGO_URL || "";
const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1234;

export const config = {
    acessTokenSecret: process.env.JWT_SECRET || "",
    accessTokenExpireIn: '1h',
    saltRounds: 10,
    mongo:{
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    }
}
