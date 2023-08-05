# AWS Image Alert

![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

## Table of contents
* [Introduction](#Description)
* [Features](#features)
* [Requirements](#requirements)
* [Setup process](#setup-process)


## Description
PicS3Notify is a serverless project designed to enable image uploads
to AWS S3, triggering an SNS service notification, which then runs
a Lambda function. The project streamlines the process of automating
actions based on user-uploaded images in an S3 bucket.

## Features
* Seamless Image Uploads: Users can easily upload images to the designated AWS S3 bucket.
* Real-time Notifications: SNS service sends instant notifications upon image upload.
* Lambda Function: The triggered Lambda function processes the uploaded image data.
* Easy Deployment: The project is built using serverless architecture, ensuring quick and straightforward deployment.


## Requirements
* Node 16+
* NPM
* AWS SNS Topic
* AWS S3 Bucket
* AWS Lambda Function

## Setup process
```bash
# 1- Clone the repo 
git clone https://github.com/nzhdehbarseghyan/aws-image-alert.git

# 2 Install dependencies
npm install

# Copy the ".env.example" file and create a ".env" file
# Configure AWS credentials and S3 bucket settings.

```

## License
This project is licensed under the MIT License.

