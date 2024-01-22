export default defineNuxtRouteMiddleware((to, from) => {
   const AuthStore = useAuthStore()
   if (AuthStore.username) {
      return
   }
   return navigateTo('/user/register')
})
