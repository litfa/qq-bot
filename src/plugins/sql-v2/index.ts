import { onMessage } from '../../utils/ws'
import { insertSql } from './insertSql'

export const Main = () => {
  onMessage(insertSql)
}
