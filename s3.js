/* eslint-disable */
const S3 = require('aws-sdk/clients/s3')
const uniqid = require('uniqid')
const fs = require('fs')

const region = process.env.AWS_REGION
const bucketName = process.env.AWS_BUCKET_NAME
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
})

// upload to AWS
const uploadFile = (file) => {
  console.log(file)
  const fileStream = fs.createReadStream(file.path)

  const uploadsParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename
  }

  return s3.upload(uploadsParams).promise()
}

// download from AWS
const downloadFile = (fileKey) => {
  const downloadsParams = {
    Key: fileKey,
    Bucket: bucketName
  }

  return s3.getObject(downloadsParams).createReadStream()
}

module.exports = {
  uploadFile,
  downloadFile
}
