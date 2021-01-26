<template>
  <div class="bg__container">
    <div class="title">单体颜色</div>
    <div class="single-color__container">
      <div v-for="(color, index) in singleColorList"
           :key="index"
           @click="handleSetBgColor(color)"
           :class="['dot', background.backgroundColor === color ? 'active' : '']">
        <div class="inner"
             :style="{backgroundColor: color}"></div>
      </div>
    </div>
    <div class="title">渐变颜色</div>
    <div class="single-color__container">
      <div v-for="(color, index) in grandientColorList"
           :key="index"
           @click="handleSetBgColor(color)"
           :class="['dot', background.backgroundColor === color ? 'active' : '']">
        <div class="inner "
             :style="{backgroundImage: color}"></div>
      </div>
    </div>
    <div class="title">使用图片</div>
    <div class="img_container">
      <img :src="darkDemo"
           alt=""
           :class="{active: backgroundType==='dark'}"
           @click="handleSetBgImage('dark')">
      <img :src="lightDemo"
           alt=""
           :class="{active: backgroundType==='light'}"
           @click="handleSetBgImage('light')">
    </div>
    <div class="img_container">
      <img :src="background1"
           alt=""
           :class="{active: backgroundType==='background1'}"
           @click="handleSetBgImage('background1')">
    </div>

    <div>
      <el-button type="primary"
                 size="small"
                 :loading="uploading"
                 @click="handleUploadImg">上传图片</el-button>
    </div>

    <input type="file"
           ref="InputRef"
           @change="handleFileChange($event)"
           style="display: none;">
  </div>
</template>

<script>
import { uploadFile } from '@/views/EditChartView/api/index.js';
const darkDemo = require('../../assets/darkDemo.png');
const lightDemo = require('../../assets/lightBackground.png');
const background1 = require('../../assets/background1.png');
export default {
  name: 'BgPopover',
  props: {
    background: {
      type: Object,
      required: true,
      default: () => ({
        backgroundImage: '',
        backgroundColor: '#1C2B4E'
      })
    }
  },
  data() {
    return {
      uploading: false,
      singleColorList: [
        '#C3D7E2',
        '#8DBFE6',
        '#29659D',
        '#2C3F95',
        '#1C2B4E',
        '#132673',
        '#1C3C5F'
      ],
      grandientColorList: [
        'linear-gradient(90deg, rgb(20, 55, 107) 13%, rgb(30, 112, 135) 98%)',
        'linear-gradient(90deg, rgb(36, 95, 184) 13%, rgb(63, 164, 192) 98%)',
        'linear-gradient(-43deg, rgb(140, 233, 246) 9%, rgb(78, 160, 243) 92%)',
        'linear-gradient(90deg, rgb(24, 51, 91) 13%, rgb(11, 58, 144) 98%)',
        'linear-gradient(90deg, rgb(44, 36, 184) 13%, rgb(63, 86, 192) 98%)',
        'linear-gradient(255deg, rgb(77, 170, 247) 0%, rgb(65, 136, 243) 100%)'
      ],
      backgroundType: ''
    };
  },
  created() {
    this.darkDemo = darkDemo;
    this.lightDemo = lightDemo;
    this.background1 = background1;
  },
  methods: {
    handleSetBgColor(color) {
      this.backgroundType = '';
      this.$emit('setBgColor', color);
    },
    handleSetBgImage(type) {
      this.backgroundType = type;
      this.$emit('setBgImage', { type });
    },
    async handleFileChange(event) {
      if (!this.FileRef) {
        const FileRef = this.$refs['InputRef'];
        this.FileRef = FileRef;
      }
      const file = this.FileRef.files[0];
      try {
        let formData = new FormData();
        const fileName = file.name;
        console.log(fileName);
        formData.append('file', file, fileName);
        this.uploading = true;
        const res = await uploadFile(formData);
        if (res && res.code === 0 && res.data) {
          const imgUrl = process.env.VUE_APP_IMG_HOST + res.data;
          this.$emit('setBgImage', { type: 'upload', imgUrl });
          this.uploading = false;
        } else {
          this.FileRef.value = '';
          this.uploading = false;
        }
      } catch (error) {
        this.FileRef.value = '';
        this.uploading = false;
      }
    },
    handleUploadImg() {
      //  formData.append('file', blob, fileName);
      //
      const InputRef = this.$refs['InputRef'];
      InputRef.value = '';
      InputRef.click();
    }
  }
};
</script>

<style scoped lang="stylus">
.bg__container {
  width: 100%;
  background-color: #031A32;
  border: 1px solid #295278;
  padding: 7px 14px 30px;

  .title {
    font-size: 12px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #CDE6FF;
    line-height: 1;
    margin-bottom: 10px;
  }

  .img_container {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      width: 90px;
      display: block;

      &.active {
        border: 1px solid #1c76d6;
      }
    }

    .mr10 {
      margin-right: 10px;
    }
  }

  .single-color__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    margin-bottom: 20px;

    .dot {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      cursor: pointer;
      border: none;
      padding: 2px;

      &.active {
        border: 1px solid #1c76d6;
      }

      .inner {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        // border: 1px solid transparent;
      }
    }
  }
}
</style>
