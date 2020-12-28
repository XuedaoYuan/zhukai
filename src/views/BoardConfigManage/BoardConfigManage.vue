<template>
  <h1>BoardConfigManage</h1>
</template>

<script>
export default {
  name: 'BoardConfigManage',
  data() {
    return {};
  },
  watch: {
    $route: function (newRoute) {
      console.log(newRoute.params.status);
    }
  },
  created() {
    console.log(this.$route.params);
  }
};
</script>

<style scoped>
</style>
