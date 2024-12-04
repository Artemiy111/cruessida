<script setup lang="ts">
import { PlusIcon, MinusIcon } from 'lucide-vue-next'
import { useToast } from '~/components/ui/toast'

const id = computed(() => useRoute().params.id)
const { data: product, refresh } = await useAsyncData('catalog', () =>
  $fetch(`/api/products/get-product/${id.value}`, { headers: useRequestHeaders() }),
)

const { user } = useUser()
const { toast } = useToast()

const { addToCart, updateQuantity } = useCart()

const addProductToCart = async (productId: number) => {
  if (!user.value) {
    toast({ title: 'Войдите для добавления в корзину' })
    return
  }
  await addToCart(productId)
  refresh()
}
</script>

<template>
  <main class="container">
    <section class="grid grid-cols-[320px,1fr] gap-12">
      <img :src="product?.image" alt="" class="w-full" />
      <div class="">
        <Heading>{{ product?.title }}</Heading>
        <p class="text-lg font-bold">{{ product?.price }} ₽</p>
        <Button
          v-if="!product?.cartItems?.[0]"
          class="mt-6"
          variant="outline"
          @click="addProductToCart(product!.id)"
          >Добавить в корзину</Button
        >
        <div v-else class="mt-6 flex items-center">
          <Button
            @click="updateQuantity(product.id, product?.cartItems?.[0].quantity - 1), refresh()"
            variant="outline"
            class="w-10"
          >
            <MinusIcon />
          </Button>
          <span class="w-8 text-center">{{ product?.cartItems?.[0].quantity }}</span>
          <Button
            @click="updateQuantity(product.id, product?.cartItems?.[0].quantity + 1), refresh()"
            variant="outline"
            class="w-10"
          >
            <PlusIcon />
          </Button>
        </div>
      </div>
    </section>
  </main>
</template>
