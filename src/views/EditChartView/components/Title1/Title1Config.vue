<template>
  <el-collapse-item title="标题">
    <el-input v-model="title"></el-input>
  </el-collapse-item>
</template>

<script>
import { CollapseItem } from 'element-ui';
export default {
  name: 'Title1Config',
  components: {
    'el-collapse-item': CollapseItem
  },
  props: {
    componentConfig: {
      type: Object,
      required: true,
      default: () => ({
        title: '看板标题',
        color: '#fff',
        textAlign: 'center',
        fontSize: '16px',
        fontFamily: 'Microsoft Yahei, sans-serif',
        showStatus: true
      })
    }
  },
  data() {
    return {
      title: ''
    };
  },
  created() {
    this.title = this.componentConfig.title;
  }
};
</script>

<style scoped>
</style>
