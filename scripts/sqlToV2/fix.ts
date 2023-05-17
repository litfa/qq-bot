import { query } from '../../src/utils/db'

export default async () => {
  const [err, result] = await query(`
  alter table friend_recall_event
      modify operator bigint null;
  `)
  console.log('执行完成', err, result)
}
