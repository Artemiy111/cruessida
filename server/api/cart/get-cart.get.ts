import { eq } from 'drizzle-orm'
import { db } from '../../db'
import { maybeAuthed } from '../../shared/auth-utils'
import { cartItems } from '../../db/schema'

export default defineEventHandler(async event => {
  const user = maybeAuthed(event)
  if (!user) return []

  const cartItems_ = await db.query.cartItems.findMany({
    where: eq(cartItems.userId, user.id),
    with: {
      product: true
    }
  })

  return cartItems_
})