// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  nitro: {
    experimental: {
      openAPI: true
    }
  },

  future: {
    compatibilityVersion: 4
  },
  shadcn: {
    'componentDir': 'app/components/ui',
    'prefix': '',
  },

  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt']
})