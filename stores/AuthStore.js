export const useAuthStore = defineStore('AuthStore', {
   state: () => {
      return {
         loggedIn: undefined,
         user: undefined,
         username: null,
         uploadedImage: null,
         description: null,
         firstName: null,
      }
   },
   getters: {},
   actions: {
      async loadUploadedImage({ image }) {
         const config = useRuntimeConfig()
         this.uploadedImage = `${config.public.supabase.url}/storage/v1/object/public/images/${image}`
      },
      async loadUserName() {
         if (this.loggedIn && !this.username) {
            await useFetch('/api/user/get-user', {
               params: {
                  userId: this.user.id,
               },
               onResponse({ response }) {
                  const AuthStore = useAuthStore()

                  if (response._data) {
                     const config = useRuntimeConfig()

                     AuthStore.username =
                        response._data.user_name

                     const image = response._data.image
                     image
                        ? (AuthStore.uploadedImage = `${config.public.supabase.url}/storage/v1/object/public/images/${image}`)
                        : ''

                     AuthStore.description =
                        response._data.description
                     AuthStore.firstName =
                        response._data.first_name
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
         this.uploadedImage = null

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
