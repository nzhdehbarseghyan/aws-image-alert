import { Upload } from "@aws-sdk/lib-storage";
import { S3 } from "@aws-sdk/client-s3";
import { SNS } from "@aws-sdk/client-sns";
import dotenv from 'dotenv';

// Load environment variables. The SDK checks for AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY environment variables.
dotenv.config();

// If you want to explicitly provide AWS access keys by creating a Credentials object and passing
// it to the S3 and SNS clients, you can do so using the fromStatic method from the @aws-sdk/credential-provider-static package.
// import { fromStatic } from '@aws-sdk/credential-provider-node';
// const credentials = fromStatic({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
// });

const s3 = new S3();
const sns = new SNS();

/**
 * Uploads a file to the AWS S3 bucket.
 *
 * @param {Object} file - The file to be uploaded.
 * @returns {Promise} - A promise that resolves when the upload is completed.
 */
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

/**
 * Subscribes an email address to the AWS SNS topic.
 * @param {string} email - The email address to subscribe.
 * @returns {Promise} - A promise that resolves when the subscription is successful or rejects with an error.
 */
export const snsSubscribeToEmail = async (email) => {
    try {
        const subscription = await sns.subscribe({
            Protocol: 'EMAIL',
            TopicArn: process.env.AWS_SNS_TOPIC_ARN,
            Endpoint: email
        });

        // TODO: Use the following code to confirm subscription
        // const result = await sns.confirmSubscription({
        //     TopicArn: process.env.AWS_SNS_TOPIC_ARN,
        //     SubscriptionArn: subscription.SubscriptionArn
        // });

        // sns.unsubscribe({
        //     SubscriptionArn: subscription.SubscriptionArn
        // })

        // const attr = await sns.getSubscriptionAttributes(subscription.SubscriptionArn)
    } catch (e) {
        console.log('snsSubscribeToEmail Error', e);
        return e;
    }
}

/**
 * Publishes a notification message to an AWS SNS topic.
 * @param {Object} message - The message to be published.
 * @returns {Promise<string>} - A promise that resolves to the published notification message ID.
 */
export const snsPublishNotification = async (message) => {
    try {
        const body = {
            TopicArn: process.env.AWS_SNS_TOPIC_ARN,
            Message: JSON.stringify(message)
        }

        const publishedNot = await sns.publish(body);

        return publishedNot.MessageId;
    } catch (e) {
        console.log('snsPublishMsg Error', e);
        return e;
    }
}
