import { onMessage, sendFriendMessage } from '../../utils/ws'
import config from './../../utils/config'

export const Main = () => {
  onMessage((data) => {
    if (
      data?.data?.type == 'FriendMessage' &&
      data?.data?.messageChain[1]?.type == 'Plain' &&
      data?.data?.messageChain[1].text == config.hello_world.command &&
      config.hello_world.commandSender.includes(data?.data?.sender?.id)
    ) {
      sendFriendMessage(data.data.sender.id, [
        {
          type: 'Plain',
          text: config.hello_world.response
        }
      ])
    }
  })
}
