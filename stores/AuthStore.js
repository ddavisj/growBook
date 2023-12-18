export const useAuthStore = defineStore('AuthStore', {
   state: () => {
      return {
         loggedIn: null,
         user: null,
         username: null,
      }
   },

   getters: {
      async loadUserName() {
         const user = useSupabaseUser()
         const { data } = await useFetch(
            '/api/user/get-user',
            {
               params: {
                  userId: user.value.id,
               },
            }
         )

         this.username = data.value.user_name
      },
   },

   actions: {
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
