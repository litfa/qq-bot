import { onMessage } from '../../src/utils/ws'
import type Data from '../../src/types/data'
import { query } from '../../src/utils/db'

export const main = () => {
  // @ts-ignore
  onMessage(async (data: Data) => {
    const date = new Date()
    // 数据库
    if (data.data?.type)
      await query('insert into messages set ?', {
        'type': data.data.type,
        'message_chain': JSON.stringify(data.data.messageChain),
        'sender_id': data.data.sender?.id,
        'sender_nickname': data.data.sender?.nickname,
        'sender_remark': data.data.sender?.remark,
        'sender_member_name': data.data.sender?.memberName,
        'sender_special_title': data.data.sender?.specialTitle,
        'sender_permission': data.data.sender?.permission,
        'sender_join_timestamp': new Date(data.data.sender?.joinTimestamp),
        'sender_last_speak_timestamp': new Date(
          data.data.sender?.lastSpeakTimestamp
        ),
        'sender_mute_time_remaining': data.data.sender?.muteTimeRemaining,
        'sender_group_id': data.data.sender?.group?.id,
        'sender_group_name': data.data.sender?.group?.name,
        'sender_group_permission': data.data.sender?.group?.permission,
        date
      })

    await query('insert into message_text set ?', {
      date,
      text: JSON.stringify(data)
    })
  })
}
