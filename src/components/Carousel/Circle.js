import styled from 'styled-components'

const Circle = styled.div`
  height: 8px;
  cursor: pointer;
  border-radius: 100%;
  margin: 0px 4px;
  width: 8px;
  opacity: 0.9;
  background-color: ${({ bgColor }) => bgColor}
`

export default Circle
