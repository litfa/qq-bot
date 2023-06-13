import COS from 'cos-nodejs-sdk-v5'
import config from './config'

const { SecretId, SecretKey, Bucket, Region } = config.sql_v2.cos

const cos = new COS({
  SecretId: SecretId,
  SecretKey: SecretKey
})

export default cos

export const putObject = (filename: string, buffer: Buffer) => {
  return new Promise((resolve, reject) => {
    cos.putObject(
      {
        Bucket: Bucket /* 必须 */,
        Region: Region /* 必须 */,
        Key: filename /* 必须 */,
        Body: buffer
      },
      function (err, data) {
        resolve(data)
      }
    )
  })
}
