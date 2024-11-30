<script setup lang="ts">
import { registerSchema } from '~~/server/shared/validators'

const { register } = useUser()
</script>

<template>
  <main class="container max-w-lg">
    <Heading>Регистрация</Heading>
    <AutoForm
      @submit="register"
      :schema="registerSchema"
      :field-config="{
        email: {
          label: 'Email',
        },
        password: {
          label: 'Пароль',
          inputProps: { type: 'password' },
        },
        confirmPassword: {
          label: 'Подтвердите пароль',
          inputProps: { type: 'password' },
        },
      }"
    >
      <Button type="submit" class="mt-4">Зарегистрироваться</Button>
    </AutoForm>
  </main>
</template>
