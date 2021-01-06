<template>
  <div class="add-board__wrapper" v-loading="loading">
    <div class="breadcrumb__container">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{path: '/board-config-manage' }">大屏控制模块</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path: '/board-config-manage'}">大屏配置管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path: '/board-config-manage/add'}">新增大屏</el-breadcrumb-item>
        <el-breadcrumb-item>新增模板</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="title-btns__container">
      <div class="title-text">已有模板(4)</div>
      <div class="btns">
        <el-button size="mini" type="info" @click="$router.go(-1)">取消创建</el-button>
        <el-button size="mini" type="success" @click="handleAddTemplate">新增模板</el-button>
      </div>
    </div>
    <div class="content_container">
      <!--  <div class="item_container add-empty-template" @click="handleAddEmptyBoard">
        <div class="bg">
          <div class="img_container">
            <img src="../../assets/add.png" width="52" alt="" />
          </div>
        </div>
        <div class="title">新建空白大屏</div>
      </div> -->
      <div v-for="i in 5" :key="i" class="item_container">
        <div class="bg" :style="{backgroundImage: `url(${darkDemo})`}"></div>
        <div class="title">模版{{i}}</div>
      </div>

    </div>
  </div>
</template>

<script>
import { Breadcrumb, BreadcrumbItem } from 'element-ui';
const darkDemo = require('@/views/EditChartView/assets/darkDemo.png');
export default {
  name: 'AddTemplate',
  components: {
    'el-breadcrumb': Breadcrumb,
    'el-breadcrumb-item': BreadcrumbItem
  },
  data() {
    return {
      loading: false
    };
  },
  watch: {},
  created() {
    this.darkDemo = darkDemo;
  },
  methods: {
    handleAddTemplate() {
      window.open('/#/edit-chart-view?type=template');
    }
  }
};
</script>

<style scoped lang="stylus">
.add-board__wrapper {
  background-color: #fff;
  height: 100%;
  overflow-y: auto;
}

.breadcrumb__container {
  padding: 16px;
  background-color: #fff;
  border-bottom: 1px solid rgba(240, 240, 240, 1);
}

.title-btns__container {
  padding: 16px;
  padding-left: 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(240, 240, 240, 1);

  .title-text {
    font-size: 22px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    line-height: 1;
    color: #303133;
    position: relative;

    &:before {
      content: ' ';
      width: 6px;
      height: 22px;
      background-color: rgba(27, 101, 185, 1);
      position: absolute;
      left: -12px;
      top: 0;
    }
  }
}

.content_container {
  padding: 16px;
  padding-bottom: 0;
  display: flex;
  flex-wrap: wrap;

  .item_container {
    width: 336px;
    height: 249px;
    padding: 14px;
    background-color: rgba(239, 242, 244, 1);
    display: flex;
    flex-direction: column;
    margin: 0 16px 16px 0;
    cursor: pointer;

    .bg {
      flex: 1;
      background-color: rgba(239, 242, 244, 1);
      padding: 2px 2px 0;
      // background-image: url('../EditChartView/assets/darkDemo.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center center;
    }

    .title {
      flex: 0 0 46px;
      width: 100%;
      background-color: #fff;
      font-size: 18px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #303133;
      line-height: 1;
      padding: 14px 0;
      text-align: center;
    }
  }

  .add-empty-template {
    &:focus, &:active {
      background-color: rgba(239, 242, 244, 0.8);
    }

    .bg {
      flex: 1;
      background-color: #fff;
      padding: 2px 2px 0;

      .img_container {
        height: 100%;
        background-color: rgba(239, 242, 244, 1);
        display: flex;
        align-items: center;
        justify-content: center;

        &:focus, &:active {
          background-color: rgba(239, 242, 244, 0.8);
        }
      }
    }
  }
}
</style>
