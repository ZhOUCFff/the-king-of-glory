import axios from 'axios'

function request(config) {

  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL || '/web/api',
    timeout: 5000
  })

  instance.interceptors.request.use(config => {
    return config
  }, err => {

  })

  instance.interceptors.response.use(res => {
    return res
  }, err => {

  })

  return instance(config)

}

export {
  request
}