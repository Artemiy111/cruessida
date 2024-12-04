import { eq } from 'drizzle-orm'
import { db } from '~~/server/db'
import { CartItemDb, cartItems, ProductDb, products } from '~~/server/db/schema'
import { maybeAuthed } from '~~/server/shared/auth-utils'

export default defineEventHandler(async (event) => {
  const user = maybeAuthed(event)
  const id = Number(getRouterParam(event, 'id')!)

  const product_ = await db.query.products.findFirst({
    where: eq(products.id, id),
    with: user?.id ? {
      cartItems: {
        where: eq(cartItems.userId, user.id)
      }
    } : undefined
  })

  const product = product_ as ProductDb & { cartItems?: CartItemDb[] }
  return product
})