import { db } from '../../db'
import { feedbacks } from '../../db/schema'
import { assertAuthed } from '../../shared/auth-utils'
import { feedbackSchema } from '../../shared/validators'

export default defineEventHandler(async event => {
  const body = await readValidatedBody(event, feedbackSchema.parse)
  const user = assertAuthed(event)

  await db.insert(feedbacks).values({ 'message': body.message, userId: user.id })

  return { error: false, message: 'Вы успешно отправили сообщение' }
})