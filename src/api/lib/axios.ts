import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { env } from '@/config/env'

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
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message
    console.log('AXIOS: ', message)

    if (error instanceof AxiosError) {
      return Promise.reject(error.response?.data)
    }

    return Promise.reject(error)
  },
)
