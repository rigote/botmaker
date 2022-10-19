import axios from 'axios'

const api = axios.create({
  baseURL: 'https://go.botmaker.com/api/',
  responseType: 'json'
})

export default api
