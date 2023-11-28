import { s3Upload, snsPublishNotification, snsSubscribeToEmail } from '../libs/aws.js';

/**
 * Uploads an image to AWS S3 and publishes a notification using SNS.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
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