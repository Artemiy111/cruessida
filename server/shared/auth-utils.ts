import { type H3Event } from 'h3'
import { UserDb } from '../db/schema'

export const assertAuthed = (event: H3Event) => {
  const userCookie = getCookie(event, 'user')
  if (!userCookie) throw createError({ 'statusCode': 401, 'message': 'Unauthorized' })

  try {
    const user = JSON.parse(userCookie) as UserDb
    return user
  } catch (_e) {
    throw createError({ 'statusCode': 401, 'message': 'Unauthorized' })
  }
}

export const maybeAuthed = (event: H3Event) => {
  const userCookie = getCookie(event, 'user')
  if (!userCookie) return null

  try {
    const user = JSON.parse(userCookie) as UserDb
    return user
  } catch (_e) {
    return null
  }
}