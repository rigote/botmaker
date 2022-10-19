import axios from 'axios'

const local = axios.create({
  baseURL: 'https://botmaker.vercel.app/api/',
  responseType: 'json'
})

export default local
