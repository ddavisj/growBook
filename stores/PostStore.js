export const usePostStore = defineStore('PostStore', {
   state: () => {
      return {
         // recentPosts: [],
         // myPosts: [],
         loadedPosts: [],
      }
   },
   getters: {
      // getMyPosts: state => userId =>
      //    state.myPosts.find(post => post.id === +plantId),
      // getAllLoadedPostByID: state => plantId =>
      //    state.allLoadedPosts.find(
      //       post => post.id === +plantId
      //    ),
      getLoadedPostByID: state => plantId =>
         state.loadedPosts.find(
            post => post.id === +plantId
         ),
   },
   actions: {
      async loadLatestPosts() {
         if (this.loadedPosts.length <= 1) {
            // ie. if just one or no posts loaded (user adds before visiting home page)
            const { data: posts } = await useFetch(
               '/api/plant/listings/get-latest'
            )
            this.loadedPosts = posts.value // CHANGE LATER?! arr.push..
         }
      },
      async loadPost(id, andGrower) {
         const UserStore = useUserStore()

         // Check if post already loaded
         console.log(
            'getLoadedPostByID',
            this.getLoadedPostByID(id)
         )

         const post = this.getLoadedPostByID(id)

         console.log('A1')

         if (!post) {
            console.log('No plant.. loading')
            const loadedPlant = await useFetchPlant(id)

            console.log('loadedPlant', loadedPlant.value)

            console.log(
               'loadedPlant lId',
               loadedPlant.value.listerId
            )

            this.loadedPosts.push(loadedPlant.value)

            // const { data: grower } = await useFetch(
            //    `/api/user/get-user-by-uuid/${loadedPlant.value.listerId}`
            // )

            // console.log({ grower })

            // if (andGrower) {
            //    console.log('---------c-------')
            //    UserStore.loadGrower(
            //       loadedPlant.value.listerId
            //    )
            // }
         }
      },
      // addRecentPost(post) {
      //    this.recentPosts.unshift(post)
      // },

      // async loadMyPosts(userId) {
      //    if (this.myPosts.length <= 1) {
      //       const { data: listings } = await useFetch(
      //          `/api/plant/listings/user/${userId}`
      //       )
      //       this.myPosts = listings.value
      //    }
      // },
   },
})

if (import.meta.hot) {
   import.meta.hot.accept(
      acceptHMRUpdate(usePostStore, import.meta.hot)
   )
}
