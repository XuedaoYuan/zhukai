<template>
  <div>
    <h1>test</h1>
    <div>
      <el-button>button</el-button>
      <el-button type="primary">button</el-button>
    </div>
  </div>
</template>

<script>
// lodash 推荐用法
import concat from 'lodash/concat';
export default {
  name: 'Test',
  data() {
    return {};
  },
  created() {
    console.log(concat(1, 2, [3]));
  }
};
</script>

<style scoped lang="stylus"></style>
