export const usePostStore = defineStore('PostStore', {
   state: () => {
      return {
         recentPosts: [],
         myPosts: [],
         allLoadedPosts: [],
      }
   },
   getters: {
      getMyPostByID: state => plantId =>
         state.myPosts.find(post => post.id === +plantId),
      getRecentPostByID: state => plantId =>
         state.recentPosts.find(
            post => post.id === +plantId
         ),
      getAllLoadedPostByID: state => plantId =>
         state.allLoadedPosts.find(
            post => post.id === +plantId
         ),
   },
   actions: {
      async loadPost(id) {
         // Check if post already loaded
         // const plant = this.allLoadedPosts.find(
         //    post => post.id === +id
         // )

         // console.log('HEREE')
         // const plant = this.getMyPostByID(id)
         // plant ? console.log(plant) : ''

         // if (!plant) {
         console.log('No plant.. loading')
         const loadedPlant = await useFetchPlant(id)
         console.log(loadedPlant)
         this.myPosts.push(loadedPlant.value)
         // }
      },
      addRecentPost(post) {
         this.recentPosts.unshift(post)
      },
      async loadLatestPosts() {
         if (this.recentPosts.length <= 1) {
            // ie. if just one or no posts loaded (user adds before visiting home page)
            const { data: posts } = await useFetch(
               '/api/plant/listings/get-latest'
            )
            this.recentPosts = posts.value
         }
      },
      async loadMyPosts(userId) {
         if (this.myPosts.length <= 1) {
            const { data: listings } = await useFetch(
               `/api/plant/listings/user/${userId}`
            )
            this.myPosts = listings.value
         }
      },
   },
})

if (import.meta.hot) {
   import.meta.hot.accept(
      acceptHMRUpdate(usePostStore, import.meta.hot)
   )
}
