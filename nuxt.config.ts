import { miraiUiPlugin } from '@miraiui-org/theme';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@vueuse/nuxt'],
  tailwindcss: {
    config: {
      plugins: [miraiUiPlugin()],
      content: [
        './node_modules/@miraiui-org/**/*.{js,ts,tsx,vue,md}',
      ],
    },
  },
})
