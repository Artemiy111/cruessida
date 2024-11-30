import { eq } from 'drizzle-orm'
import { db } from '~~/server/db'
import { orders, users } from '~~/server/db/schema'
import { assertAuthed } from '~~/server/shared/auth-utils'

export default defineEventHandler(async (event) => {
  const user = assertAuthed(event)

  return db.query.orders.findMany({
    with: {
      items: {
        with: {
          product: true
        }
      }
    },
    where: eq(orders.userId, user.id)
  })
})