<template>
  <div class="size__container">
    <div class="left_container"></div>
    <div class="right_container">
      <div class="radio_container">
          
      </div>
    </div>
  </div>
</template>

<script>
const size1Img = require('@/views/EditChartView/assets/size/size1.png');
const size2Img = require('@/views/EditChartView/assets/size/size2.png');
const size3Img = require('@/views/EditChartView/assets/size/size3.png');
const size4Img = require('@/views/EditChartView/assets/size/size4_custom.png');
const config = [
  { icon: size1Img, label: '大屏分辨率', size: [1920, 1080] },
  { icon: size2Img, label: '常规分辨率', size: [1366, 768] },
  { icon: size3Img, label: '桌面HD', size: [1440, 1024] },
  { icon: size3Img, label: '桌面端', size: [1024, 768] },
  { icon: size4Img, label: '自定义', size: null }
];
export default {
  name: 'SizePopover',
  data() {
    return {};
  },
  created() {
    this.config = config;
  }
};
</script>

<style scoped lang="stylus">
.size__container {
  width: 100%;
  background-color: #031a32;
  border: 1px solid #295278;
  padding: 30px 20px;
  display: flex;
  align-items: center;

  .left_container {
  }

  .right_container {
    flex: 0 0 210px;
    height: 100%;
    background-color: #0F2842;
    padding: 10px 14px;
  }
}
</style>
