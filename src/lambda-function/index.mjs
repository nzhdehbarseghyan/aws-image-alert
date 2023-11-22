import AWS from 'aws-sdk';
const textract = new AWS.Textract();

const waitForTextractCompletion = async (jobId) => {
    while (true) {
        const textractStatus = await textract.getDocumentTextDetection({ JobId: jobId }).promise();
        const status = textractStatus.JobStatus;

        if (status === 'SUCCEEDED' || status === 'FAILED') {
            return;
        }

        // Wait for a few seconds before checking the status again
        await new Promise(resolve => setTimeout(resolve, 5000));
    }
}

const processTextractResponse = (textractResponse) => {
    let extractedText = '';

    // Extract text from Textract response
    if (textractResponse.Blocks) {
        textractResponse.Blocks.forEach(block => {
            if (block.BlockType === 'LINE') {
                extractedText += block.Text + '\n';
            }
        });
    }

    return extractedText;
}



export const handler = async (event, context) => {
    try {
        if (event.Records && event.Records.length && event.Records[0]?.Sns) {
            const { key, bucket } = JSON.parse(event.Records[0].Sns.Message);

            const textractParams = {
                DocumentLocation: {
                    S3Object: {
                        Bucket: bucket,
                        Name: key
                    }
                }
            }

            const textractResult = await textract.startDocumentTextDetection(textractParams).promise();

            // Wait for Textract analysis to complete
            await waitForTextractCompletion(textractResult.JobId)

            const textractResponse = await textract.getDocumentTextDetection(
                { JobId: textractResult.JobId }).promise();

            const extractedText = processTextractResponse(textractResponse);
            console.log(' extractedText >> ', extractedText);

            return {
                statusCode: 200,
                body: 'Text extraction completed successfully'
            }
        }
        console.log('Text extraction not completed');

        return {
            statusCode: 500,
            body: 'Text extraction not completed'
        }
    } catch (e) {
        console.log('An error occurred ', e);

        return {
            statusCode: 500,
            body: `An error occurred ${e}`
        }
    }
};
