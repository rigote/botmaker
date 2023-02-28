import axios from 'axios'

const api = axios.create({
  baseURL: 'https://go.botmaker.com/api/',
  responseType: 'json'
})

// api.interceptors.request.use(
//   (config: any) => {
//     config.headers['access-token'] = `${process.env.NEXT_PUBLIC_ACCESSTOKEN}`
//     return config
//   },
//   (err) => {
//     console.log('Token error: ', err)
//     return Promise.reject(err)
//   }
// )

export default api
