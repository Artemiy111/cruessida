export default defineEventHandler(async event => {
  deleteCookie(event, 'user')
  return { error: false, message: 'Вы успешно вышли' }
})