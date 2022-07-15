import { has, ifElse, isEmpty, join, not, omit, pipe, prop } from 'ramda'
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
