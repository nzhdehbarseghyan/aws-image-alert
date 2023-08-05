import { s3Upload, snsPublishNotification, snsSubscribeToEmail } from '../libs/aws.js';

/**
 * Upload Image Into AWS S3
 * */
const imageUploader = async (req, res) => {
    try {
        const uploadedFile= await s3Upload(req.file);
        // const subscribedNot = await snsSubscribeToEmail('examle@yopmail.com');
        const notification = await snsPublishNotification(`File uploaded in this path ${uploadedFile.Location}`)

        res.status(200).send({ message: 'Success', data: uploadedFile.Location });
    } catch (e) {
        console.log(e)
        res.status(400).send({ message: 'Failed', data: e.message });
    }
}

export default imageUploader