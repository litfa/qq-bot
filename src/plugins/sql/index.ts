import { onMessage } from '../../utils/ws'
import { query } from '../../utils/db'
import type { Message } from './type'
import { v4 as uuidV4 } from 'uuid'

type Data = { syncId: number; data: Message }

export const Main = () => {
  // @ts-ignore
  onMessage(async (data: Data) => {
    const date = new Date()
    const uuid = uuidV4()
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
      const message = data.data
      // sqldata.type = data.data.type
      const sqlData = {
        uuid,
        date,
        type: message?.type,
        qq: message?.qq,
        inputting: message?.inputting,
        friend_id: message?.friend?.id,
        friend_nickname: message?.friend?.nickname,
        friend_remark: message?.friend?.remark,
        from: message?.from,
        to: message?.to,
        origin: message?.origin,
        current: message?.current,
        group_id: message?.group?.id,
        group_name: message?.group?.name,
        group_permission: message?.group?.permission,
        duration_seconds: message?.durationSeconds,
        operator:
          typeof message?.operator == 'number' ? message?.operator : null,
        operator_member_name:
          typeof message?.operator == 'object'
            ? message?.operator?.memberName
            : null,
        operator_permission:
          typeof message?.operator == 'object'
            ? message?.operator?.permission
            : null,
        operator_special_title:
          typeof message?.operator == 'object'
            ? message?.operator?.specialTitle
            : null,
        operator_join_timestamp:
          typeof message?.operator == 'object'
            ? message?.operator?.joinTimestamp
            : null,
        operator_last_speak_timestamp:
          typeof message?.operator == 'object'
            ? message?.operator?.lastSpeakTimestamp
            : null,
        operator_mute_time_remaining:
          typeof message?.operator == 'object'
            ? message?.operator?.muteTimeRemaining
            : null,
        operator_group_id:
          typeof message?.operator == 'object'
            ? message?.operator?.group?.id
            : null,
        operator_group_name:
          typeof message?.operator == 'object'
            ? message?.operator?.group?.name
            : null,
        operator_group_permission:
          typeof message?.operator == 'object'
            ? message?.operator?.group?.permission
            : null,
        invitor_id: message?.invitor?.id,
        invitor_member_name: message?.invitor?.memberName,
        invitor_permission: message?.invitor?.permission,
        invitor_special_title: message?.invitor?.specialTitle,
        invitor_join_timestamp: message?.invitor?.joinTimestamp,
        invitor_last_speak_timestamp: message?.invitor?.lastSpeakTimestamp,
        invitor_mute_time_remaining: message?.invitor?.muteTimeRemaining,
        invitor_group_id: message?.invitor?.group?.id,
        invitor_group_name: message?.invitor?.group?.name,
        invitor_group_permission: message?.invitor?.group?.permission,
        author_id: message?.authorId,
        message_id: message?.messageId,
        time: message?.time,
        from_id: message?.fromId,
        subject_id: message?.subject?.id,
        subject_kind: message?.subject?.kind,
        action: message?.action,
        suffix: message?.suffix,
        target: message?.target,
        is_by_bot: message?.isByBot,
        member_id: message?.member?.id,
        member_member_name: message?.member?.memberName,
        member_permission: message?.member?.permission,
        member_special_title: message?.member?.specialTitle,
        member_join_timestamp: message?.member?.joinTimestamp,
        member_last_speak_timestamp: message?.member?.lastSpeakTimestamp,
        member_mute_time_remaining: message?.member?.muteTimeRemaining,
        member_group_id: message?.member?.group?.id,
        member_group_name: message?.member?.group?.name,
        member_group_permission: message?.member?.group?.permission,
        honor: message?.honor,
        event_id: message?.eventId,
        // 两个下划线 区分 groupId 和 group.id
        group__id: message?.groupId,
        nick: message?.nick,
        message: message?.message,
        client_id: message?.client?.id,
        client_platform: message?.client?.platform,
        kind: message?.kind,
        name: message?.name,
        args: message?.args && JSON?.stringify(message?.args),
        sender_id: message?.sender?.id,
        sender_member_name: message?.sender?.memberName,
        sender_permission: message?.sender?.permission,
        sender_special_title: message?.sender?.specialTitle,
        sender_join_timestamp: message?.sender?.joinTimestamp,
        sender_last_speak_timestamp: message?.sender?.lastSpeakTimestamp,
        sender_mute_time_remaining: message?.sender?.muteTimeRemaining,
        sender_group_id: message?.sender?.group?.id,
        sender_group_name: message?.sender?.group?.name,
        sender_group_permission: message?.sender?.group?.permission,
        sender_nickname: message?.sender?.nickname,
        sender_remark: message?.sender?.remark,
        message_chain:
          message?.messageChain && JSON?.stringify(message?.messageChain)
      }
      query('insert into messages set ?', sqlData)
      query('insert into message_text set ?', {
        date,
        uuid,
        text: JSON.stringify(data)
      })
    }
  })
}
