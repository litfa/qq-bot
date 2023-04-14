import { onMessage, sendFriendMessage, open } from '../../utils/ws'
import { query } from '../../utils/db'
import { toUnderscoreCase, toSqlData } from './utils'
import { v4 as uuidV4 } from 'uuid'

export const Main = () => {
  onMessage((data) => {
    const types = [
      'BotGroupPermissionChangeEvent',
      'BotInvitedJoinGroupRequestEvent',
      'BotJoinGroupEvent',
      'BotLeaveEventDisband',
      'BotLeaveEventKick',
      'BotMuteEvent',
      'BotOfflineEventActive',
      'BotOfflineEventDropped',
      'BotOnlineEvent',
      'BotReloginEvent',
      'FriendInputStatusChangedEvent',
      'FriendMessage',
      'FriendNickChangedEvent',
      'FriendRecallEvent',
      'FriendSyncMessage',
      'GroupAllowAnonymousChatEvent',
      'GroupAllowConfessTalkEvent',
      'GroupMessage',
      'GroupMuteAllEvent',
      'GroupNameChangeEvent',
      'GroupRecallEvent',
      'GroupSyncMessage',
      'MemberCardChangeEvent',
      'MemberHonorChangeEvent',
      'MemberJoinEvent',
      'MemberJoinRequestEvent',
      'MemberLeaveEventKick',
      'MemberLeaveEventQuit',
      'MemberMuteEvent',
      'MemberPermissionChangeEvent',
      'MemberSpecialTitleChangeEvent',
      'MemberUnmuteEvent',
      'NewFriendRequestEvent',
      'NudgeEvent',
      'OtherClientOfflineEvent',
      'OtherClientOnlineEvent',
      'StrangerMessage',
      'TempMessage',
      'TempSyncMessage'
    ]
    if (types.includes(data.data?.type)) {
      const date = new Date()
      const tosql = toSqlData(data.data, {
        date,
        timestamp: date.getTime(),
        uuid: uuidV4()
      })

      // data.data.type 已经判断过，是39种类型，直接拼接是安全的
      query(`insert into ${toUnderscoreCase(data.data.type)} set ?`, [tosql])
    }
  })
}
