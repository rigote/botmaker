import axios from 'axios'

const zen = axios.create({
  baseURL: 'https://pdi-helpinfocuscx.zendesk.com/api',
  responseType: 'json'
})

export default zen
