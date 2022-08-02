import React from 'react'
import styled, { css } from 'styled-components'
import { last } from 'ramda'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

import { getPageList, getCurrentPage } from './utils'
import Pages from './Pages'

import { appendParamsToQuery } from '~/utils/url'

const Wrap = styled.div`
  display: inline-block;
  padding: 4px;
  background: #fff;
  border-radius: 10px;
`
export const Page = styled.button`
  display: inline-block;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 6px;
  background-color: transparent;
  cursor: pointer;
  position: relative;
  ${props => props.isActive && css`
    background: ${({ theme }) => theme.color.secondary};
    color: ${({ theme }) => theme.palette.white};
    font-weight: 600;
  `}
  :last-child {
    :after {
    display: none;
    }
  }
  :after {
    content: ' ';
    position: absolute;
    top: 50%;
    right: -1px;
    height: 24px;
    width: 1px;
    background-color: ${props => props.isActive ? 'transparent' : '#e1e1e1'};
    transform: translateY(-50%);
  }
`
const Container = styled.div`
  text-align: center;
`

const Pagination = props => {
  const {
    count,
    pageSize
  } = props

  const router = useRouter()
  const pageList = getPageList(count, pageSize)
  const pageCount = pageList.length
  const lastPage = last(pageList)
  const currPage = getCurrentPage('page', router)
  const goTo = to => appendParamsToQuery({ page: to }, router)
  const pager = pageCount > 15
    ? (
      <Pages
        currPage={currPage}
        goTo={goTo}
        lastPage={lastPage}
      />
    )
    : pageList.map(page => (
      <Page
        key={page}
        isActive={page === currPage}
        onClick={() => goTo(page)}
      >
        {page}
      </Page>
    ))

  return (
    <Container>
      <Wrap>
        {pager}
      </Wrap>
    </Container>
  )
}

Pagination.propTypes = {
  count: PropTypes.number,
  pageSize: PropTypes.number
}
export default Pagination
