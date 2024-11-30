<script setup lang="ts">
import { loginSchema } from '~~/server/shared/validators'

const { login } = useUser()
</script>

<template>
  <main class="container max-w-lg">
    <Heading>Вход</Heading>
    <AutoForm
      @submit="login"
      :schema="loginSchema"
      :field-config="{
        email: {
          label: 'Email',
        },
        password: {
          label: 'Пароль',
          inputProps: { type: 'password' },
        },
      }"
    >
      <Button type="submit" class="mt-4">Войти</Button>
    </AutoForm>
  </main>
</template>
