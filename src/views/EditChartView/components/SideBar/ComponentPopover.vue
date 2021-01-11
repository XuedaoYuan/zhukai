<template>
  <div class="component-list-wrapper">
    <div class="component-select">
      <label>业务类型</label>
      <el-select v-model="value">
        <el-option v-for="item in options"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
    </div>
    <el-divider></el-divider>
    <div class="component-list">
      <div class="left-container">
        <img src="./imgs/pie1.png"
             @click="handleComponentClick('pie1')"
             width="182"
             alt="pie1" />
        <img src="./imgs/select1.png"
             @click="handleComponentClick('select1')"
             width="182"
             alt="select1" />
        <span @click="handleComponentClick('datePicker1')">datePicker1</span>
      </div>
      <div class="right-container">
        <img src="./imgs/title1.png"
             @click="handleComponentClick('title1')"
             width="100%"
             alt="title1" />
        <img src="./imgs/pie1.png"
             @click="handleComponentClick('pie1')"
             width="182"
             alt="pie1" />
      </div>

    </div>
  </div>
</template>
<script>
import { Divider } from 'element-ui';
export default {
  name: 'ComponentPopover',
  components: {
    'el-divider': Divider
  },
  data() {
    return {
      value: '',
      options: [
        {
          value: '折线图',
          label: '折线图'
        },
        {
          value: '柱状图',
          label: '柱状图'
        },
        {
          value: '地图',
          label: '地图'
        }
      ]
    };
  },
  methods: {
    handleComponentClick(componentName) {
      this.$emit('component-insert', componentName);
    }
  }
};
</script>
<style scoped lang="stylus">
.component-list {
  display: flex;

  > div {
    flex: 1;
  }

  img {
    cursor: pointer;
    border: 1px solid transparent;
    transition: all 0.2s ease;
    margin-bottom: 10px;

    &:hover {
      border: 1px solid rgba(255, 255, 255, 0.3);
    }
  }

  .left-container {
    margin-right: 10px;
  }
}
</style>
