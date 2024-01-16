// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
   devtools: { enabled: true },
   colorMode: {
      preference: 'dark',
   },
   // nitro: {
   //    preset: 'vercel',
   //    vercel: {
   //       regions: ['syd1'],
   //    },
   // },
   modules: [
      '@nuxt/ui',
      '@nuxtjs/tailwindcss',
      '@nuxt/image',
      '@vueuse/nuxt',
      '@nuxtjs/supabase',
      [
         '@pinia/nuxt',
         {
            autoImports: ['acceptHMRUpdate'],
         },
      ],
   ],
   supabase: {
      redirect: false,
   },
})
