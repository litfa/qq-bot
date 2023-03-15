import { cdn } from 'tencentcloud-sdk-nodejs'
import config from './config'
const CdnClient = cdn.v20180606.Client

const clientConfig = config.tencentCloud

// 实例化要请求产品的client对象,clientProfile是可选的
const client = new CdnClient(clientConfig)

export const purgePathCache = (
  paths: string[],
  flushType: 'flush' | 'delete',
  urlEncode: boolean
) => {
  return client.PurgePathCache({
    Paths: paths,
    FlushType: flushType,
    UrlEncode: urlEncode
  })
}
