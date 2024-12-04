import { db } from '~~/server/db'

export default defineEventHandler(async (event) => {
  return await db.query.banners.findMany()
})