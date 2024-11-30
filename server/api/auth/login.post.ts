import { loginSchema } from '~~/server/shared/validators'
import { verify } from 'argon2'
import { db } from '~~/server/db'
import { eq } from 'drizzle-orm'
import { users } from '~~/server/db/schema'

export default defineEventHandler(async event => {
  const body = await readValidatedBody(event, loginSchema.parse)

  const user = await db.query.users.findFirst({ where: eq(users.email, body.email) })
  if (!user) return { error: true as const, message: 'Неверный email или пароль' }

  const isValid = await verify(user.passwordHash, body.password)
  if (!isValid) return { error: true as const, message: 'Неверный email или пароль' }

  setCookie(event, 'user', JSON.stringify(user), { secure: true, expires: new Date(Date.now() + 1000 * 60 * 60 * 24) })
  return { error: false as const, message: 'Вы успешно вошли', user }
})