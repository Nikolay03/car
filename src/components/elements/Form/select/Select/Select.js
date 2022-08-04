import React from 'react'
import PropTypes from 'prop-types'
import styled, { withTheme, css } from 'styled-components'
import ReactSelect from 'react-select'
import { prop } from 'ramda'

import selectStyles from './selectStyles'
import MenuList from './MenuList'

import InputLabel from '~/components/elements/Form/InputLabel'
import { mediaQueries } from '~/constants/mediaQueries'

const options = [
  // { value: 'cherry', label: 'Cherry' },
  // { value: 'banana', label: 'Banana' },
  // { value: 'apple', label: 'Apple' }
]

const SelectWrapper = styled('div')`
  position: relative;
  min-width: ${({ typeSelect }) => typeSelect === 'simple' ? '100%' : (typeSelect === 'button') ? '150px' : '350px'};
  ${({ error }) =>
    error &&
    css`
      & ${InputLabel} {
        color: ${props => props.theme.colorRed};
      }
    `}
  @media ${mediaQueries.tabletS} {
  }
`

const Sub = styled('div')`
  display: flex;
  width: min-content;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  min-width: 35px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-weight: 500;
  svg {
    max-width: 15px;
    max-height: 15px;
  }
`

const Prefix = styled(Sub)`
`

const noOptionsMessage = ({ inputValue }) => {
  if (inputValue) return `Не найдено "${inputValue}"`
  return 'Не найдено'
}

const loadingMessage = ({ inputValue }) => {
  return 'Загрузка'
}

const Select = props => {
  const {
    theme,
    label,
    prefix,
    labelPrefix,
    error,
    onChange,
    type,
    onMenuOpen,
    onMenuClose,
    required,
    height,
    isCreatable,
    onCreate,
    typeSelect,
    ...rest
  } = props
  const selectRef = React.useRef()
  const [menuIsOpen, setMenuIsOpen] = React.useState(false)

  const handleMenuOpen = () => {
    setMenuIsOpen(true)
    if (typeof onMenuOpen === 'function') {
      onMenuOpen()
    }
  }

  const handleMenuClose = ev => {
    setMenuIsOpen(false)
    if (typeof onMenuClose === 'function') {
      onMenuClose()
    }
  }
  return (
    <SelectWrapper error={error} typeSelect={typeSelect}>
      {label && <InputLabel required={required}>{label}</InputLabel>}
      {labelPrefix &&
        React.cloneElement(
          labelPrefix,
          menuIsOpen
            ? { onClick: handleMenuClose, htmlFor: rest.input.name }
            : { onClick: handleMenuOpen, htmlFor: 'fake' }
        )}
      {prefix && <Prefix>{prefix}</Prefix>}
      <ReactSelect
        ref={selectRef}
        options={options}
        label={labelPrefix || label}
        classNamePrefix={'select'}
        styles={selectStyles(theme, {
          error,
          labelPrefix,
          height,
          menuIsOpen
        }, typeSelect)}
        closeMenuOnSelect={!rest.isMulti}
        menuIsOpen={menuIsOpen}
        openMenuOnClick={type === 'select'}
        onMenuOpen={handleMenuOpen}
        onMenuClose={handleMenuClose}
        noOptionsMessage={noOptionsMessage}
        loadingMessage={loadingMessage}
        onChange={(option, action) => {
          if (typeof onChange === 'function') {
            onChange(option)
          }
          if (typeof rest.input.onChange === 'function') {
            rest.input.onChange(prop('id', option))
          }
        }}
        components={{
          MenuList: menuListProps => <MenuList
            isCreatable={isCreatable}
            onCreate={onCreate}
            selectRef={selectRef}
            {...menuListProps}
          />
        }}
        {...rest}
        inputId={rest.input.name}
      />
    </SelectWrapper>
  )
}

Select.propTypes = {
  theme: PropTypes.object,
  label: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.oneOf(['select', 'autocomplete']),
  isMulti: PropTypes.bool,
  isCreatable: PropTypes.bool,
  options: PropTypes.array.isRequired,
  onMenuOpen: PropTypes.func,
  onMenuClose: PropTypes.func,
  onCreate: PropTypes.func,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

Select.defaultProps = {
  type: 'select',
  placeholder: 'Выберите из списка',
  isCreatable: false,
  isMulti: false
}

export default withTheme(Select)
