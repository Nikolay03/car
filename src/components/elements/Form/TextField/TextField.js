import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { prop } from 'ramda'

import { getFieldError } from '~/utils/form'
import InputError from '~/components/elements/Form/InputError'

const TextFieldWrap = styled('div')`
  position: relative;
  width: 100%;
`
const Input = styled('input')`
  font-size: 18px;
  padding: ${({ prefix }) => `20px 16px 3px ${prefix ? '60px' : '16px'}`};
  display:block;
  width: 100%;
  outline: ${({ isFocus }) => isFocus ? 'none' : 'hidden'};
  border: 1px solid ${({ isFocus, theme }) => isFocus ? theme.palette.primary : '#dbdbdd'};
  box-sizing: border-box;
  border-radius: 5px;
  height: 60px;
  transition: 0.2s ease all;
  appearance: none !important;
  max-width: 100%;
  z-index: 100;
  &:disabled{
    color: #ababab;
    background: ${({ disabled }) => disabled && '#f1f1f1'};
    transition: 0.2s ease all;
    border-color: #dbdbdd;
    & ~ label {
      color: #ababab;
      transition: 0.2s ease all;
      z-index: 1;
    }
    & ~ b {
      color: #ababab;
      transition: 0.2s ease all;
    }
  }
`
const Label = styled('label')`
  position: absolute;
  left: 15px;
  color: ${({ isFocus, error, theme }) => error ? '#FF2E63' : isFocus ? theme.palette.primary : '#818591'};
  font-size: ${({ isFocus }) => isFocus ? 13 : 16}px;
  top: ${({ isFocus }) => isFocus ? 9 : 22}px;
  transition: 0.2s ease all;
  cursor: text;
  :after{
    display: ${({ required }) => required ? 'inline-block' : 'none'};
    content: '\u00A0*';
    color: ${({ theme }) => theme.palette.red};
  }
`
const Prefix = styled('b')`
  font-weight: 500;
  font-size: 18px;
  color: ${({ theme }) => theme.color.primary};
  position: absolute;
  left: 15px;
  top: 28px;
  transition: 0.2s ease all;
`

const TextField = props => {
  const {
    name,
    defaultValue,
    onChange,
    onFocus,
    label,
    type,
    fullWidth,
    disabled,
    maxLength,
    max,
    error,
    meta,
    prefix,
    input,
    ...rest
  } = props
  const inputError = error || getFieldError(meta)
  // Const
  const inputValue = prop('value', input)

  // useState
  const [isFocus, setIsFocus] = useState(!!defaultValue || !!prefix || !!(inputValue))

  // useEffect
  useEffect(() => {
    if (inputValue) {
      setIsFocus(true)
    }
  }, [inputValue])

  const randomNumber = Math.random()

  // Render
  return (
    <TextFieldWrap
      fullWidth={fullWidth}
    >
      <Input
        type={type || 'text'}
        {...rest}
        {...input}
        name={name}
        defaultValue={defaultValue}
        onBlur={ev => setIsFocus(!!ev.target.value || !!prefix)}
        onChange={onChange || prop('onChange', input)}
        onFocus={() => {
          setIsFocus(true)
          if (onFocus) {
            onFocus()
          }
        }}
        isFocus={isFocus}
        disabled={disabled}
        maxLength={maxLength}
        prefix={prefix}
        max={max}
        id={randomNumber}
      />
      <Label
        error={inputError}
        isFocus={isFocus}
        htmlFor={randomNumber}
      >
        {label}
      </Label>
      {inputError && (
        <InputError>
          {inputError}
        </InputError>
      )}
      {prefix &&
      <Prefix>
        {prefix}
      </Prefix>}
    </TextFieldWrap>
  )
}

TextField.propTypes = {
  name: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  maxLength: PropTypes.number,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  max: PropTypes.number,
  prefix: PropTypes.any,
  label: PropTypes.any
}

export default TextField
