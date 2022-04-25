
import React, { FC } from 'react'
import styled from 'styled-components'
import Link from 'next/link'

import Right from '~/icons/Right'
import { mediaQueries } from '~/constants/mediaQueries'

const LaptopBreadcrumbs = styled('div')`
  padding-top: 15px;
  ${({ styles }) => styles}
  @media ${mediaQueries.tabletL} {
    margin-bottom: 0px;
    border-bottom: 1px solid transparent;
  }
`

const BreadcrumbsWrap = styled('nav')`
  display: flex;
  flex-flow: row;
  overflow-x: auto;
  overflow-y: hidden;
  justify-content: flex-start;
  align-items: center;
  user-select: none;
  white-space: nowrap;
  font-size: ${({ theme }) => theme.fontSize.standard};
  font-weight: 500;
  line-height: 14px;
  & span {
    padding-bottom: 2px;
    cursor: pointer;
  }
  & > *:not(:last-child) {
    margin: 0 15px 0 0;
    @media ${mediaQueries.tabletL} {
      margin: 0 15px 0 0;
    }
    color: ${({ theme }) => theme.color.secondary};
    & span {
      &:hover {
        color: ${({ theme }) => theme.color.primary};
      }
    }
    svg {
      fill: ${({ theme }) => theme.color.secondary};
      margin-left: 15px;
      @media ${mediaQueries.tabletL} {
        margin-left: 15px;
      }
      width: 6px;
      height: 9px;
      font-size: 11px;
      margin-bottom: 2px;
    }
  }
  & > em {
    font-style: normal;
    cursor: default;
    color: ${({ theme }) => theme.color.secondary};
    margin: 0 10px 0 0;
  }
  ${({ style }) => style};
`

const LinkWrapper = styled('div')`
  display: flex;
  align-items: center;
`

const Title = styled('h1')`
  text-align: left;
  font-weight: 400;
  padding: 15px 0 24px 0;
  margin: 0px;
  font-size: ${({ theme }) => theme.fontSize.big};
  @media ${mediaQueries.tabletL} {
    padding: 25px 0 24px 0;
  }
  @media ${mediaQueries.tabletS} {
    text-align: left;
  }
`

const Breadcrumbs = props => {
  const { way = [], currentWay, titleBlock, style, styles, withBorder } = props
  if (currentWay) {
    const isTitle = typeof titleBlock === 'function'
    return (
      <LaptopBreadcrumbs styles={styles} withBorder={withBorder} titleBlock={titleBlock}>
        <BreadcrumbsWrap style={style}>
          {way.map((item, index) => {
            const url = item.url
            const title = item.title
            return (
              <LinkWrapper key={index}>
                <Link href={url}>
                  <span>{title}</span>
                </Link>
                <Right />
              </LinkWrapper>
            )
          })}
          <em>{currentWay}</em>
        </BreadcrumbsWrap>
        {isTitle && <Title>{titleBlock}</Title>}
      </LaptopBreadcrumbs>
    )
  }
  return null
}

Breadcrumbs.defaultProps = {
  withBorder: true
}

export default Breadcrumbs
