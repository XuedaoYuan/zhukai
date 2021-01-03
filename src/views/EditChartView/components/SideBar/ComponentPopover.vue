<template>
  <div class="component-list-wrapper">
    <div class="component-select">
      <label>业务类型</label>
      <el-select v-model="value">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <el-divider></el-divider>
    <div class="component-list">
      <img
        src="../../assets/pie1.png"
        @click="$emit('pie1Click')"
        width="182"
        alt=""
      />
    </div>
  </div>
</template>
<script>
import { Divider } from "element-ui";
export default {
  name: "ComponentPopover",
  components: {
    "el-divider": Divider,
  },
  data() {
    return {
      value: "",
      options: [
        {
          value: "折线图",
          label: "折线图",
        },
        {
          value: "柱状图",
          label: "柱状图",
        },
        {
          value: "地图",
          label: "地图",
        },
      ],
    };
  },
  methods: {},
};
</script>
<style scoped lang="stylus"></style>