/* eslint-disable */
const aws = require('aws-sdk')
const uniqid = require('uniqid')

const region = process.env.AWS_REGION
const bucketName = process.env.AWS_BUCKET_NAME
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
})

const generateUploadUrl = async (username) => {
  const imageName = username + '-' + `${uniqid()}`

  const params = {
    Bucket: bucketName,
    Key: imageName
  }

  const uploadUrl = await s3.getSignedUrlPromise('putObject', params)

  return uploadUrl
}

module.exports = generateUploadUrl
