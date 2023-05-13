import config from '../../../utils/config'

const { baseUrl } = config.webqq

export default [new RegExp(`^${baseUrl == '/' ? '' : baseUrl}/login/`)]
