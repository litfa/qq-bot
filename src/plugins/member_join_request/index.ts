import { onMessage, send, getUserProfile } from '../../utils/ws'
import config from '../../utils/config'
import { logger } from '../../utils/log'

onMessage(async (data) => {
  if (data.data.type == 'MemberJoinRequestEvent') {
    // 检查配置文件是否需要处理 获取配置
    const { groupId, fromId, groupName, nick, eventId } = data.data
    const log = (...message: any) => {
      logger.info(
        '[member_join_request] -',
        `用户 ${nick}[${fromId}] 申请进入 ${groupName}[${groupId}]`,
        ...message
      )
    }
    const setting = config.member_join_request?.find((e) => e.group == groupId)
    if (!setting) {
      // 未找到相关配置
      log('未找到相关配置，不做处理')
      return
    }
    // 答案
    const answer = data.data.message?.split('\n答案：')[1]?.trim()
    // 配置里的正则
    const regex = new RegExp(setting.regex)
    // 匹配答案
    if (!regex.test(answer || '')) {
      log('答案错误，不做处理')
      return
    }
    // 获取用户资料
    const userProfile = await getUserProfile(fromId)
    if (userProfile.data.level < setting.minLevel) {
      log('等级不足，不做处理')
      return
    }
    // 通过
    send({
      syncId: 0,
      command: 'resp_memberJoinRequestEvent', // 命令字
      content: {
        eventId: eventId,
        fromId: fromId,
        groupId: groupId,
        operate: 0,
        message: ''
      }
    })
    log('符合条件，已通过')
  }
})
