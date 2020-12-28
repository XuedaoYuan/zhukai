<template>
  <el-collapse-item title="联动">
    <ul>
      <li v-for="(item, index) in components"
          :key="index">{{item.componentName}}--- <span @click="add(item.i)">add</span> </li>
    </ul>
  </el-collapse-item>
</template>

<script>
import { CollapseItem, RadioGroup, RadioButton, ColorPicker } from 'element-ui';
export default {
  name: 'TestLinkConfig',
  components: {
    'el-collapse-item': CollapseItem
  },
  props: {
    components: {
      type: Array,
      default: []
    }
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    handleChange() {
      //   this.$emit('change', this.config);
    },
    add(i) {
      this.$emit('change', i);
    }
  }
};
</script>

<style scoped>
</style>
