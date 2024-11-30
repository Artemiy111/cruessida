import { z } from 'zod'
import { assertAuthed } from '../../shared/auth-utils'
import { db } from '../../db'
import { cartItems } from '../../db/schema'

export default defineEventHandler(async event => {
  const user = assertAuthed(event)
  const body = await readValidatedBody(event, z.object({ productId: z.number() }).parse)

  await db.insert(cartItems).values({ userId: user.id, productId: body.productId, quantity: 1 })
})