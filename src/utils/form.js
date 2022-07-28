import { has, ifElse, isEmpty, join, not, omit, pipe, prop, startsWith } from 'ramda'
import { FORM_ERROR } from 'final-form'

import toCamelCase from '~/utils/toCamelCase'

const NON_FIELD_ERROR = 'nonFieldErrors'

const getDefaultNonFieldErrors = error => {
  return error ? { [NON_FIELD_ERROR]: [error] } : {}
}

export const mapResponseToFormError = data => {
  const formedErrorData = pipe(
    ifElse(
      has('detail'),
      pipe(
        prop('detail'),
        getDefaultNonFieldErrors
      ),
      toCamelCase
    )
  )(data)

  const nonFieldError = prop(NON_FIELD_ERROR, formedErrorData) || []
  const restFieldErrors = omit([NON_FIELD_ERROR], formedErrorData)

  if (nonFieldError && not(isEmpty(nonFieldError))) {
    // showToast({
    //   type: 'error',
    //   title: 'Ошибка',
    //   message: nonFieldError
    // })
  }

  return {
    ...restFieldErrors,
    [FORM_ERROR]: join(', ', nonFieldError)
  }
}

const toArray = err => {
  if (!err) {
    return []
  }

  if (Array.isArray(err)) {
    return err
  }

  return [err]
}
export const getFieldError = meta => {
  const submitError = pipe(
    prop('submitError'),
    toArray,
    join(',')
  )(meta)
  const validateError = prop('touched', meta) && prop('error', meta)

  return validateError || submitError
}

export const validateRequired = value => {
  return value ? undefined : 'Обязательное поле'
}

export const validateEmail = value => {
  if (!value) return undefined

  // eslint-disable-next-line max-len
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const isValid = regex.test(value)
  return isValid ? undefined : 'Неверный формат email'
}

export const validatePhoneNumber = value => {
  if (!value) return 'Введите номер телефона'

  const phoneWithPlus = startsWith('+', value)
  const requiredLength = phoneWithPlus ? 13 : 12
  if (value.length !== requiredLength) return 'Некорректный номер телефона'
  return undefined
}
