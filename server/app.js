import cors from 'cors';
import dotenv from 'dotenv';
import Redis from 'ioredis';
import connectRedis from 'connect-redis';
import session from 'express-session';
import mongoose from 'mongoose'
import bodyParser from 'body-parser';
import express from 'express';
import userRouter from './routes/user';
import courseRouter from './routes/course';
import departmentRouter from './routes/department';

//env variables/express server set up
dotenv.config();
const app = express();
app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(bodyParser.json());

//redis cache set up
const RedisStore = connectRedis(session);
export const redis = new Redis();

app.use(
    session({
        name: process.env.COOKIE_NAME,
        store: new RedisStore({
            client: redis
        }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365, //1 year
            httpOnly: true,
            sameSite: 'lax', //handle csrf
            secure: false //cookie works in http
        }
    })
);

//db set up
mongoose.connect(process.env.DB, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
});

mongoose.connection.once('open', () => {
    console.log('connected to the database');
})
.on('error', err => {
    console.log(err);
});

//routes set up
app.use('/api/user', userRouter);
app.use('/api/course', courseRouter);
app.use('/api/department', departmentRouter);

app.listen(process.env.PORT || 5000, () => {
    console.log('Listening to port 5000');
});