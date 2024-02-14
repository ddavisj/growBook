export const usePostStore = defineStore('PostStore', {
   state: () => {
      return {
         posts: [], // recent posts
         myPosts: [],
      }
   },
   getters: {
      getMyPosts: state => userId =>
         state.myPosts.find(post => post.id === +plantId),
      getPostByID: state => plantId =>
         state.posts.find(post => post.id === +plantId),
   },
   actions: {
      async loadPost(id) {
         const { data } = await useFetch(`/api/plant/${id}`)
         this.posts.push(data.value)
         return data.value
      },
      async loadLatestPosts() {
         if (this.posts.length <= 1) {
            // ie. if just one or no posts loaded (user adds before visiting home page)
            const { data: posts } = await useFetch(
               '/api/plant/listings/get-latest'
            )
            this.posts = posts.value
         }
      },
      addRecentPost(post) {
         this.posts.unshift(post)
      },

      async loadMyPosts(userId) {
         if (this.myPosts.length <= 1) {
            const { data } = await useFetch(
               `/api/plant/listings/user/${userId}`
            )
            this.myPosts = data.value
         }
      },
   },
})

if (import.meta.hot) {
   import.meta.hot.accept(
      acceptHMRUpdate(usePostStore, import.meta.hot)
   )
}
