// restrict to logged in users.. privacy- security

export default defineNuxtRouteMiddleware((to, from) => {
   if (to.path.includes('profile')) {
      const user = useSupabaseUser()
      if (user.value) {
         // if user contains a value, return
         return
      }
      return navigateTo('/login') // else require login
   }
})
