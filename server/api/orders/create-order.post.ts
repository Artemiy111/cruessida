import { eq } from 'drizzle-orm'
import { db } from '~~/server/db'
import { cartItems, orderItems, orders } from '~~/server/db/schema'
import { assertAuthed } from '~~/server/shared/auth-utils'

export default defineEventHandler(async event => {
  const user = assertAuthed(event)
  await db.transaction(async (tx) => {
    const cart = await event.$fetch('/api/cart/get-cart')
    const order = (await tx.insert(orders).values({ userId: user.id }).returning())[0]
    await tx.insert(orderItems).values(cart.map(item => ({
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity,
      totalPrice: item.product.price * item.quantity
    })))
    await tx.delete(cartItems).where(eq(cartItems.userId, user.id))
  })
  return { error: false, message: 'Заказ успешно оформлен' }
})