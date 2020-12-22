<template>
  <div class="TestVueGridLayout__container">

  </div>
</template>

<script>
import VueGridLayout from 'vue-grid-layout';
export default {
  name: 'TestVueGridLayout',
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  },
  data() {
    return {};
  }
};
</script>

<style scoped lang="stylus">
.TestVueGridLayout__container {
}
</style>
