export const useAuthStore = defineStore('AuthStore', {
   state: () => {
      return {
         loggedIn: null,
         user: null,
         username: null,
      }
   },
   getters: {},
   actions: {
      async loadUserName() {
         if (this.loggedIn && !this.username) {
            await useFetch('/api/user/get-user', {
               params: {
                  userId: this.user.id,
               },
               onResponse({ response }) {
                  const AuthStore = useAuthStore()

                  if (response._data) {
                     AuthStore.username =
                        response._data.user_name
                  } else {
                     console.log('No data')
                  }
               },
               onResponseError({ request, response }) {
                  console.log(
                     'Fetch error',
                     request,
                     response
                  )
               },
            })
         }
      },
      checkLogin() {
         const user = useSupabaseUser()
         this.loggedIn = !!user.value

         if (user.value) {
            this.user = user.value
         } else {
            this.user = null
         }
      },
      async login() {
         console.log('Logging in')
         const supabase = useSupabaseClient()

         const { error } =
            await supabase.auth.signInWithOAuth({
               provider: 'google',
               // options: {
               //    redirectTo:
               //       'http://localhost:3000/user/register',
               // },
            })

         if (error) {
            console.log(error)
         }

         console.log('Fin logging in')

         const user = useSupabaseUser()
         this.loggedIn = true
         this.user = user.value
      },
      async logout() {
         this.loggedIn = false
         this.user = null
         this.username = null

         const supabase = useSupabaseClient()
         const { error } = await supabase.auth.signOut()

         if (error) {
            console.log(error)
         }
         navigateTo('/')
      },
   },
})

if (import.meta.hot) {
   import.meta.hot.accept(
      acceptHMRUpdate(useAuthStore, import.meta.hot)
   )
}
