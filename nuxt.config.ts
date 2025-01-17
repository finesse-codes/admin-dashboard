export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/icon',
    'nuxt-highcharts',
    '@pinia/nuxt',
    'nuxt-auth-utils',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/strapi',
  ],
  pinia: {
    storesDirs: ['./stores/**',],
  },
  strapi: {
    url: process.env.STRAPI_URL || 'http://localhost:1337',
    prefix: '/api',
    admin: '/admin'
  },

})