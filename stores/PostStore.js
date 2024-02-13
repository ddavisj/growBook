export const usePostStore = defineStore('PostStore', {
   state: () => {
      return {
         posts: [],
      }
   },
   getters: {
      // getMyPosts: state => userId =>
      //    state.myPosts.find(post => post.id === +plantId),
      // getAllLoadedPostByID: state => plantId =>
      //    state.allLoadedPosts.find(
      //       post => post.id === +plantId
      //    ),
      getPostByID: state => plantId =>
         state.posts.find(post => post.id === +plantId),
   },
   actions: {
      async loadLatestPosts() {
         if (this.posts.length <= 1) {
            // ie. if just one or no posts loaded (user adds before visiting home page)
            const { data: posts } = await useFetch(
               '/api/plant/listings/get-latest'
            )
            this.posts = posts.value // CHANGE LATER?! arr.push..
         }
      },
      async loadPost(id, andGrower) {
         const { data } = await useFetch(`/api/plant/${id}`)
         this.posts.push(data.value)
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
