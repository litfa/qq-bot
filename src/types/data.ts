export default interface data {
  syncId: string
  data: Data
}

interface Data {
  type: string
  messageChain: MessageChain[]
  sender: Sender
  fromId?: number
  groupId?: number
  message?: string
  eventId?: number
  data?: Friends
}

export type Friends = {
  id: number
  nickname: string
  remark: string
}[]

interface Sender {
  id: number
  memberName: string
  specialTitle: string
  permission: string
  joinTimestamp: number
  lastSpeakTimestamp: number
  muteTimeRemaining: number
  group: Group
  nickname: string
  remark: string
}

interface Group {
  id: number
  name: string
  permission: string
}

interface MessageChain {
  type: string
  id?: number
  time?: number
  text?: string
}
