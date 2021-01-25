<template>
  <div class="component-list-wrapper">
    <div class="component-select">
      <label>业务类型</label>
      <el-select v-model="value"
                 :popper-append-to-body="false"
                 :style="{width: '120px'}"
                 class="chart-custom-select">
        <el-option v-for="item in options"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
      <label :style="{marginLeft: '12px'}">业务主题</label>
      <el-select v-model="value"
                 :popper-append-to-body="false"
                 :style="{width: '120px'}"
                 class="chart-custom-select">
        <el-option v-for="item in options"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
    </div>
    <!-- <el-divider></el-divider> -->
    <div class="component-list">
      <div class="left-container">
        <img src="./imgs/pie1.png"
             @click="handleComponentClick('pie1')"
             width="182"
             alt="pie1" />
        <img src="./imgs/map1.png"
             @click="handleComponentClick('map1')"
             width="182"
             alt="map1" />
        <img src="./imgs/line1.png"
             @click="handleComponentClick('line1')"
             width="182"
             alt="line1" />
        <img src="./imgs/pie2.png"
             @click="handleComponentClick('pie2')"
             width="182"
             alt="pie2" />
        <img src="./imgs/line2.png"
             @click="handleComponentClick('line2')"
             width="182"
             alt="line2" />
        <img src="./imgs/labelValue1.png"
             @click="handleComponentClick('labelValue1')"
             width="182"
             alt="labelValue1" />
        <img src="./imgs/labelValue2.png"
             @click="handleComponentClick('labelValue2')"
             width="182"
             alt="labelValue2" />

      </div>
      <div class="right-container">
        <img src="./imgs/title1.png"
             @click="handleComponentClick('title1')"
             width="100%"
             alt="title1" />
        <img src="./imgs/select1.png"
             @click="handleComponentClick('select1')"
             width="182"
             alt="select1" />
        <img src="./imgs/datePicker1.png"
             @click="handleComponentClick('datePicker1')"
             width="182"
             alt="datePicker1" />
        <img src="./imgs/headTitle1.png"
             @click="handleComponentClick('headTitle1')"
             width="182"
             alt="headTitle1" />
        <img src="./imgs/headTitle2.png"
             @click="handleComponentClick('headTitle2')"
             width="182"
             alt="headTitle2" />
        <img src="./imgs/chinaMap1.png"
             @click="handleComponentClick('chinaMap1')"
             width="182"
             alt="chinaMap1" />
        <img src="./imgs/bar1.png"
             @click="handleComponentClick('bar1')"
             width="182"
             alt="bar1" />
        <img src="./imgs/bar2.png"
             @click="handleComponentClick('bar2')"
             width="182"
             alt="bar2" />
        <img src="./imgs/pie3.png"
             @click="handleComponentClick('pie3')"
             width="182"
             alt="pie3" />

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
.component-list-wrapper {
}

.component-select {
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #cde6ff;

  label {
    font-size: 12px;
    color: #cde6ff;
    margin-right: 10px;
  }
}

.component-list {
  display: flex;
  max-height: 420px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

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
