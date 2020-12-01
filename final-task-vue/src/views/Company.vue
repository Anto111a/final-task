<template>
  <div>
    <h3>Company details</h3>
    {{ prop }}
  </div>
</template>

<script>
export default {
  name: 'Company',
  props: ['prop'],
};
</script>
