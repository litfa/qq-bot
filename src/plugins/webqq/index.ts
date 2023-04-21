import express from 'express'
import router from './router'
import cors from 'cors'
import bodyParser from 'body-parser'
import expressJWT from 'express-jwt'
import config from '../../utils/config'
import JWTUnless from './utils/JWTUnless'
import { logger } from '../../utils/log'
import { Request } from './types/express'
import type { Errback, Response, NextFunction } from 'express'

const { jwtSecretKey } = config.webqq

const app = express()

// 中间件记录日志
app.use('*', (req: Request, res, next) => {
  // 用于记录特定时间的日志输出
  try {
    req.userIp =
      (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress
  } catch (e) {
    console.log(e)
  }
  next()
  logger.info(
    `ip:${req.userIp}  请求:${req.path}  user-agent:${req.headers['user-agent']}`
  )
})

app.use(
  cors({
    origin: 'http://localhost:5173'
  })
)

app.use(bodyParser.json())

app.use(
  expressJWT({ secret: jwtSecretKey, algorithms: ['HS256'] }).unless({
    path: JWTUnless
  })
)

// 错误中间件
app.use((err: Errback, req: Request, res: Response, next: NextFunction) => {
  // 捕获身份认证失败的错误
  if (err.name === 'UnauthorizedError')
    logger.info(
      `ip:${req.userIp}  请求:${req.path}  user-agent:${req.headers['user-agent']}`
    )
  return res.send({ status: 4003, msg: '认证失败，请重新登录' })
})

app.use('/api', router)

app.listen(3000)
