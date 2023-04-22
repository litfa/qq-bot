import jwt from 'jsonwebtoken'
import config from '../../../utils/config'

const { jwtSecretKey, expiresIn } = config.webqq

export default (data: object) => {
  return jwt.sign(data, jwtSecretKey, {
    // expiresIn: '10h' // token 有效期为 10 个小时
    // 这里单位是秒 不是毫秒！
    // 直接用 10d 表示10天
    expiresIn: expiresIn || '1d'
  })
}
