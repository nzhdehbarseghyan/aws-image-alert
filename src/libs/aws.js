import AWS from 'aws-sdk';
import { Upload } from "@aws-sdk/lib-storage";
import { S3 } from "@aws-sdk/client-s3";
import { SNS } from "@aws-sdk/client-sns";
import dotenv from 'dotenv';

dotenv.config();

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new S3();
const sns = new SNS();

export const s3Upload = async (file) => {
    try {
        const PROJECT_NAME = process.env.AWS_PROJECT_NAME

        return await new Upload({
            client: s3,

            params: {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: PROJECT_NAME + '/' + file.originalname,
                Body: file.buffer
            }
        }).done();
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
        });

        // const result = await sns.confirmSubscription({// TODO us this to confirm subscription
        //     TopicArn: process.env.AWS_SNS_TOPIC_ARN,
        //     SubscriptionArn: subscription.SubscriptionArn
        // });

        // sns.unsubscribe({
        //     SubscriptionArn: subscription.SubscriptionArn
        // })

        // const attr = await sns.getSubscriptionAttributes(subscription.SubscriptionArn)
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
        });

        return publishedNot.MessageId;
    } catch (e) {
        console.log(' snsPublishMsg Error', e);
        return e;
    }
}
