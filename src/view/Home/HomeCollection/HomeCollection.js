import React from 'react'
import styled from 'styled-components'
import { find, prop, propEq } from 'ramda'

import Title from '~/components/elements/Title'
import { useHomeData } from '~/view/Home/HomeProvider'
import { getListData } from '~/utils/fetch'
import Image from '~/components/Images/Image'
import { useTranslate } from '~/utils/translate'
import Container from '~/components/elements/Container'
import Button from '~/components/elements/Button'

const ContainerStyled = styled(Container)`
  padding: 0 15px;
`

const HeaderBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 34px;
`

const GridImages = styled.div`
  display: grid;
  grid: 1fr / 1fr 1fr;
  grid-gap: 22px;
  width: 100%;
`

const GridImage = styled.div`
  grid-row: ${({ isFirst }) => isFirst ? '1 / 3' : null};
  & .imageBox {
    position: relative;
    min-height: 300px;
    height: 100%;
  }
  & .imageBoxContent {
    position: static;
  }
`

const Content = styled.div`
  position: absolute;
  left: 0px;
  z-index: 1;
  bottom: 0px;
  right: 0px;
  padding: 0px 40px 40px 40px;
  & p {
    color: #fff;
    margin-bottom: 16px;
  }
`

const HomeCollection = props => {
  const { t } = useTranslate()
  const { productCategoryData } = useHomeData()

  const {
    results
  } = getListData(productCategoryData)
  const getChevrolet = find(propEq('name', 'Chevrolet'))(results)
  const children = prop('children', getChevrolet)
  return (
    <ContainerStyled>
      <HeaderBlock>
        <Title color={'dark'}>{t('home_collection_product')}</Title>
        <Button themeType={'dark'}>
          {t('product_find_model')}
        </Button>
      </HeaderBlock>
      <GridImages>
        {children.map((i, index) => {
          const id = i?.id
          const name = i?.name
          const image = i?.image || '/assets/banner.jpg'
          return (
            <GridImage key={id} isFirst={index === 1}>
              <Image src={image} className={'collectionImage'} >
                <Content>
                  <p>{t('product_for')} {name}</p>
                  <Button themeType={'lighten'} width={'min-content'}>
                    {t('see')}
                  </Button>
                </Content>
              </Image>
            </GridImage>
          )
        })}
      </GridImages>
    </ContainerStyled>
  )
}

export default HomeCollection
