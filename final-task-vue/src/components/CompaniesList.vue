<template>
  <ul>
    <CompanyItem
      v-for="company of companies"
      v-bind:key="company.id"
      v-bind:company="company"
    />
  </ul>
</template>

<script>
import CompanyItem from "./CompanyItem";
export default {
  data() {
    return {
      companies: [
        { id: 1, name: "first", address: "first Address1" },
        { id: 2, name: "second", address: "second Address2" },
        { id: 3, name: "third", address: "third Address3" },
      ],
    };
  },
  components: {
    CompanyItem,
  },
};
</script>
