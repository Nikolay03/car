import { path, map, prop } from 'ramda'

const getProduct = product => ({
  product: prop('id', product),
  amount: prop('amount', product)
})

export const orderCreateAction = (data, products) => {
  const userPhone = path(['address', 'phone'], data)
  const secondPhone = prop('secondPhone', data)
  return {
    delivery_lat: path(['address', 'location', 'lat'], data),
    delivery_lon: path(['address', 'location', 'lon'], data),
    delivery_address: path(['address', 'address'], data),
    second_phone: secondPhone ? `+998${secondPhone}` : null,
    second_fullname: prop('secondFullname', data),
    phone: userPhone,
    delivery_type: path(['deliveryType', 'id'], data),
    payment_type: path(['paymentType', 'id'], data),
    products: map(getProduct, products),
    give_payment_link: true
  }
}
