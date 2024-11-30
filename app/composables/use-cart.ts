import { useToast } from '~/components/ui/toast'

export const useCart = () => {
  const { toast } = useToast()
  const { data: cart, refresh } = useAsyncData('cart', () => $fetch('/api/cart/get-cart',
    { headers: useRequestHeaders() }),
    { default: () => [] }
  )

  const totalPrice = computed(() => {
    return cart.value.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  })

  const addToCart = async (productId: number) => {
    await $fetch('/api/cart/add-cart-item', {
      method: 'POST',
      body: JSON.stringify({ productId }),
    })
    refresh()
  }

  const updateQuantity = async (productId: number, quantity: number) => {
    await $fetch('/api/cart/update-cart-item', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    })
    refresh()
  }

  const createOrder = async () => {
    try {
      const res = await $fetch('/api/orders/create-order', { method: 'POST' })
      refresh()
      toast({ title: res.message, variant: res.error ? 'destructive' : 'default' })
    } catch (_e) { toast({ title: 'Не удалось оформить заказ', variant: 'destructive' }) }
  }

  return { cart, totalPrice, refresh, addToCart, updateQuantity, createOrder }
}