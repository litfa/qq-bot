interface Group {
  id: number
  name: string
  permission: string
}
interface Member {
  id: number
  memberName: string
  permission: string
  specialTitle: string
  joinTimestamp: number
  lastSpeakTimestamp: number
  muteTimeRemaining: number
  group: Group
  nickname?: string
  remark?: string
}

export interface Message {
  type:
    | 'BotGroupPermissionChangeEvent'
    | 'BotInvitedJoinGroupRequestEvent'
    | 'BotJoinGroupEvent'
    | 'BotLeaveEventDisband'
    | 'BotLeaveEventKick'
    | 'BotMuteEvent'
    | 'BotOfflineEventActive'
    | 'BotOfflineEventDropped'
    | 'BotOnlineEvent'
    | 'BotReloginEvent'
    | 'FriendInputStatusChangedEvent'
    | 'FriendMessage'
    | 'FriendNickChangedEvent'
    | 'FriendRecallEvent'
    | 'FriendSyncMessage'
    | 'GroupAllowAnonymousChatEvent'
    | 'GroupAllowConfessTalkEvent'
    | 'GroupMessage'
    | 'GroupMuteAllEvent'
    | 'GroupNameChangeEvent'
    | 'GroupRecallEvent'
    | 'GroupSyncMessage'
    | 'MemberCardChangeEvent'
    | 'MemberHonorChangeEvent'
    | 'MemberJoinEvent'
    | 'MemberJoinRequestEvent'
    | 'MemberLeaveEventKick'
    | 'MemberLeaveEventQuit'
    | 'MemberMuteEvent'
    | 'MemberPermissionChangeEvent'
    | 'MemberSpecialTitleChangeEvent'
    | 'MemberUnmuteEvent'
    | 'NewFriendRequestEvent'
    | 'NudgeEvent'
    | 'OtherClientOfflineEvent'
    | 'OtherClientOnlineEvent'
    | 'StrangerMessage'
    | 'TempMessage'
    | 'TempSyncMessage'
    | string
  qq: number
  inputting: boolean
  friend: {
    id: number
    nickname: string
    remark: string
  }
  from: string
  to: string
  origin: string | boolean
  current: string | boolean
  group: Group
  durationSeconds: number
  operator: Member | number
  invitor: null | Member
  authorId: number
  messageId: number
  time: number
  fromId: number
  subject: {
    id: number
    kind: string
    nickname: string
    remark: string
    name: string
    permission: string

    // id: number
    memberName: string
    // permission: string
    specialTitle: string
    joinTimestamp: number
    lastSpeakTimestamp: number
    muteTimeRemaining: number
    group: Group
    // nickname?: string
    // remark?: string
  }
  action: string
  suffix: string
  target: number
  isByBot: boolean
  member: Member
  honor: string
  eventId: number
  groupId: number
  nick: string
  message: string
  client: {
    id: number
    platform: string
  }
  kind: number
  name: string
  args: {
    type: string
    text: string
  }[]
  sender: Member
  messageChain: any[]
}
