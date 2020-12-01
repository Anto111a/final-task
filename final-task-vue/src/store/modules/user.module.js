import axios from "axios";

export default {
  state: {
    user: {},
    loading: true
  },

  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setLoading(state, isLoading) {
      state.loading = isLoading
    }
  },

  actions: {
    requestData(ctx) {
      ctx.commit('setLoading', true)
      axios.get("http://localhost:3000/user")
        .then((response) => {
          ctx.commit('setUser', response.data.user)
          ctx.commit('setLoading', false)
        })
    }
  },

  getters: {
    user(state) {
      return state.user
    },

    isLoading(state) {
      return state.loading
    }
  },
}