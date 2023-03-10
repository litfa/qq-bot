import { onMessage, sendFriendMessage } from '../../utils/ws'

export const Main = () => {
  onMessage((data) => {
    if (
      data?.data?.type == 'FriendMessage' &&
      data?.data?.messageChain[1]?.type == 'Plain' &&
      data?.data?.messageChain[1].text == '你好'
    ) {
      sendFriendMessage(data.data.sender.id, [{
        type: 'Plain',
        text: 'Hello world'
      }])
    }
  })
}
