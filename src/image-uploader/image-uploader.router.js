import { Router } from 'express';
import multer from 'multer';

import imageUploader from './image-uploader.component.js'
import verifyImage from './middlewares/image-verification.js'

const router = Router();
const upload = multer();

router.post('/image', upload.single('image'), verifyImage, imageUploader);

export default router;