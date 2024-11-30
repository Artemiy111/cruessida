import { registerSchema } from '~~/server/shared/validators'
import { hash } from 'argon2'
import { db } from '~~/server/db'
import { eq } from 'drizzle-orm'
import { users } from '~~/server/db/schema'

export default defineEventHandler(async event => {
  const body = await readValidatedBody(event, registerSchema.parse)

  const existingUser = await db.query.users.findFirst({ where: eq(users.email, body.email) })
  if (existingUser) return { error: true as const, message: 'Пользователь с таким email уже существует' }

  const passwordHash = await hash(body.password)

  const user = (await db.insert(users).values({ email: body.email, passwordHash }).returning())[0]

  setCookie(event, 'user', JSON.stringify(existingUser), { secure: true, expires: new Date(Date.now() + 1000 * 60 * 60 * 24) })
  return { error: false as const, message: 'Вы успешно вошли', user }
})