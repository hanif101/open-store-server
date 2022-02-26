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

// generate  AWS url
const generateS3Url = (username) => {
  let imageName = username + '-' + `${uniqid()}`

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 3600
  }

  const uploadUrl = s3.getSignedUrlPromise('putObject', params)

  return uploadUrl
}

module.exports = {
  generateS3Url
}
