/*
七牛云配置
*/
const qiniu = require('qiniu')

// 创建上传凭证
const accessKey = 'JrGUj_2ySuRpwMT6qRFJSJXMzDp3Pa-miCnq7N2_'
const secretKey = 'N5lTdJQZHdL8MdYEfkXWjG7NHxXNbE9bEx3LeD-h'
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
const options = {
  scope: 'lu',
  expires: 7200
}
const putPolicy = new qiniu.rs.PutPolicy(options)
const uploadToken = putPolicy.uploadToken(mac)

module.exports = {
  uploadToken
}

