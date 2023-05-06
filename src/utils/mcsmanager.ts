import axios from 'axios'

export const McsmApi = (baseUrl: string, apikey: string) => {
  axios.defaults.baseURL = baseUrl

  const kill = (uuid: string, remote_uuid: string) => {
    return axios({
      url: '/api/protected_instance/kill',
      params: {
        uuid,
        remote_uuid,
        apikey
      }
    })
  }

  const stop = (uuid: string, remote_uuid: string) => {
    return axios({
      url: '/api/protected_instance/stop',
      params: {
        uuid,
        remote_uuid,
        apikey
      }
    })
  }

  const open = (uuid: string, remote_uuid: string) => {
    return axios({
      url: '/api/protected_instance/open',
      params: {
        uuid,
        remote_uuid,
        apikey
      }
    })
  }

  return {
    kill,
    stop,
    open
  }
}
