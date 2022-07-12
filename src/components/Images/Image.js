import NextImage from 'next/image'
import styled from 'styled-components'
import React from 'react'

const Box = styled.div`
  position: relative;
`

const BoxContent = styled.div`
  position: relative;
  z-index: 1
`

function Image (props) {
  const { alt, src, children, imageProps, className = '', objectFit, objectPosition, ...restProps } = props
  return (
    <Box {...restProps} className={'imageBox'}>
      {children && (
        <BoxContent className={'imageBoxContent'}>{children}</BoxContent>
      )}
      {src && (
        <NextImage
          alt={alt}
          src={src}
          className={['next-image', className].join(' ')}
          role={alt ? undefined : 'presentations'}
          layout={'fill'}
          objectFit={objectFit}
          objectPosition={objectPosition}
          {...imageProps}
        />
      )}
    </Box>
  )
}

Image.defaultProps = {
  objectFit: 'cover',
  objectPosition: 'center'
}

export default Image
