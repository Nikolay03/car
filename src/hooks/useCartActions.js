
import { removeItemFrom, setItemToCart } from '~/components/cart/storage'
import { useCartData } from '~/providers/CartProvider'

export const getProductIncrementAmount = (product) => {
  return 1
}

export default function useCartActions () {
  const [, dispatch] = useCartData()
  const onAddProductFirst = (product) => {
    const incrementAmount = getProductIncrementAmount(product)
    setItemToCart(incrementAmount, product, dispatch)
  }

  const onIncrementProduct = (product, value) => {
    const incrementAmount = getProductIncrementAmount(product)
    const amount = (+value + incrementAmount).toFixed(1)
    return setItemToCart(amount, product, dispatch)
  }

  const onDecrementProduct = (product, value) => {
    const incrementAmount = getProductIncrementAmount(product)
    const amount = (+value - incrementAmount).toFixed(1)
    return setItemToCart(amount, product, dispatch)
  }

  const onRemoveProduct = (productId) => {
    return removeItemFrom(productId, dispatch)
  }

  return {
    onAddProductFirst,
    onIncrementProduct,
    onDecrementProduct,
    onRemoveProduct
  }
}
