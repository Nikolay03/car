const mainColor = '#2E384C'
const greyColor = '#fff'

export const widthPoints = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 425,
  mobileXL: 465,
  tabletS: 550,
  tabletL: 800,
  laptopS: 1024,
  laptopM: 1200,
  laptopL: 1440,
  desktop: 2560
}
const themes = (breakpoints) => {
  const laptopM = breakpoints.width <= widthPoints.laptopM
  const tabletL = breakpoints.width <= widthPoints.tabletL

  return {
    palette: {
      main: mainColor,
      primary: mainColor,
      black: '#000',
      green: '#219653',
      white: greyColor,
      yellow: '#E2A632',
      orange: '#ff5216',
      grey: '#5f6368',
      blue: '#2196f3',
      red: '#d64a54',
      pink: '#d64a54',
      greyLight: '#e9e9e9'
    },
    background: {
      primary: '#FFFFFF',
      primary100: '#D7D7D7',
      secondary: '#E5E5E5',
      hoverPrimary: '#ECECED',
      warning: '#E2A632',
      bgMask: 'rgba(17, 22, 31, 0.76)',
      lighten: '#FCFCFC',
      disabled: '#dedede',
      lightenGrey: '#D9DBDE',
      snackbar: '#2196f3',
      blue: '#1C65B8',
      buttonPrimary: '#2E384C',
      buttonDisabled: '#F4F4F4',
      darkBlue: '#212938',
      skeleton: '#eee',
      button: '#222'
    },
    color: {
      primary: '#111',
      primaryGray: '#222',
      secondary: '#717171',
      lighten: '#A1A5AD',
      darkGrey: '#686F7E',
      disabled: '#c1c1c1',
      background: '#F6F6F6',
      lightenSecondary: '#F6F6F6',
      lightenThird: '#FFFFFF',
      white: '#fff',
      warning: '#E2A632',
      grey: '#B1A696',
      tags: '#5e5e5e',
      placeholder: '#9098A7',
      modal: '#bdbdbd',
      menuItemActive: '#fff',
      button: '#f7f7f7',
      hashTags: mainColor,
      label: '#E2A632'
    },
    borderRadius: {
      primary: '6px',
      secondary: '8px',
      card: '16px',
      button: '20px'
    },
    fontSize: {
      primary: laptopM ? '14px' : '16px',
      large: tabletL ? '27px' : laptopM ? '4.3vw' : '70px',
      biggest: tabletL ? '24px' : laptopM ? '3.3vw' : '36px',
      bigTwo: tabletL ? '24px' : laptopM ? '3.7vw' : '48px',
      medium: tabletL ? '23px' : laptopM ? '26px' : '32px',
      capitalBig: tabletL ? '18px' : '28px',
      capital: tabletL ? '20px' : laptopM ? '23px' : '24px',
      capitalTwo: tabletL ? '18px' : laptopM ? '20px' : '22px',
      big: tabletL ? '23px' : laptopM ? '2.9vw' : '20px',
      capitalMedium: laptopM ? '16px' : '20px',
      small: tabletL ? '16px' : '18px',
      standard: '16px',
      smallest: '15px',
      micro: '14px'
    },
    border: {
      primary: 'rgba(91, 101, 121, 0.12)',
      button: '#2E384C',
      secondary: '#E9EAEB',
      grey: '#E6E7EA',
      darkGrey: '#7B818E',
      buttonActive: `1px solid ${mainColor}`,
      field: '1px solid #e1e4e8',
      fieldActive: `1px solid ${mainColor}`
    },
    boxShadow: {
      primary: '0 1px 5px -1px rgba(157, 157, 157, 0.25)',
      nav: '0 0 5px rgba(193, 193, 193, 0.25)',
      tags: '0 0 4px -2px #c0c0c0',
      modal: '0 1px 10px rgba(157, 157, 157, 0.25)',
      field: 'inset 0 1px 7px #e3e3e3, inset -1px -1px 5px #fff'
    },
    width: {
      wrap: '1200px',
      wrapCenter: '393px',
      contentMain: 'calc(100% - 285px)',
      contentPost: '768px',
      aside: '260px',
      currentWidthResponse: breakpoints.width,
      field: '300px'
    },
    height: {
      nav: '55px'
    },
    scrollbar: {
      thumb: '#DEDEDE'
    },
    table: {
      backgroundColor: '#F9F6F3',
      border: 'none'
    },
    transition: {
      fast: '.1s ease-in-out',
      medium: '.2s ease-in-out',
      long: '.3s ease-in-out'
    }
  }
}

export default themes
