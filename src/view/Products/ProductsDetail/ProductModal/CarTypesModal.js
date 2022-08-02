import React from 'react'
import styled from 'styled-components'

import { mediaQueries } from '~/constants/mediaQueries'
import Modal from '~/components/Modal'
import CarTypesSection from '~/view/Products/ProductsDetail/ProductModal/CarTypesSection'

const Container = styled.div`
  height: 532px;
  @media ${mediaQueries.laptopS} {
    height: calc(100vh - 70px - 100px);
  }
`

const CarTypesModal = ({ initialValues, onChangeFilter, open, onToggle }) => {
  return (
    <Modal
      open={open}
      width={'400px'}
      onClose={onToggle}
      title={'Размер под авто'}
      showHeader={false}
    >
      <Container>
        <CarTypesSection
          initialValues={initialValues}
          onChangeFilter={onChangeFilter}
        />
      </Container>
    </Modal>
  )
}

CarTypesModal.propTypes = {

}

export default CarTypesModal
