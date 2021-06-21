import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REALCAR_API_URL,
})

export default api
