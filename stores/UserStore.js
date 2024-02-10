export const useUserStore = defineStore('UserStore', {
   state: () => {
      return {
         growers: [], // differentiate users, ie. growers vs browsers
      }
   },
   getters: {
      getLoadedGrowerByID: state => userId =>
         state.growers.find(grower => grower.id === userId),
   },
   actions: {
      addGrower(user) {
         this.growers.unshift(user)
      },
      async loadGrower(userId) {
         // Check if grower already loaded
         console.log(
            'gLGBI',
            this.getLoadedGrowerByID(userId)
         )

         const grower = this.getLoadedGrowerByID(userId)

         console.log({ grower })

         if (!grower) {
            console.log('No grower.. loading')
            // const loadedGrower = await useFetchUser(userId)

            const { data: loadedGrower } = await useFetch(
               `/api/user/get-user-by-uuid/${userId}`
            )
            console.log('loadedGrower', loadedGrower)
            console.log(
               'loadedGrower.value',
               loadedGrower.value
            )
            this.growers.push(loadedGrower.value)
         }

         //    this.growers.push(loadedGrower.value)
         // if (grower) {
         //    console.log('Found grower')
         //    return grower
         // } else {
         //    console.log('No grower.. loading')
         //    const { data: loadedGrower } = await useFetch(
         //       `/api/user/get-user-by-uuid/${userId}`
         //    )
         //    console.log('loadedGrower', loadedGrower.value)

         //    this.growers.push(loadedGrower.value)

         //    return loadedGrower.value
         // }

         // console.log('HEREE')
         // const post = this.getMyPostByID(id)
         // post ? console.log(post) : ''

         // if (!grower) {
         //    console.log('No grower.. loading')
         //    const loadedGrower = await useFetch(
         //       `/api/user/get-user-by-uuid/${userId}`
         //    )
         //    console.log('loadedGrower', loadedGrower)
         //    this.growers.push(loadedGrower.value)
         // }
      },

      async loadGrowers() {
         if (this.growers.length <= 1) {
            const { data: growers } = await useFetch(
               `/api/users`
            )
            this.growers = growers.value
         }
      },
   },
})

if (import.meta.hot) {
   import.meta.hot.accept(
      acceptHMRUpdate(useUserStore, import.meta.hot)
   )
}
