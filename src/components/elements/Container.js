import styled from 'styled-components'

import { mediaQueries } from '~/constants/mediaQueries'

export const CONTAINER_SIZE = 1400

const Container = styled.div`
  margin: 0 auto;
  width: ${CONTAINER_SIZE}px;
  max-width: 100%;
  padding: 15px 15px;
  @media ${mediaQueries.laptopM} {
    width: 100%;
  }
`

export default Container
