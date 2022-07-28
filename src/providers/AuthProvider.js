import React, {
  Fragment,
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback
} from 'react'
import PropTypes from 'prop-types'
import { pipe, prop } from 'ramda'
import axios from 'axios'
import { useRouter } from 'next/router'

import { LOGIN, ME, AUTH } from '~/constants/api'
import { HOME, PROFILE_URL } from '~/constants/routes'
import { getToken, setToken, removeToken } from '~/utils/cookies'
import transformResponse from '~/utils/transformResponse'
import useCreate from '~/hooks/crud/useCreate'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  transformResponse: [transformResponse]
})

function setHeadersAuth (token) {
  api.defaults.headers.Authorization = `Token ${token}`
}

function removeHeadersAuth () {
  delete api.defaults.headers.Authorization
}

const AuthContext = createContext(null)

function AuthProvider (props) {
  const { children } = props

  const router = useRouter()
  const [user, setUser] = useState(null)
  const [isUserLoading, setIsUserLoading] = useState(true)

  const loginAuth = useCreate(AUTH)
  const loginCreate = useCreate(LOGIN)

  function fetchUserInfo () {
    return api.get(ME)
      .then(pipe(prop('data'), setUser))
      .catch(onLogout)
  }

  useEffect(() => {
    const token = getToken()
    function loadUserFromCookies () {
      if (token) {
        setHeadersAuth(token)
        fetchUserInfo()
          .then(() => {
            setIsUserLoading(false)
          })
          .catch(() => {
            setIsUserLoading(false)

            return onLogout()
          })
      }
      else {
        setIsUserLoading(false)
      }
    }
    loadUserFromCookies()
  }, [])

  const onAuth = useCallback((formValues) => {
    return loginAuth.create(formValues)
  }, [])

  const onLogin = useCallback((formValues, withRedirect) => {
    return loginCreate.create(formValues)
      .then(resp => {
        const token = prop('token', resp)
        setHeadersAuth(token)
        setToken(token)

        return token
      })
      .then(() => {
        const { query } = router
        const { redirectUrl } = query
        fetchUserInfo()
          .then(() => {
            if (withRedirect) {
              if (redirectUrl) return router.replace(redirectUrl)
              return router.replace(PROFILE_URL)
            }
          })
      })
  }, [])

  const onLogout = useCallback(() => {
    return router.replace(HOME)
      .then(() => {
        removeToken()
        setUser(null)
        removeHeadersAuth()
      })
  }, [])

  const onUpdateUser = useCallback((data) => {
    setUser(prev => ({ ...prev, ...data }))
  }, [])

  const onSuccessReg = useCallback((response) => {
    const { token } = response

    setToken(token)
    setHeadersAuth(token)

    fetchUserInfo()
      .then(() => router.replace(PROFILE_URL))
  }, [])

  const authProps = {
    isAuth: !!user,
    user,
    isUserLoading,
    isLoading: loginCreate.isLoading || loginAuth.isLoading,
    onLogin,
    onAuth,
    onLogout,
    onSuccessReg,
    onUpdateUser,
    fetchUserInfo
  }

  return (
    <AuthContext.Provider value={authProps}>
      <Fragment>
        {children}
      </Fragment>
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export function useAuth () {
  return useContext(AuthContext)
}

export { AuthProvider }
