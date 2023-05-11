import type {
  FriendMessage,
  GroupMessage,
  FriendSyncMessage,
  GroupSyncMessage
} from 'typescript-mirai-api-http/src/types/MessageType'

interface Sql {
  messageText: string
  date: string
  timestamp: number
  id: number
}

export interface FriendMessageType extends FriendMessage, Sql {}
export interface GroupMessageType extends GroupMessage, Sql {}
export interface FriendSyncMessageType extends FriendSyncMessage, Sql {}
export interface GroupSyncMessageType extends GroupSyncMessage, Sql {}

export type GetMessageList =
  | FriendMessageType
  | GroupMessageType
  | FriendSyncMessageType
  | GroupSyncMessageType
