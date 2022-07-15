import React from 'react'
import { isEmpty } from 'ramda'
import { ChevronLeft } from 'react-feather'
import styled from 'styled-components'

const AccordionTitle = styled.div`
    font-weight: 600;
    cursor: pointer;
    border-radius: 1.2em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: padding 0.3s ease-in-out;
    & svg {
      transform: rotate(90deg);
    };
`
const AccordionItem = styled.div`
  overflow: hidden;
  transition: max-height 0.3s cubic-bezier(1, 0, 1, 0);
  height: auto;
  max-height: 9999px;
`

const Content = styled.div`

`

const AccordionWrapper = styled.div`
  & + * {
    margin-top: 0.65em;
  }
  & .collapsed {
    max-height: 0;
    transition: max-height 0.35s cubic-bezier(0, 1, 0, 1);
  };
  & .open {
    & svg {
      transform: rotate(270deg);
    }
    li:before {
      content: " ";
      background-color: ${({ theme }) => theme.color.primary};
    };
    & span {
      &:after {
        width: 100%;
      };
    }
  }
`

const Accordion = ({ title, children, array, initialValue }) => {
  const [isOpen, setOpen] = React.useState(initialValue || false)
  const hasChildren = !isEmpty(array)
  return (
    <AccordionWrapper>
      <AccordionTitle
        className={isOpen ? 'open' : ''}
        onClick={() => setOpen(!isOpen)}
      >
        <span>{title}</span> {hasChildren && <ChevronLeft size={16} />}
      </AccordionTitle>
      {hasChildren && (
        <AccordionItem className={!isOpen ? 'collapsed' : ''}>
          <Content>{children}</Content>
        </AccordionItem>
      )}
    </AccordionWrapper>
  )
}

export default Accordion
