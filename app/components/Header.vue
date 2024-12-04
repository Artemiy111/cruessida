<script setup lang="ts">
import { cn } from '~/lib/utils'
import { buttonVariants } from './ui/button'

const { user, logout } = useUser()
</script>

<template>
  <header class="border-b container">
    <nav class="px-4 py-4 flex justify-between items-center">
      <NuxtLink to="/">
        <img src="/logo.png" alt="Logo" class="h-8" />
      </NuxtLink>
      <ul class="flex space-x-6 items-center">
        <li><NuxtLink to="/catalog" class="hover:text-primary">Каталог</NuxtLink></li>
        <li><NuxtLink to="/gift" class="hover:text-primary">Сертификат</NuxtLink></li>
        <li><NuxtLink to="/contacts" class="hover:text-primary">Контакты</NuxtLink></li>
        <template v-if="!user">
          <li><NuxtLink to="/login" :class="cn(buttonVariants())">Войти</NuxtLink></li>
          <li>
            <NuxtLink to="/register" :class="cn(buttonVariants({ variant: 'outline' }))"
              >Зарегистрироваться</NuxtLink
            >
          </li>
        </template>
        <template v-else>
          <li><NuxtLink to="/orders" class="hover:text-primary">Заказы</NuxtLink></li>
          <li><NuxtLink to="/cart" class="hover:text-primary">Корзина</NuxtLink></li>

          <li>
            <Popover>
              <PopoverTrigger> {{ user!.name }} </PopoverTrigger>
              <PopoverContent class="w-fit">
                <Button @click="logout" variant="destructive">Выйти</Button>
              </PopoverContent>
            </Popover>
          </li>
        </template>
      </ul>
    </nav>
  </header>
</template>
