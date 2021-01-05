<template>
  <div class="size__container">
    <div class="left_container">
      <div class="title_container">
        <img class="icon"
             :src="size1Img"
             alt="">
        <div class="text">
          <p class="title">{{title}}</p>
          <p class="size">{{screenRatio.width}}*{{screenRatio.height}}</p>
        </div>
        <img class="arraw_right"
             src="../../assets/size/arraw_right.png"
             alt="">
      </div>
      <div class="adjust-size">调整尺寸</div>
      <div class="input__container">
        <el-input v-model.number="w"
                  :min="0"
                  type="number"
                  class="position-size-input"
                  :style="{marginRight: '18px'}"
                  :disabled="!screenRatio.isCustom"
                  @change="handleWchange">
          <template v-slot:suffix>W</template>
        </el-input>
        <el-input v-model.number="h"
                  :min="0"
                  type="number"
                  class="position-size-input"
                  :disabled="!screenRatio.isCustom"
                  @change="handleHchange">
          <template v-slot:suffix>H</template>
        </el-input>
      </div>
    </div>
    <div class="right_container">
      <div :class="{
        'radio_container': true,
        'radio_container_active': (activeRatio[0] === item.size[0] && activeRatio[1] === item.size[1] && !screenRatio.isCustom)
      }"
           v-for="(item, index) in config"
           @click="handleChangeSize(item)"
           :key="index">
        <div class="icon-label">
          <img :src="item.icon"
               alt="">
          <span>{{item.label}}</span>
        </div>
        <div class="radio"
             v-if="item.size.length > 0">{{item.size[0]}}*{{item.size[1]}}</div>
      </div>
      <!-- 自定义 -->
      <div :class="{
        'radio_container': true,
        'radio_container_active': screenRatio.isCustom
      }"
           @click="handleChangeSizeCustom">
        <div class="icon-label">
          <img :src="size4Img"
               alt="">
          <span>自定义</span>
        </div>
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
  { icon: size3Img, label: '桌面端', size: [1024, 768] }
  // { icon: size4Img, label: '自定义', size: [] }
];
export default {
  name: 'SizePopover',
  props: {
    screenRatio: {
      type: Object,
      required: true,
      default: () => ({
        width: 1920,
        height: 1080,
        isCustom: false
      })
    }
    /* boardTitle: {
      type: String,
      required: true,
      default: '未命名'
    } */
  },
  computed: {
    activeRatio: function () {
      if (this.screenRatio) {
        return [this.screenRatio.width, this.screenRatio.height];
      }
      return [];
    },
    title: function () {
      if (this.screenRatio.isCustom) return '自定义';
      let title = '';
      for (let i = 0, len = config.length; i < len; i++) {
        const item = config[i];
        if (
          item.size[0] === this.screenRatio.width &&
          item.size[1] === this.screenRatio.height
        ) {
          return item.label;
        }
      }
    }
  },
  watch: {
    screenRatio: {
      handler: function (newVal, oldVal) {
        this.w = this.screenRatio.width;
        this.h = this.screenRatio.height;
      },
      deep: true
    }
  },
  data() {
    return {
      w: 0,
      h: 0
    };
  },
  created() {
    this.config = config;
    this.size1Img = size1Img;
    this.size4Img = size4Img;
    this.w = this.screenRatio.width;
    this.h = this.screenRatio.height;
  },
  methods: {
    handleChangeSize(item) {
      this.$emit('change', { custom: false, size: item.size });
    },
    handleChangeSizeCustom() {
      this.$emit('change', { custom: true, size: [this.w, this.h] });
    },
    handleWchange() {
      this.$emit('change', { custom: true, size: [this.w, this.h] });
    },
    handleHchange() {
      this.$emit('change', { custom: true, size: [this.w, this.h] });
    }
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
    flex: 1;
    height: 284px;
    padding-right: 30px;

    .title_container {
      padding-top: 10px;
      padding-left: 10px;
      padding-bottom: 20px;
      position: relative;
      display: flex;
      align-items: center;
      border-bottom: 1px solid rgba(41, 82, 120, 1);

      img.icon {
        width: 22px;
        height: 22px;
        margin-right: 10px;
      }

      .text {
        p {
          font-size: 12px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #CDE6FF;
          line-height: 1;

          &.title {
            margin-bottom: 6px;
          }
        }
      }

      img.arraw_right {
        position: absolute;
        width: 5px;
        height: 10px;
        right: 10px;
        top: 20px;
      }
    }

    .adjust-size {
      font-size: 12px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #CDE6FF;
      line-height: 1;
      padding: 20px 0 24px;
    }

    .input__container {
      display: flex;
      align-items: center;
    }
  }

  .right_container {
    flex: 0 0 210px;
    height: 100%;
    background-color: #0F2842;
    padding: 10px 14px;

    .radio_container {
      display: flex;
      align-items: center;
      font-size: 12px;
      line-height: 1;
      padding: 8px 10px;
      margin-bottom: 24px;
      cursor: pointer;

      &:hover {
        background-color: rgba(1, 96, 192, 0.6);
      }

      &.radio_container_active {
        background-color: rgba(1, 96, 192, 1);
      }
    }

    .icon-label {
      flex: 1;

      img {
        width: 12px;
        height: 12px;
        margin-right: 8px;
        vertical-align: middle;
      }

      span {
        color: #CEE5FF;
        font-size: 12px;
      }
    }

    .radio {
      flex: 0 0 auto;
      color: #CEE5FF;
      font-size: 12px;
    }
  }
}
</style>
