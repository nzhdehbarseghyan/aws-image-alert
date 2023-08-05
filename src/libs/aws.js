import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();
const sns = new AWS.SNS();

export const s3Upload = async (file) => {
    try {
        const PROJECT_NAME = process.env.AWS_PROJECT_NAME
        return await s3.upload({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: PROJECT_NAME + '/' + file.originalname,
            Body: file.buffer
        }).promise()
    } catch (e) {
        console.log(' AWS uploading Error', e);
        return e;
    }
}

export const snsSubscribeToEmail = async (email) => {
    try {
        const subscription = await sns.subscribe({
            Protocol: 'EMAIL',
            TopicArn: process.env.AWS_SNS_TOPIC_ARN,
            Endpoint: email
        }).promise();

        // const result = await sns.confirmSubscription({
        //     TopicArn: process.env.AWS_SNS_TOPIC_ARN,
        //     SubscriptionArn: subscription.SubscriptionArn
        // }).promise();

        // sns.unsubscribe({
        //     SubscriptionArn: subscription.SubscriptionArn
        // })

        // const attr = await sns.getSubscriptionAttributes(subscription.SubscriptionArn).promise()
    } catch (e) {
        console.log(' snsSubscribeToEmail Error', e);
        return e;
    }
}

export const snsPublishNotification = async (message) => {
    try {
        const publishedNot = await sns.publish({
            TopicArn: process.env.AWS_SNS_TOPIC_ARN,
            Message: message
        }).promise();

        return publishedNot.MessageId;
    } catch (e) {
        console.log(' snsPublishMsg Error', e);
        return e;
    }
}
