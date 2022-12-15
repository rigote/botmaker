import axios from 'axios'

const zen = axios.create({
  baseURL: 'https://pdi-helpinfocuscx.zendesk.com/api',
  responseType: 'json'
})

zen.interceptors.request.use(
  (config: any) => {
    config.headers[
      'Authorization'
    ] = `Basic ${process.env.NEXT_PUBLIC_ZENDESKACCESSTOKEN}`
    return config
  },
  (err) => {
    console.log('Token error: ', err)
    return Promise.reject(err)
  }
)

export default zen
