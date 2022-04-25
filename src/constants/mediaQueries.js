const width = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  mobileXL: '465px',
  tabletS: '550px',
  tabletL: '800px',
  laptopS: '1024px',
  laptopM: '1200px',
  laptopL: '1440px',
  desktop: '2560px'
}

export const mediaQueries = {
  mobileS: `(max-width: ${width.mobileS})`,
  mobileM: `(max-width: ${width.mobileM})`,
  mobileL: `(max-width: ${width.mobileL})`,
  mobileXL: `(max-width: ${width.mobileXL})`,
  tabletS: `(max-width: ${width.tabletS})`,
  tabletL: `(max-width: ${width.tabletL})`,
  laptopS: `(max-width: ${width.laptopS})`,
  laptopM: `(max-width: ${width.laptopM})`,
  minLaptopM: `(min-width: ${width.laptopM})`,
  laptopL: `(max-width: ${width.laptopL})`,
  minLaptopL: `(min-width: ${width.laptopL})`,
  desktop: `(min-width: ${width.desktop})`
}
