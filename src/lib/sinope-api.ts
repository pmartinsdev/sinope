import axios from 'axios'

export const sinopeApi = axios.create({
  baseURL: 'http://localhost:3333',
})
