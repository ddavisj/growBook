export default defineNuxtRouteMiddleware((to, from) => {
   const AuthStore = useAuthStore()

   if (to.path.includes('profile')) {
      if (AuthStore.loggedIn) {
         return
      }
      return navigateTo('/login')
   }
})

// const user = useSupabaseUser()
// if (user.value) {
