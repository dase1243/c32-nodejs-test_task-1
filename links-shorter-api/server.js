import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import routes from "./routes/index.js";
import {connectRedis} from "./config/redis.js";
import startCleanupSchedule from "./util/dbsCleanup.js";
import morgan from 'morgan';

dotenv.config()

const port = process.env.PORT || 5000;
const originUrl = process.env.REACT_APP_URL;

const app = express();

const corsOptions = {
    origin: [originUrl],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

routes(app);
app.listen(port, () => {
    console.log(`server is running on port ${port}`)

    connectDB();
    connectRedis();
    startCleanupSchedule();
});