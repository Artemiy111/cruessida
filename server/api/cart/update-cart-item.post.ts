import { z } from 'zod'
import { assertAuthed } from '../../shared/auth-utils'
import { and, eq } from 'drizzle-orm'
import { db } from '../../db'
import { cartItems } from '../../db/schema'

export default defineEventHandler(async event => {
  const user = assertAuthed(event)
  const body = await readValidatedBody(event, z.object({ productId: z.number(), quantity: z.number() }).parse)

  if (body.quantity === 0) await db.delete(cartItems).where(and(
    eq(cartItems.userId, user.id),
    eq(cartItems.productId, body.productId)))
  else await db.update(cartItems).set({ quantity: body.quantity }).where(and(
    eq(cartItems.userId, user.id),
    eq(cartItems.productId, body.productId)))
})