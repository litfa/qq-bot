import type {
  FriendMessage,
  GroupMessage,
  FriendSyncMessage,
  GroupSyncMessage
} from 'typescript-mirai-api-http/src/types/MessageType'

export interface FriendMessageType extends FriendMessage {
  messageText: string
  date: string
  timestamp: number
}
export interface GroupMessageType extends GroupMessage {
  messageText: string
  date: string
  timestamp: number
}
export interface FriendSyncMessageType extends FriendSyncMessage {
  messageText: string
  date: string
  timestamp: number
}
export interface GroupSyncMessageType extends GroupSyncMessage {
  messageText: string
  date: string
  timestamp: number
}

export type GetMessageList =
  | FriendMessageType
  | GroupMessageType
  | FriendSyncMessageType
  | GroupSyncMessageType
