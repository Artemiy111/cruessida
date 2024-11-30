<script setup lang="ts">
import { watchImmediate } from '@vueuse/core'
import { PackageIcon } from 'lucide-vue-next'

const { user } = useUser()
watchImmediate(user, () => !user.value && navigateTo('/login'))

const { data: orders } = await useAsyncData(
  'orders',
  () => $fetch('/api/orders/get-orders', { headers: useRequestHeaders() }),
  { default: () => [] },
)

const calculateOrderTotal = (order: { items: { totalPrice: number }[] }) => {
  return order.items.reduce((total, item) => total + item.totalPrice, 0)
}
</script>

<template>
  <main class="container">
    <Heading>Заказы</Heading>
    <div v-if="orders.length > 0">
      <Card v-for="order in orders" :key="order.id" class="mb-6">
        <CardHeader>
          <CardTitle>Заказ #{{ order.id }}</CardTitle>
          <CardDescription>
            Дата создания: {{ new Date(order.createdAt).toLocaleString() }}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Товар</TableHead>
                <TableHead>Количество</TableHead>
                <TableHead>Цена за шт.</TableHead>
                <TableHead>Итого</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="item in order.items" :key="item.product.id">
                <TableCell class="flex items-center gap-4">
                  <img :src="item.product.image" class="h-16 object-cover" />
                  {{ item.product.title }}
                </TableCell>
                <TableCell>{{ item.quantity }}</TableCell>
                <TableCell>{{ item.product.price }} ₽</TableCell>
                <TableCell>{{ item.totalPrice }} ₽</TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan="3">Общая сумма заказа</TableCell>
                <TableCell>{{ calculateOrderTotal(order) }} ₽</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
    </div>
    <div v-else class="text-center py-8">
      <PackageIcon class="mx-auto h-12 w-12 text-gray-400" />
      <h2 class="mt-4 text-lg font-semibold">У вас пока нет заказов</h2>
      <p class="mt-2 text-gray-500">Когда вы сделаете заказ, он появится здесь</p>
      <Button class="mt-4" @click="$router.push('/catalog')">Перейти в каталог</Button>
    </div>
  </main>
</template>
