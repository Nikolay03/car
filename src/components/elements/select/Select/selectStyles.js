export default (theme, params, type) => {
  const isTypeButton = type === 'button'
  const controlButton = (provided, state) => ({
    ...provided,
    backgroundColor: 'transparent',
    boxShadow: null,
    cursor: 'pointer',
    borderRadius: '38px',
    border: `1px solid ${theme.color.primary}`,
    transition: theme.transition.primary,
    color: theme.color.primary,
    fontWeight: 700,
    height: params.height,
    padding: '0px 0px',
    '&:hover': {
      border: `1px solid ${theme.color.primary}`
    }
  })
  return {
    control: isTypeButton
      ? controlButton
      : (provided, state) => ({
        ...provided,
        // backgroundColor: state.isFocused ? 'white' : theme.background.secondary,
        backgroundColor: theme.background.secondary,
        boxShadow: null,
        borderRadius: theme.borderRadius.primary,
        borderColor: 'transparent',
        transition: theme.transition.primary,
        height: params.height,
        minHeight: params.height ? 'unset' : '50px',
        '&:hover': {
          borderColor: 'transparent'
        }
      }),
    indicatorSeparator: () => ({}),
    loadingIndicator: (provided, state) => ({
      ...provided,
      '& span': {
        background: state.isFocused ? theme.color.primary : theme.color.secondary
      }
    }),
    clearIndicator: provided => ({
      ...provided,
      display: 'flex',
      color: theme.color.secondary,
      padding: '0'
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      alignItems: 'center',
      color: state.isFocused
        ? (params.error
          ? `${theme.color.primary}
       !important`
          : theme.color.primary)
        : theme.color.primary,
      padding: '0 12px',
      transition: 'color 300ms, transform 150ms',
      transform: params.menuIsOpen ? 'rotate(180deg)' : 'rotate(0)',
      '&:hover': {
        color: theme.color.primary
      }
    }),
    menuPortal: provided => ({
      ...provided,
      zIndex: 1500
    }),
    menu: provided => ({
      ...provided,
      border: '1px solid',
      borderColor: 'rgba(91, 101, 121, 0.12)',
      boxShadow: theme.boxShadow.primary,
      borderRadius: '10px',
      margin: '0',
      top: 'calc(100% + 4px)'
    }),
    menuList: provided => ({
      ...provided,
      padding: '7px'
    }),
    option: (provided, state) => ({
      ...provided,
      background: state.isSelected ? '#EBECFC' : state.isFocused ? '#F5F6FD' : 'none',
      borderRadius: '10px',
      color: 'inherit',
      cursor: 'pointer',
      padding: '12px',
      transition: theme.transition.primary,
      '&:active': {
        background: '#F5F6FD'
      }
    }),
    valueContainer: (provided, state) => {
      const isMultiWithValues = state.hasValue && state.isMulti
      return {
        ...provided,
        padding: params.labelPrefix ? '0 20px 0px 170px' : isMultiWithValues ? '4px' : '0 20px'
      }
    },
    singleValue: provided => ({
      ...provided,
      fontSize: '16px',
      color: 'inherit'
    }),
    placeholder: provided => ({
      ...provided,
      color: isTypeButton ? theme.color.primary : theme.color.secondary,
      fontSize: '16px',
      margin: '0'
    }),
    noOptionsMessage: provided => ({
      ...provided,
      color: theme.color.primary
    }),
    loadingMessage: provided => ({
      ...provided,
      color: theme.inputTheme.placeholderColor
    }),

    multiValue: (provided, state) => {
      const hasValueFocused = state.hasValue && params.menuIsOpen
      return {
        ...provided,
        backgroundColor: hasValueFocused ? theme.color.primary : '#FAFBFB',
        border: '1px solid transparent',
        borderRadius: '10px',
        transition: theme.transition.primary,
        margin: '4px',
        '&:hover': {
          borderColor: theme.color.primary
        }
      }
    },
    multiValueLabel: provided => ({
      ...provided,
      fontSize: 'inherit',
      padding: '7px 0',
      paddingLeft: '12px',
      paddingRight: '6px'
    }),
    multiValueRemove: provided => ({
      ...provided,
      alignSelf: 'center',
      borderRadius: '50%',
      color: theme.color.primary,
      cursor: 'pointer',
      justifyContent: 'center',
      paddingLeft: '0',
      paddingRight: '0',
      marginRight: '12px',
      transition: theme.transition.primary,
      height: '20px',
      width: '20px',
      '&:hover': {
        backgroundColor: '#8591A3',
        color: 'white'
      },
      '& svg': {
        height: '16px',
        width: '16px'
      }
    })
  }
}
