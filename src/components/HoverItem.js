import styled from 'styled-components'

const HoverItem = styled.span`
  position: relative;
  &:after {
    content: " ";
    position: absolute;
    bottom: -2px;
    left: 0px;
    height: 2px;
    background-color: #111;
    transform-origin: 0% 100%;
    transition: all 400ms cubic-bezier(0.165, 0.84, 0.44, 1) 0s;;
    width: ${({ isActive }) => isActive ? '100%' : '0px'};
  };
  &:hover {
    &:after {
      width: 100%;
    };
  };
`

export default HoverItem
