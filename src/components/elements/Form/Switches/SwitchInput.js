import styled from 'styled-components'

import CheckMark from './CheckMark'

export default styled.input`
  cursor: pointer;
  height: 0;
  position: absolute;
  opacity: 0;
  width: 0;
  :checked + ${CheckMark} {
    border-color: ${({ theme }) => theme.palette.primary};
    :after {
      opacity: 1;
    }
  }
`
