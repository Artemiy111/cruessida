<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { feedbackSchema } from '~~/server/shared/validators'

const form = useForm({ validationSchema: toTypedSchema(feedbackSchema) })

const { user, sendFeedback } = useUser()
</script>

<template>
  <main class="container">
    <Heading>Контакты</Heading>
    <p class="text-xl">
      Мы предлагаем вам свои контакты для обратной связи. Если у вас есть какие-либо вопросы или
      нужна помощь, пожалуйста, свяжитесь с нами по адресу почты contact@cressida.ru
    </p>

    <ul class="text-xl mt-8 space-y-2">
      <li>Уфа, Рубежная, 174 с 10:00 до 22:00</li>
      <li>+7 (347) 293 54 38</li>
      <ul>
        По вопросам аренды и вакансий пишите на адрес
        <li>
          <NuxtLink to="mailto:cressida-ufa@yandex.ru" class="text-orange-500"
            >cressida-ufa@yandex.ru</NuxtLink
          >
        </li>
      </ul>
      <ul>
        По вопросам рекламы отправляйте предложения
        <li>
          <NuxtLink to="mailto:reklama@cressida.ru" class="text-orange-500"
            >reklama@cressida.ru</NuxtLink
          >
        </li>
      </ul>
    </ul>

    <h2 class="text-2xl font-bold mt-12">Оставьте обратную связь</h2>
    <AutoForm
      @submit="
        async data => {
          await sendFeedback(data)
          form.resetForm()
        }
      "
      :form="form"
      :schema="feedbackSchema"
      :field-config="{
        message: {
          component: 'textarea',
          label: 'Ваше сообщение',
        },
      }"
    >
      <div class="flex gap-4 items-center">
        <Button :disabled="!user" type="submit" class="mt-4">Отправить</Button>
        <p v-if="!user" class="mt-4 text-center">Войдите для отправки сообщения</p>
      </div>
    </AutoForm>
  </main>
</template>
