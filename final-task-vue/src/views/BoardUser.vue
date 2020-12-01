<template>
  <div>
    <p v-if="isLoading">Arruuuuuuuuuuuuuurr!</p>
    <ul v-else>
      <h3>{{ content }} zzzzzzzzzzzzzzzzzzzz</h3>
      <li>{{ user.firstName }}</li>
      <li>{{ user.lastName }}</li>
      <li>{{ user.nickName }}</li>
      <li>{{ user.phoneNumb }}</li>
      <li>{{ user.description }}</li>
      {{
        user
      }}
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  computed: { ...mapGetters(['user', 'isLoading']) },
  methods: mapActions(['requestData']),
  mounted() {
    this.requestData();
  },
};
</script>
