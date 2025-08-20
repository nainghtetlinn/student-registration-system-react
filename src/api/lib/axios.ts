import { env } from '@/config/env'
import axios, { type InternalAxiosRequestConfig } from 'axios'

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = 'application/json'
  }

  const accessToken = localStorage.getItem('access-token')

  if (accessToken) {
    config.headers['authorization'] = `Bearer ${accessToken}`
    config.withCredentials = true
  }

  return config
}

export const api = axios.create({
  baseURL: env.API_URL,
})

api.interceptors.request.use(authRequestInterceptor)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message
    console.log('AXIOS: ', message)

    return Promise.reject(error)
  },
)
