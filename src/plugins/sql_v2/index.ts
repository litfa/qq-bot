import { onMessage } from '../../utils/ws'
import { insertSql } from './insertSql'
import { download } from './download'
import config from '../../utils/config'

export const Main = () => {
  onMessage(insertSql)
  if(config.sql_v2.file_location != 'none') {
    onMessage(download)
  }
}
