<template>
  <div>
    <h1>test</h1>
    <div>
      <el-button>button</el-button>
      <el-button type="primary">button</el-button>
      <el-input v-model="value"></el-input>
      <div>{{value}}</div>
    </div>
  </div>
</template>

<script>
// lodash 推荐用法
import concat from 'lodash/concat';
export default {
  name: 'Test',
  data() {
    return {
      value: ''
    };
  },
  created() {
    console.log(concat(1, 2, [3]));
  }
};
</script>

<style scoped lang="stylus"></style>
