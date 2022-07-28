import React from 'react'
import styled from 'styled-components'

import Title from '~/components/elements/Title'
import Container from '~/components/elements/Container'
import Button from '~/components/elements/Buttons/Button'
import { useHomeData } from '~/view/Home/HomeProvider'
import { getListData } from '~/utils/fetch'
import { useTranslate } from '~/utils/translate'

const StyledCont = styled(Container)`
  padding: 0px 15px;
`

const FullWidth = styled.div`
  background: url('/assets/banner.jpg') left center / cover no-repeat;
  max-height: 400px;
  padding: 50px 40px 100px;
  display: flex;
  align-items: center;
  justify-content: start;
`

const Content = styled.div`
  max-width: 440px;
  h1 {
    letter-spacing: -0.75px;
    margin-bottom: 20px;
    line-height: 90.6%;
  }
  p {
    color: white;
    margin-bottom: 35px;
  }
`

const HomeBanner = props => {
  const { t, translateData } = useTranslate()
  const { bannerData } = useHomeData()

  const {
    results
  } = getListData(bannerData)
  return results.map(banner => {
    const id = banner.id
    const title = translateData(banner, 'title')
    const description = translateData(banner, 'description')
    return (
      <StyledCont key={id}>
        <FullWidth>
          <Content>
            <Title as={'h1'}>
              {title}
            </Title>
            <p>{description}</p>
            <Button themeType={'lighten'}>
              {t('search')}
            </Button>
          </Content>
        </FullWidth>
      </StyledCont>
    )
  })
}

export default HomeBanner
