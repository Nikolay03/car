import styled from 'styled-components'
import React, { useState } from 'react'
import { YMaps, Map, SearchControl } from 'react-yandex-maps'
import { drop, join, path, pipe, split } from 'ramda'
import PropTypes from 'prop-types'

import Pin from '~/icons/Pin'
import Button from '~/components/elements/Buttons/Button'
import Modal from '~/components/Modal'
import { mediaQueries } from '~/constants/mediaQueries'

const CENTER = [41.30882292588138, 69.25220409208157]
const API_KEY = 'bc8fdb09-3efc-4819-8ca5-2c1d7f7708d2'

const buttonStyles = {
  position: 'absolute',
  bottom: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: '2'
}
const Container = styled.div`
  height: 532px;
  @media ${mediaQueries.laptopS} {
    height: calc(100vh - 70px - 100px);
  }
`
const ModalWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  margin-left: -25px;
  margin-top: -30px;
`
const MapWrapper = styled.div`
  position: relative;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  height: 100%;
`
const PinUI = styled.div`
  position:absolute;
  bottom: 50%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  & svg {
    width: 30px;
    height: 64px;
  }
`
const AddressBar = styled.div`
  max-width: ${props => props.loading ? '45px' : '700px'};
  transition: max-width 300ms;
  position: absolute;
  z-index: 10;
  bottom: 90px;
  padding: 10px 20px;
  background: #fff;
  border-radius: 8px;
  left: 50%;
  transform: translateX(-50%);
  overflow: hidden;
  text-overflow: ellipsis;
  box-shadow: 0 4px 15px 0 rgba(190, 195, 204, 0.77);
`
const LAT = 0
const LON = 1
const YandexMap = (props) => {
  const {
    input,
    open,
    onToggle,
    onAddressChange,
    addressValue
  } = props

  // const [center, setCenter] = useState(CENTER)
  const [loading, setLoading] = useState(false)
  const [map, setMap] = useState(CENTER)

  const onAddress = (coords) => {
    setLoading(true)
    map.geocode(coords)
      .then((res) => {
        const firstGeoObject = res.geoObjects.get(0)
        const addressText = firstGeoObject.getAddressLine()
        const withoutCountry = pipe(
          split(','),
          drop(1),
          join(',')
        )(addressText)
        onAddressChange(withoutCountry)

        const location = {
          lat: coords[LAT],
          lon: coords[LON]
        }
        input.onChange(location)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  const onCenter = (val) => {
    const newCenter = path(['originalEvent', 'newCenter'], val)
    // setCenter(newCenter)
    onAddress(newCenter)
  }

  return (
    <Modal
      open={open}
      onClose={onToggle}
      title={'Указать на карте'}
      showHeader={false}
      modalStyles={{
        margin: 0,
        top: '50%',
        position: 'relative',
        transform: 'translateY(-50%) !important'
      }}
    >
      <Container>
        <ModalWrapper>
          <MapWrapper>
            <PinUI>
              <Pin />
            </PinUI>
            {!(!addressValue && !loading) &&
              <AddressBar loading={loading}>{loading ? '...' : addressValue}</AddressBar>}
            <Button
              styles={buttonStyles}
              onClick={onToggle}
            >Сохранить</Button>
            <YMaps query={{ apikey: API_KEY, lang: 'ru_RU', mode: 'debug' }} preload={true}>
              <Map
                height={'600px'}
                width={'100%'}
                onLoad={setMap}
                modules={['geocode']}
                onBoundsChange={onCenter}
                defaultState={{ center: CENTER, zoom: 12, controls: [] }}
              >
                <SearchControl options={{ float: 'left' }} />
              </Map>
            </YMaps>
          </MapWrapper>
        </ModalWrapper>
      </Container>
    </Modal>
  )
}

YandexMap.propTypes = {
  input: PropTypes.any,
  open: PropTypes.bool,
  onToggle: PropTypes.func,
  onAddressChange: PropTypes.func,
  addressValue: PropTypes.any
}

export default YandexMap
