import { Message } from 'typescript-mirai-api-http/dist/types/MessageType'
import axios from 'axios'
import { mkdir, writeFile } from 'fs/promises'
import config from '../../utils/config'
import { join } from 'path'
import to from 'await-to-js'
import { logger } from '../../utils/log'
import { existsSync } from 'fs'

const paths = config.sql_v2.path
const file_location = config.sql_v2.file_location
const cos = config.sql_v2.cos
let putObject: (filename: string, buffer: Buffer) => Promise<unknown>

if (file_location == 'cos') {
  const cos = require('../../utils/cos')
  putObject = cos.putObject
}

const saveCos = async (path: string, filename: string, data: Buffer) => {
  putObject(path + filename, data).catch((err) => {
    logger.error('文件保存失败', err)
  })
}

const saveFile = async (path: string, filename: string, data: Buffer) => {
  if (!existsSync(path)) {
    await to(mkdir(path))
  }
  const [err] = await to(writeFile(join(path, filename), data))
  if (err) {
    logger.error('文件保存失败', err)
  }
}

export const download = (data: { syncId: number; data: Message }) => {
  if (!data.data?.messageChain) return
  data.data.messageChain?.forEach(async (e) => {
    if (e.type == 'Image' || e.type == 'Voice') {
      const filename = e.type == 'Image' ? e.imageId : e.voiceId
      const path = paths[e.type]
      const [err, data] = await to(
        axios({
          url: e.url,
          responseType: 'arraybuffer'
        })
      )
      if (err) {
        return logger.error('文件请求失败', err)
      }
      const res = data.data
      if (file_location == 'cos') {
        if (e.type == 'Image') {
          saveCos(cos.ImagePath, filename, res)
        } else if (e.type == 'Voice') {
          saveCos(cos.VoicePath, filename, res)
        }
      } else {
        saveFile(path || `./data/${e.type}`, filename, res)
      }
    }
  })
}
