import { onMessage } from '../../utils/ws'
import { insertSql } from './insertSql'
import { download } from './download'

export const Main = () => {
  onMessage(insertSql)
  onMessage(download)
}
