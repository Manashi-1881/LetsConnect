import express from "express"
import mongoose from "mongoose"
import http from "http"
import { config } from "./config/config";
import Logging from "./library/log";
import { ERROR, SUCCESS } from './response/index';
import { _routes } from "./routes/index";

const router = express();
mongoose.connect(config.mongo.url, { retryReads: true, w: "majority" }).
    then(() => {
        Logging.info(SUCCESS.DB_CONNECTION);
        startServer();
    }).
    catch((error) => Logging.error(ERROR.DB_CONNECTION));

const startServer = () => {

    router.use((req, res, next) => {
        Logging.info(`method : ${req.method}, url: ${req.url}`);
        router.on('finish', () => {
            Logging.info(`statusCode: ${req.statusCode}`)
        })
        next();
    });

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE');
            return res.status(200).json({ message: '' })
        }
        next();
    });

    router.use(_routes);
    router.get('/', (req, res, next) => {
        return res.send(200);
    })

    router.use((req, res, next) => {
        const error = new Error(ERROR.INVALID_API)
        Logging.error(error);
        return res.status(404).json({ message: ERROR.INVALID_API });
    })

    //http.createServer(router).listen(config.server.port, () => Logging.info(`Serving ruuning on ${config.server.port}`));

}
export default router;