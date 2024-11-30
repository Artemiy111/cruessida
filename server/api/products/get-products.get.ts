import { eq } from 'drizzle-orm'
import { db } from '~~/server/db'
import { CartItemDb, cartItems, ProductDb } from '~~/server/db/schema'
import { maybeAuthed } from '~~/server/shared/auth-utils'

export default defineEventHandler(async event => {
  const user = maybeAuthed(event)
  const products_ = await db.query.products.findMany({
    with: user?.id ? {
      cartItems: {
        where: eq(cartItems.userId, user.id)
      }
    } : undefined
  })
  const products__ = products_ as Array<
    ProductDb & { cartItems?: CartItemDb[] }>

  return Object.groupBy(products__, p => p.section)
})