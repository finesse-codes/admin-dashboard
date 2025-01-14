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
    
  ],
  pinia: {
    storesDirs: ['./stores/**',],
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  }
})
