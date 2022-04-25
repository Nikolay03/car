import axios from 'axios'

import toSnakeCase from './toSnakeCase'

import { getToken } from '~/utils/cookies'
import transformResponse from '~/utils/transformResponse'

function onFulfilled (response) {
  return response
}

function onRejected (error) {
  if (error.message === 'Network Error') {
    const networkError = {
      response: {
        data: {
          nonFieldErrors: ['No internet.']
        }
      }
    }

    return Promise.reject(networkError)
  }

  return Promise.reject(error)
}

async function getHeaders (req) {
  const token = req ? req.cookies.token : getToken()

  if (token) return { Authorization: `Token ${token}` }

  return {}
}

const getHttpRequest = () => {
  const config = {
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    transformResponse: [transformResponse]
  }

  const instance = axios.create(config)
  instance.interceptors.response.use(onFulfilled, onRejected)

  return instance
}

export default function request (req) {
  return {
    get: async function (url, params) {
      const http = getHttpRequest()
      const headers = await getHeaders(req)

      return http({
        method: 'get',
        params: toSnakeCase(params),
        url,
        headers
      })
    },
    post: async function (url, data) {
      const http = getHttpRequest()
      const headers = await getHeaders(req)

      return http({
        method: 'post',
        data: toSnakeCase(data),
        url,
        headers
      })
    },
    put: async function (url, data) {
      const http = getHttpRequest()
      const headers = await getHeaders(req)

      return http({
        method: 'put',
        data: toSnakeCase(data),
        url,
        headers
      })
    },
    delete: async function (url, data) {
      const http = getHttpRequest()
      const headers = await getHeaders(req)

      return http({
        method: 'delete',
        data: toSnakeCase(data),
        url,
        headers
      })
    },
    upload: async function (url, data, onUploadProgress) {
      const http = getHttpRequest()
      const headers = await getHeaders(req)

      return http({
        method: 'post',
        data,
        url,
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress
      })
    }
  }
}
