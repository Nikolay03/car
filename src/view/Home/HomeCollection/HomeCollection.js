import React, { useState } from 'react'
import styled from 'styled-components'
import { find, flatten, pipe, pluck, prop, propEq } from 'ramda'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Title from '~/components/elements/Title'
import { useHomeData } from '~/view/Home/HomeProvider'
import { getListData } from '~/utils/fetch'
import Image from '~/components/Images/Image'
import { useTranslate } from '~/utils/translate'
import Container from '~/components/elements/Container'
import Button from '~/components/elements/Button'
import UniversalStaticSelectField from '~/components/elements/select/UniversalStaticSelectField'
import * as ROUTES from '~/constants/routes'
import { mediaQueries } from '~/constants/mediaQueries'
import FiltersBar from '~/components/elements/FiltersBar'

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
  @media ${mediaQueries.tabletL} {
    grid: 1fr / 1fr;
  }
`

const GridImage = styled.div`
  grid-row: ${({ isFirst }) => isFirst ? '1 / 3' : null};
  @media ${mediaQueries.tabletL} {
    grid-row: auto;
  }
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

  const [value, setValue] = useState(1)
  const { productCategoryData } = useHomeData()
  const router = useRouter()
  const {
    results
  } = getListData(productCategoryData)
  const getChevrolet = find(propEq('name', 'Chevrolet'))(results)
  const children = prop('children', getChevrolet)
  const allModels = pipe(
    pluck('children'),
    flatten
  )(results)
  return (
    <ContainerStyled>
      <HeaderBlock>
        <Title color={'dark'}>{t('home_collection_product')}</Title>
        <UniversalStaticSelectField
          components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null, ClearIndicator: () => null }}
          typeSelect={'button'}
          input={{
            onChange: (val) => {
              const id = val.id || val
              router.replace({
                pathname: ROUTES.CATEGORY_URL,
                query: { ...router.query, car: id }
              }, null, { shallow: true })
              setValue(val)
            },
            value: value
          }}
          placeholder={t('product_find_model')}
          list={allModels}
        />
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
                  <Link href={{
                    pathname: ROUTES.CATEGORY_URL,
                    query: { car: id }
                  }}>
                    <Button themeType={'lighten'} width={'min-content'}>
                      {t('see')}
                    </Button>
                  </Link>
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
