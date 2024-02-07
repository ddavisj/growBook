export default defineNuxtRouteMiddleware((to, from) => {
   const AuthStore = useAuthStore()

   // Redirect to regn on 1st login
   if (AuthStore.loggedIn && !AuthStore.username) {
      console.log('Redirected!')
      return navigateTo('/user/register')
   }
   return
})
