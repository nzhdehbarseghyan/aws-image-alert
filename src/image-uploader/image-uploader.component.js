import { s3Upload, snsPublishNotification, snsSubscribeToEmail } from '../libs/aws.js';

/**
 * Upload Image Into AWS S3
 * */
const imageUploader = async (req, res) => {
    try {
        const uploadedFile= await s3Upload(req.file);
        // const subscribedNot = await snsSubscribeToEmail('examle@yopmail.com');
        const snsData = {
            bucket: process.env.AWS_BUCKET_NAME,
            key: uploadedFile.Key,
            location: uploadedFile.Location
        }

        await snsPublishNotification(snsData)

        res.status(200).send({ message: 'Success', data: uploadedFile.Location });
    } catch (e) {
        console.log(e)
        res.status(400).send({ message: 'Failed', data: e.message });
    }
}

export default imageUploader