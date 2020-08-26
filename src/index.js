import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';

import { notFound } from './middleware/http4xxErrors';
import forumRoutes from './routes/forumRoute'
import userRoutes from './routes/userRoute'


const app = express();
const PORT = process.env.APP_PORT;

//mongodb connection
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${process.env.MONGODB_ADDRESS}/${process.env.MONGODB_DATABASE}`, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.options('*', cors());
app.use(helmet());
app.use(compression());

//routes
forumRoutes(app);
userRoutes(app);

app.use(notFound);

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));