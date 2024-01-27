export default defineNuxtRouteMiddleware((to, from) => {
   const AuthStore = useAuthStore()

   AuthStore.$subscribe(e => {
      const username = e.events.username
      console.log('username:', e.events.username)
      !username ? navigateTo('/user/register') : ''
   })

   // Redirect to regn on 1st login
   if (AuthStore.loggedIn && !AuthStore.username) {
      console.log('Redirected!')
      return navigateTo('/user/register')
   }
   return
})
