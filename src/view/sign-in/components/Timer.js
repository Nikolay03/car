import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { getDuration } from '~/utils/get'

const Time = styled.div`
  color: ${({ theme }) => theme.palette.primary};
  font-weight: 500;
  font-size: 16px;
  letter-spacing: 2px;
  cursor: ${({ hover }) => hover ? 'pointer' : 'default'};
`

const ONE = 1
const EVERY_SEC = 1000

const Timer = props => {
  const { time, onStop, onAfterClick } = props

  const [count, setCount] = useState(time)

  useEffect(() => {
    // eslint-disable-next-line init-declarations
    let interval
    if (count) {
      interval = setInterval(() => {
        setCount((seconds) => seconds - ONE)
      }, EVERY_SEC)
    }
    else {
      onStop && onStop()
      clearInterval()
    }
    return () => clearInterval(interval)
  }, [count, onStop])

  return (
    <Time
      onClick={() => {
        if (+count === 0) {
          onAfterClick()
          setCount(time)
        }
      }}
      hover={+count === 0}
    >
      {+count > 0
        ? getDuration(count)
        : 'Отправить заново'}
    </Time>
  )
}

export default Timer
