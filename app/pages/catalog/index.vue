<script setup lang="ts">
import { MinusIcon, PlusIcon } from 'lucide-vue-next'
import { useToast } from '~/components/ui/toast'

const input = ref('')
const search = ref('')

const { user } = useUser()
const { toast } = useToast()
const { addToCart, updateQuantity } = useCart()

const { data: products, refresh } = await useAsyncData('catalog', () =>
  $fetch('/api/products/get-products', { headers: useRequestHeaders() }),
)

const sectionTitle = {
  man: 'Мужчинам',
  woman: 'Женщинам',
}

const filteredProducts = computed(() => {
  if (!products.value) return [] as Exclude<typeof products.value, undefined>
  if (!search.value) return products.value
  const filteredSections = Object.entries(products.value).map(([section, products]) => {
    return [
      section,
      products.filter(product => product.title.toLowerCase().includes(search.value.toLowerCase())),
    ] as const
  })

  return Object.fromEntries(filteredSections) as Exclude<typeof products.value, undefined>
})

const setSearch = () => {
  search.value = input.value
}

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
    <Heading>Каталог</Heading>

    <section class="flex gap-4">
      <Input v-model="input" placeholder="Поиск" class="w-80" />
      <Button @click="setSearch">Найти</Button>
    </section>
    <section class="mt-12 flex flex-col gap-12">
      <div v-for="(section, key) in filteredProducts" :key="key" class="">
        <h2 class="text-xl font-bold mb-8">{{ sectionTitle[key] }}</h2>
        <div class="grid grid-cols-4 gap-8">
          <NuxtLink :to="`catalog/${product.id}`" v-for="product in section" :key="product.id">
            <img :src="product.image" class="w-full h-[500px] object-cover" />
            <p class="mt-2 text-lg font-bold">{{ product.price }} ₽</p>

            <h3>{{ product.title }}</h3>
            <Button
              v-if="!product?.cartItems?.[0]"
              class="mt-6"
              variant="outline"
              @click="addProductToCart(product.id)"
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
          </NuxtLink>
        </div>
      </div>
    </section>
  </main>
</template>
