import axios from 'axios'

export const baseURL = 'http://5.56.132.93/api/v1'

export const api = axios.create({
  baseURL,
})
