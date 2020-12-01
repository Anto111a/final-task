<template>
  <div>
    <router-link :to="{ name: 'Company', params: { prop: company.address } }"
      >Company detail</router-link
    >
    <li>{{ company.name }}company based at -- {{ company.address }}</li>
  </div>
</template>

<script>
export default {
  props: {
    company: {
      type: Object,
      required: true,
    },
  },
};
</script>