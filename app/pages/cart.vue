<script setup lang="ts">
import { watchImmediate } from '@vueuse/core'
import { TrashIcon, MinusIcon, PlusIcon, ShoppingCartIcon } from 'lucide-vue-next'

const { user } = useUser()
watchImmediate(user, () => !user.value && navigateTo('/login'))

const { cart, totalPrice, updateQuantity, createOrder, refresh } = useCart()
</script>

<template>
  <main class="container">
    <Heading>Корзина</Heading>
    <div v-if="cart.length > 0">
      <div class="space-y-4">
        <Card v-for="item in cart" :key="item.id">
          <CardContent class="flex items-center justify-between p-4">
            <div class="flex items-center space-x-4">
              <img
                :src="item.product.image"
                :alt="item.product.title"
                class="w-16 h-16 object-cover rounded"
              />
              <div>
                <h3 class="font-semibold">{{ item.product.title }}</h3>
                <p class="text-sm text-gray-500">{{ item.product.price }} ₽ за шт</p>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <div class="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  @click="updateQuantity(item.productId, item.quantity - 1)"
                >
                  <MinusIcon class="h-4 w-4" />
                </Button>
                <span class="w-8 text-center">{{ item.quantity }}</span>
                <Button
                  variant="outline"
                  size="icon"
                  @click="updateQuantity(item.productId, item.quantity + 1)"
                >
                  <PlusIcon class="h-4 w-4" />
                </Button>
              </div>
              <p class="font-semibold">{{ item.product.price * item.quantity }} ₽</p>
              <Button variant="destructive" size="icon" @click="updateQuantity(item.productId, 0)">
                <TrashIcon class="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <div class="mt-8 flex justify-between items-center">
        <p class="text-2xl font-bold">Итого: {{ totalPrice }} ₽</p>
        <Button @click="createOrder">Оформить заказ</Button>
      </div>
    </div>
    <div v-else class="text-center py-8">
      <ShoppingCartIcon class="mx-auto h-12 w-12 text-gray-400" />
      <h2 class="mt-4 text-lg font-semibold">Ваша корзина пуста</h2>
      <p class="mt-2 text-gray-500">Добавьте товары в корзину, чтобы оформить заказ</p>
      <Button class="mt-4" @click="$router.push('/catalog')">Перейти в каталог</Button>
    </div>
  </main>
</template>
