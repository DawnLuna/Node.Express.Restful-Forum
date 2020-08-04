import express from 'express';
import dotenv from 'dotenv';

dotenv.config(); // load env

const app = express();
const PORT = process.env.APP_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));