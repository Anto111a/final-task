<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">User</router-link> | -->
      <div v-if="currentUser">
        <router-link to="/profile">Profile</router-link>
        <router-link to="/companies">Companies</router-link>
        <a class="router-link" href @click.prevent="logOut"> LogOut </a>
      </div>
      <div v-else>
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Rerister</router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
