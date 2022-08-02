import { path, map, prop } from 'ramda'

const getProduct = product => ({
  product: prop('id', product),
  quantity: prop('amount', product)
})

export const orderCreateSerializer = (data) => {
  const products = prop('products', data)
  return {
    address: {
      address: path(['address', 'address'], data),
      latitude: path(['address', 'location', 'lat'], data),
      longitude: path(['address', 'location', 'lon'], data)
    },
    client_phone: prop('clientPhone', data),
    client_name: prop('clientName', data),
    delivery_type: path(['deliveryType', 'id'], data),
    payment_type: path(['paymentType', 'id'], data),
    products: map(getProduct, products)
  }
}
