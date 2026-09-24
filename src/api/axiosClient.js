import axios from 'axios'
import { API_BASE_URL } from '../config'

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
})

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    const backendMessage =
      error.response?.data?.message || error.response?.data?.error
    const message =
      backendMessage ||
      (status
        ? `El servidor respondió con error ${status}.`
        : 'No se pudo contactar al backend. Verifica que esté corriendo en localhost:8080.')

    return Promise.reject({ ...error, friendlyMessage: message })
  },
)

export default axiosClient
