export const useUserStore = defineStore('UserStore', {
   state: () => {
      return {
         growers: [],
      }
   },
   getters: {
      getGrowerByID: state => userId =>
         state.growers.find(grower => grower.id === userId),
   },
   actions: {
      addGrower(user) {
         this.growers.unshift(user)
      },
      async loadGrower(userId) {
         const { data } = await useFetch(
            `/api/user/get-user-by-uuid/${userId}`
         )
         this.growers.push(data.value)
         return data.value
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
