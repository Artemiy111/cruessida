<script setup lang="ts">
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import CartButton from '~/components/CartButton.vue'

const { load } = useUser()
await useAsyncData('user', () => load().then(() => true))
</script>

<template>
  <div class="wrapper">
    <Header />
    <NuxtPage />
    <Footer />
    <Toaster />
    <CartButton />
  </div>
</template>

<style>
.wrapper {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100dvh;
  row-gap: 2rem;

  &:has(.wrapper-no-gap) {
    row-gap: 0;
  }
}
</style>
