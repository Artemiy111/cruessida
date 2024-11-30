import { toast } from '~/components/ui/toast'
import { feedbackSchema, loginSchema, registerSchema } from '~~/server/shared/validators'
import type { UserDb } from '~~/server/db/schema'

export const useUser = () => {
  const user = useState<UserDb | null>('user', () => null)

  const load = async () => {
    const userCookie = useCookie('user')
    if (!userCookie.value) return

    try {
      user.value = userCookie.value as unknown as UserDb
    } catch (_e) { }
  }

  const login = async (data: typeof loginSchema._type) => {
    const res = await $fetch('/api/auth/login', {
      method: 'POST',
      body: data,
    })
    toast({ title: res.message, variant: res.error ? 'destructive' : 'default' })
    if (!res.error) {
      user.value = res.user
      await navigateTo('/catalog')
    }
  }

  const register = async (data: typeof registerSchema._type) => {
    const res = await $fetch('/api/auth/register', {
      method: 'POST',
      body: data,
    })
    toast({ title: res.message, variant: res.error ? 'destructive' : 'default' })
    if (!res.error) {
      user.value = res.user!
      await navigateTo('/catalog')
    }
  }

  const logout = async () => {
    await fetch('/api/auth/logout')
    user.value = null
  }

  const sendFeedback = async (data: typeof feedbackSchema._type) => {
    const res = await $fetch('/api/feedback/create-feedback', {
      method: 'POST',
      body: data,
    })
    toast({ title: res.message, variant: res.error ? 'destructive' : 'default' })
  }

  return {
    user,
    load,
    login,
    register,
    logout,
    sendFeedback
  }
}