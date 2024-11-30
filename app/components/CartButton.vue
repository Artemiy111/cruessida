<script setup lang="ts">
import { ShoppingCart } from 'lucide-vue-next'
import { cn } from '~/lib/utils'
import { buttonVariants } from './ui/button'

const { user } = useUser()
</script>

<template>
  <NuxtLink
    v-if="user"
    to="/cart"
    :class="
      cn(
        buttonVariants({ variant: 'outline' }),
        'fixed w-fit h-fit rounded-full bottom-8 right-8 p-6',
      )
    "
  >
    <ShoppingCart class="min-h-6 min-w-6" />
  </NuxtLink>
</template>
