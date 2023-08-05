import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

import imageUploaderRouter from './src/image-uploader/image-uploader.router.js';


const app = express();
app.use(bodyParser.json());

app.use('/upload', imageUploaderRouter);

export default app
