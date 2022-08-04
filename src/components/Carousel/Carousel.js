import MultiCarousel from 'react-multi-carousel'
import React from 'react'
import { ChevronLeft, ChevronRight } from 'react-feather'
import styled from 'styled-components'

import Title from '~/components/elements/Title'
import Container from '~/components/elements/Container'

const ButtonGroupCont = styled(Container)`
  position: absolute;
  top: -85px;
`

const HeaderBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Buttons = styled.div`
  display: grid;
  grid: 1fr / 1fr 1fr;
  grid-gap: 20px;
`
const Fab = styled('button')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
  border-radius: 50%;
  background: ${({ theme }) => theme.background.secondary};
`

const StyledCont = styled(Container)`
  padding: 0px 0px;
  position: relative;
  & .react-multi-carousel-list {
    overflow: visible;
  }
`

const ButtonGroup = ({ next, title, previous, ...rest }) => {
  return (
    <ButtonGroupCont>
      <HeaderBlock>
        <Title color={'dark'}>{title}</Title>
        <Buttons>
          <Fab onClick={() => previous()}>
            <ChevronLeft />
          </Fab>
          <Fab onClick={() => next()}>
            <ChevronRight />
          </Fab>
        </Buttons>
      </HeaderBlock>
    </ButtonGroupCont>
  )
}

export default function Carousel (props) {
  const { children, customButtonGroup = true, innerRef, title, ...restProps } = props

  return (
    <StyledCont>
      <MultiCarousel
        customButtonGroup={customButtonGroup && <ButtonGroup title={title} />}
        arrows={false}
        renderButtonGroupOutside={true}
        infinite={false}
        innerRef={innerRef}
        ssr={true}
        partialVisible={true}
        {...restProps}
      >
        {children}
      </MultiCarousel>
    </StyledCont>
  )
}
