<script setup lang="ts">
import Autoplay from 'embla-carousel-autoplay'
const banners = [
  {
    img: '/home/banner-1.jpg',
    url: '/catalog',
  },
  {
    img: '/home/banner-2.jpg',
    url: '/catalog',
  },
]
</script>

<template>
  <main class="container wrapper-no-gap">
    <Carousel
      :opts="{ loop: true }"
      :plugins="[
        Autoplay({
          delay: 2000,
        }),
      ]"
      class="relative w-full"
    >
      <CarouselContent class="h-[480px]">
        <CarouselItem v-for="banner in banners" :key="banner.img">
          <NuxtLink :to="banner.url">
            <img class="w-full h-full object-cover" :src="banner.img" alt="Banner" />
          </NuxtLink>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>

    <section class="mt-16">
      <h2 class="text-3xl font-bold text-center">Почему выбирают нас</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-2">Самый большой выбор кожи в уфе</h3>
            <p>Ассортимент разных стилей и для разных возрастов</p>
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-2">
              Размеры как для миниатюрных девушек так и для богатырей
            </h3>
            <p>Размерный ряд от 42 до 62</p>
          </div>
        </div>
        <div class="flex justify-center">
          <img
            src="/home/choose-us.png"
            alt="Наш ассортимент"
            class="rounded-lg max-w-full h-auto"
          />
        </div>
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-2">Широкий ассортимент норковых и мутоновых шуб</h3>
            <p>От эконом до единичных эксклюзивных моделей</p>
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-2">Бесплатный подгон рукавов и длины изделия</h3>
            <p>Во всех салонах работают специализированные ателье</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
