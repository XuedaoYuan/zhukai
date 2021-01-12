<template>
  <div class="TestVueGridLayout__container">
    <div class="header__container">
      <div class="left_container">
        <div class="back_icon"
             @click="handleBack">
          <span>&lt;</span>
        </div>
        <div class="label">大屏名称：</div>
        <input type="text"
               placeholder="请输入大屏名称"
               :style="{ width: '200px' }"
               v-model="boardConfig.boardTitle" />
        <div class="label ml40">code标识：</div>
        <input type="text"
               placeholder="请输入code标识"
               :style="{ width: '200px' }"
               v-model="boardConfig.boardCode" />
      </div>

      <div class="right_container">
        <div class="preview-btn header-btn"
             @click="handlePreview">
          <img src="./assets/eye.png"
               alt="">
          预览
        </div>
        <div :class="['save-btn', 'header-btn', saveLoading ? 'save-btn-disabled' : '']"
             @click="handleSave"> <i v-show="saveLoading"
             :style="{marginRight: '4px'}"
             class="el-icon-loading"></i>保存</div>
        <div class="check-btn header-btn"
             @click="handleSubmitCheck">提交审核</div>
      </div>

      <!--<div>
        <el-button @click="handleAddNewDatePicker">add DatePicker</el-button>
        <el-button @click="handleAddTestLink">add testLink</el-button>
        <span>---尺寸</span>
        

      </div>
     -->
    </div>
    <div class="content">
      <SideBar>
        <!-- 背景 -->
        <template v-slot:bgPopover>
          <bg-popover :background="boardConfig.background"
                      @setBgColor="handleSetBgColor"
                      @setBgImage="handleSetBgImage"></bg-popover>
        </template>
        <!-- 尺寸 -->
        <template v-slot:sizePopover>
          <size-popover :screenRatio="boardConfig.screenRatio"
                        @change="handleSizeChange"></size-popover>
        </template>
        <!-- 组件 -->
        <template v-slot:componentPopover>
          <component-popover @component-insert="handleComponentInsert"></component-popover>
        </template>
      </SideBar>
      <div class="main">
        <div class="mian-board__container"
             :style="boardBgStyle"
             @click="handleBoardClick"
             ref="MaintBoardRef">
          <grid-layout :layout.sync="boardConfig.components"
                       :col-num="colNum"
                       :row-height="rowHeight"
                       :is-draggable="true"
                       :is-resizable="true"
                       :is-mirrored="false"
                       :vertical-compact="false"
                       :margin="[0, 0]"
                       :use-css-transforms="false"
                       :auto-size="false"
                       :responsive="false">
            <!--   @resize="resizeEvent"
                 @move="moveEvent"
                "
                  -->
            <grid-item v-for="(item, index) in boardConfig.components"
                       :x="item.x"
                       :y="item.y"
                       :w="item.w"
                       :h="item.h"
                       :i="item.i"
                       :key="item.i"
                       :static="item.static ? true : false"
                       @resize="handleResizeEvent"
                       @resized="handleResizedEvent"
                       @move="handleMoveEvent"
                       @moved="handleMovedEvent">
              <template v-if="item.componentName">
                <component :is="item.componentName"
                           :ref="'Component' + item.i + 'Ref'"
                           :i="item.i"
                           :componentConfig="item.componentConfig"
                           @resize="onComponentResize"></component>
              </template>
              <div :class="['mask_container',index === handlingIndex ? 'component-selected' : '', isMoved ? 'component-moved' : '']"
                   @click.stop="handleComponentClick(index)"
                   @mouseenter.stop="handleMaskEnter(index)">
                <div @click.stop="handleDelete(index)"
                     class="delete-icon">
                  <img class="delete-img"
                       src="./assets/delete.png"
                       alt="">
                </div>
              </div>
            </grid-item>
          </grid-layout>
        </div>
      </div>
      <div class="right">
        <el-tabs v-model="configType"
                 class="custom-tabs"
                 type="card">
          <el-tab-pane label="组件配置"
                       name="componentConfig">
            <el-collapse class="custom-collapse">
              <el-collapse-item title="组件全局配置"
                                name="1">
                <div class="xywh-config__container">
                  <div class="position-label">位置</div>
                  <div class="input_container">
                    <el-input v-model.number="x"
                              type="number"
                              :min="0"
                              class="position-size-input"
                              @change="handleXchange">
                      <template v-slot:suffix>X</template>
                    </el-input>
                  </div>
                  <div class="input_container">
                    <el-input v-model.number="y"
                              :min="0"
                              type="number"
                              class="position-size-input"
                              @change="handleYchange">
                      <template v-slot:suffix>Y</template>
                    </el-input>
                  </div>
                </div>
                <div class="xywh-config__container mt10">
                  <div class="position-label">大小</div>
                  <div class="input_container">
                    <el-input v-model.number="w"
                              type="number"
                              :min="0"
                              class="position-size-input"
                              @change="handleWchange">
                      <template v-slot:suffix>W</template>
                    </el-input>
                  </div>
                  <div class="input_container">
                    <el-input v-model.number="h"
                              type="number"
                              :min="0"
                              class="position-size-input"
                              @change="handleHchange">
                      <template v-slot:suffix>H</template>
                    </el-input>
                  </div>
                </div>
              </el-collapse-item>
              <Pie1Config v-if="handlingIndex >= 0 && boardConfig.components[handlingIndex].componentName === 'Pie1'"
                          :componentConfig="boardConfig.components[handlingIndex].componentConfig"
                          :handlingIndex="handlingIndex"
                          @change="handlePie1ConfigChange" />
              <Title1Config v-if="handlingIndex >= 0 && boardConfig.components[handlingIndex].componentName ==='Title1'"
                            :componentConfig="boardConfig.components[handlingIndex].componentConfig"
                            @change="handleTitleConfigChange"></Title1Config>
              <TestLinkConfig v-if=" 
                  handlingIndex >= 0 &&
                  boardConfig.components[handlingIndex].componentName ==='TestLink'"
                              :components="boardConfig.components"
                              @change="handleTestLinkConfigChange"></TestLinkConfig>
              <Select1Config v-if="handlingIndex >= 0 &&
                  boardConfig.components[handlingIndex].componentName ==='Select1'"
                             :componentConfig="boardConfig.components[handlingIndex].componentConfig"
                             @change="handleSelect1Change"></Select1Config>
              <DatePicker1Config v-if="handlingIndex >= 0 &&
                  boardConfig.components[handlingIndex].componentName ==='DatePicker1'"
                                 :componentConfig="boardConfig.components[handlingIndex].componentConfig"
                                 @change="handleDatePicker1Change"></DatePicker1Config>
            </el-collapse>
          </el-tab-pane>
          <el-tab-pane label="数据来源配置"
                       name="dataConfig">
            <data-config v-if="handlingIndex >= 0"
                         :data="boardConfig.components[handlingIndex].componentConfig.data"
                         @staticDataChange="handleStaticDataChange" />
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import VueGridLayout from 'vue-grid-layout';

import { Collapse, CollapseItem } from 'element-ui';
import throttle from 'lodash/throttle';
import cloneDeep from 'lodash/cloneDeep';
import findIndex from 'lodash/findIndex';
import COMPONENT_CONFIG from './component_config';
/* 侧边栏 */
import SideBar from './components/SideBar';
import {
  saveBoard,
  updateBoard,
  uploadFile,
  getBoardConfigDetail
} from './api';
import html2canvas from 'html2canvas';
import mixin from './EditChartViewMixin';
/* 背景图片 */
const darkBackground = require('./assets/darkBackground.png');
const lightBackground = require('./assets/lightBackground.png');

/* 布局容器的高度 */
let layoutContainerHeight = 0;

/* const testLayout = [
  { x: 0, y: 30, w: 30, h: 3, i: '3' },
  { x: 0, y: 20, w: 40, h: 3, i: '4' }
]; */
export default {
  name: 'EditChartView',
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    'el-collapse': Collapse,
    'el-collapse-item': CollapseItem,
    SideBar,
    'bg-popover': () => import('./components/SideBar/BgPopover'),
    'size-popover': () => import('./components/SideBar/SizePopover'),
    'component-popover': () => import('./components/SideBar/ComponentPopover'),
    ChartBar1: () => import('./components/ChartBar1'),
    Title1: () => import('./components/Title1/Title1'),
    Title1Config: () => import('./components/Title1/Title1Config'),
    TestLink: () => import('./components/TestLink/TestLink'),
    TestLinkConfig: () => import('./components/TestLink/TestLinkConfig'),
    Pie1: () => import('./components/Pie1/Pie1'),
    Pie1Config: () => import('./components/Pie1/Pie1Config'),
    DatePicker1: () => import('./components/DatePicker1/DatePicker1.vue'),
    DatePicker1Config: () =>
      import('./components/DatePicker1/DatePicker1Config.vue'),
    Select1: () => import('./components/Select1/Select1.vue'),
    Select1Config: () => import('./components/Select1/Select1Config.vue'),
    DataConfig: () => import('./components/DataConfig')
  },
  mixins: [mixin],
  data() {
    return {
      // 保存的loading
      saveLoading: false,
      configType: 'componentConfig',
      colNum: 240,
      rowHeight: 10,
      x: 0,
      y: 0,
      w: 0,
      h: 0,
      handlingIndex: -1,
      isMoved: false, //  是否有组件正在移动
      boardSize: 1,
      // 这个form主要是用于编辑的时候用的
      editForm: {
        crteTime: '',
        currentPage: 1,
        moduSbj: null,
        moduType: null,
        needCount: true,
        opterId: null,
        opterName: null,
        order: null,
        orderField: null,
        pageSize: 20,
        rejectRea: null,
        rid: '',
        scrChkStas: '',
        scrCodg: '',
        scrId: '',
        scrName: '',
        scrThum: '',
        updtTime: '',
        ver: null
      },
      // 整个看板的配置
      boardConfig: {
        /* 大屏名称 */
        boardTitle: '',
        /* 大屏Code标识 */
        boardCode: '',
        /* 大屏分辨率 */
        screenRatio: {
          width: 1920,
          height: 1080,
          /* 是否是自定义尺寸 */
          isCustom: false
        },
        /* 背景 */
        background: {
          // 背景图片，优先级高于背景色
          // backgroundImage:
          // 'http://114.55.3.21:9000/oms/oms-ui/hsp-yxjc-h5/screenEdit/img/darkBackground.bc8d3945.png',
          // 背景色，linear-gradient 开头就是渐变， 否则就是单色
          backgroundColor: '#1C2B4E'
        },
        /* 组件的id， 每次都会自增 */
        componentIdIndex: 0,
        // 组件的一些配置选项, 必然是多个组件
        components: [
          {
            x: 0,
            y: 0,
            w: 0, // w和col-num有关
            h: 0, // h和row-height有关
            /* grid-layout 栅格元素ID 因为用了sync修饰符，所以这里必须写成i*/
            i: 0,
            static: true,
            componentName: '',
            componentConfig: {}
          }
        ]
      }
    };
  },
  computed: {
    boardBgStyle: function () {
      let style = {};
      const background = this.boardConfig.background;
      if (background.backgroundImage) {
        style = {
          backgroundImage: `url(${background.backgroundImage})`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center'
        };
      } else if (
        background.backgroundColor &&
        background.backgroundColor.indexOf('linear-gradient') > -1
      ) {
        style = {
          backgroundImage: background.backgroundColor
        };
      } else if (
        background.backgroundColor &&
        background.backgroundColor.indexOf('#') > -1
      ) {
        style = {
          backgroundColor: background.backgroundColor
        };
      }
      return style;
    }
  },
  created() {
    /* 如果有参数的话我们认为是编辑 */
    this.initBoardConfig();
    document.title = '大屏编辑';
    /* 下面是自动保存草稿功能 */
    if (this.saveTimer) {
      clearInterval(this.saveTimer);
    }
    this.saveTimer = setInterval(() => {
      this.automaticSave();
    }, 45000);
  },
  mounted() {
    this.handleResetMainBoardSize();
    this.handleResetMainBoardSizeThrottle = throttle(
      this.handleResetMainBoardSize,
      100
    );
    window.addEventListener('resize', this.handleResetMainBoardSizeThrottle);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResetMainBoardSizeThrottle);
    if (this.saveTimer) {
      clearInterval(this.saveTimer);
    }
  },
  methods: {
    initBoardConfig() {
      const query = this.$route.query;
      if (query && query.code) {
        const code = query.code;
        getBoardConfigDetail(code).then((res) => {
          if (res && res.code === 0 && res.data) {
            for (let key in res.data) {
              if (key !== 'cfg') {
                this.editForm[key] = res.data[key];
              }
            }
            if (res.data.cfg) {
              try {
                const config = JSON.parse(res.data.cfg);
                if (
                  Object.prototype.toString.call(config) === '[object Object]'
                ) {
                  this.boardConfig = config;
                }
              } catch (error) {
                console.log(error);
              }
            }
          }
        });
        /* if (config) {
          this.boardConfig = JSON.parse(config);
        } */
      }
    },
    // 静态数据变更时触发
    handleStaticDataChange(data) {
      this.boardConfig.components[this.handlingIndex].componentConfig.data = {
        ...data
      };
    },
    /* 计算组件的初始 top(y) 值 */
    getInitialYVal(component) {
      return (
        (layoutContainerHeight - this.rowHeight * component.h) / this.rowHeight
      );
    },
    /* 新增组件 */
    handleComponentInsert(componentName) {
      /* 获取配置好的默认配置 */
      const componentDefaultConfig = COMPONENT_CONFIG[componentName];
      if (componentDefaultConfig) {
        const component = cloneDeep(componentDefaultConfig);
        component.i = ++this.boardConfig.componentIdIndex;

        switch (componentName) {
          // 可以针对不同的组件设定不同的位置
          case 'title1': {
            component.y = 0;
            break;
          }

          default: {
            component.y = this.getInitialYVal(component);
            break;
          }
        }
        this.boardConfig.components.push(component);
        // 拷贝一份配置
      }
    },
    handleSetBgColor(color) {
      this.boardConfig.background.backgroundColor = color;
      this.boardConfig.background.backgroundImage = null;
    },
    handleSetBgImage(type) {
      if (type === 'dark') {
        this.$set(
          this.boardConfig.background,
          'backgroundImage',
          darkBackground
        );
        // this.boardConfig.background.backgroundImage = darkBackground;
      } else if (type === 'light') {
        this.$set(
          this.boardConfig.background,
          'backgroundImage',
          lightBackground
        );
        // this.boardConfig.background.backgroundImage = lightBackground;
      }
      this.boardConfig.background.backgroundColor = '';
    },
    handleSizeChange(sizeConfig) {
      this.boardConfig.screenRatio.isCustom = sizeConfig.custom;
      this.boardConfig.screenRatio.width = sizeConfig.size[0];
      this.boardConfig.screenRatio.height = sizeConfig.size[1];
      this.handleResetMainBoardSize();
    },
    handleResetMainBoardSize() {
      const MaintBoardDom = this.$refs['MaintBoardRef'];
      const width = this.boardConfig.screenRatio.width;
      const height = this.boardConfig.screenRatio.height;
      const style = window.getComputedStyle(MaintBoardDom);
      // 看板尺寸 按比例设置
      const MaintBoardDomWidth = parseFloat(style.width);
      // 记录真实的width
      const realHeight = (MaintBoardDomWidth * height) / width;
      layoutContainerHeight = realHeight;
      // this.boardConfig.screenRatio.boardDomHeight = layoutContainerHeight;
      MaintBoardDom.style.height = realHeight + 'px';
      this.$nextTick(() => {
        this.rowHeight = (MaintBoardDomWidth / width) * 10;
        console.log('this.rowHeight', this.rowHeight);
      });
    },
    handleMoveEvent(i, newX, newY) {
      console.log(
        `%c moved, i=${i}, newX=${newX}, newY=${newY}`,
        'color: green;'
      );
      if (this.isMoved) return;
      this.isMoved = true;
    },
    handleMovedEvent(i, newX, newY) {
      console.log(
        `%c moved, i=${i}, newX=${newX}, newY=${newY}`,
        'color: red;'
      );
      this.isMoved = false;
      /* console.log(i);
      console.log(newX);
      console.log(newY); */
      // 说明超出了
      const index = findIndex(this.boardConfig.components, (_) => _.i === i);
      // debugger;
      const component = this.boardConfig.components[index];
      if (this.rowHeight * (newY + component.h) > layoutContainerHeight) {
        const y = this.getInitialYVal(component);
        this.$nextTick(() => {
          this.boardConfig.components[index].y = y - 0;
        });
      }
    },
    handleAddTestLink() {
      const component = cloneDeep(COMPONENT_CONFIG['testLink']);
      component.i = ++this.boardConfig.componentIdIndex;
      this.boardConfig.components.push(component);
    },
    /* 删除组件 */
    handleDelete(index) {
      this.boardConfig.components.splice(index, 1);
      if (this.handlingIndex === index) {
        this.handlingIndex = -1;
      }
      this.$forceUpdate();
    },
    handleBoardClick() {
      // this.handlingIndex = -1;
    },
    handleComponentClick(index) {
      const layoutInstance = this.boardConfig.components[index];
      this.handlingIndex = index;
      this.x = layoutInstance.x;
      this.y = layoutInstance.y;
      this.w = layoutInstance.w;
      this.h = layoutInstance.h;
    },

    handleMaskEnter(index) {
      const layoutInstance = this.boardConfig.components[index];
      if (layoutInstance.static === false) {
        return;
      }
      this.$set(this.boardConfig.components[index], 'static', false);
    },
    handleXchange() {
      const ins = this.boardConfig.components[this.handlingIndex];
      if (ins) {
        ins.x = this.x - 0;
      }
    },
    handleYchange() {
      const ins = this.boardConfig.components[this.handlingIndex];
      if (ins) {
        ins.y = this.y - 0;
      }
    },
    handleWchange() {
      const ins = this.boardConfig.components[this.handlingIndex];
      if (ins) {
        ins.w = this.w - 0;
      }
    },
    handleHchange() {
      const ins = this.boardConfig.components[this.handlingIndex];
      if (ins) {
        ins.h = this.h - 0;
      }
    },
    // i, newH, newW, newHPx, newWPx
    /* 正在调整大小 */
    handleResizeEvent(i, newH, newW, newHPx, newWPx) {
      console.log(
        `%c resize, newH=${newH}, newW=${newW}, newHPx=${newHPx}, newWPx=${newWPx}`,
        'color: green;'
      );
      // this.$refs[`Component${i}Ref`][0].resize();
      // let index = findIndex(this.boardConfig.components, (o) => o.i === i);
    },
    /* 大小调整完成 */
    handleResizedEvent(i, newH, newW, newHPx, newWPx) {
      console.log(
        `%c resized, newH=${newH}, newW=${newW}, newHPx=${newHPx}, newWPx=${newWPx}`,
        'color: red;'
      );
      const index = findIndex(this.boardConfig.components, (o) => o.i === i);
      const component = this.boardConfig.components[index];
      if (index > -1) {
        this.w = newW;
        this.h = newH;
        this.handlingIndex = index;
      }
    },

    handleTitleConfigChange(config) {
      // this.handlingIndex;
      const component = this.boardConfig.components[this.handlingIndex];
      this.boardConfig.components[this.handlingIndex].componentConfig = {
        ...config,
        scale: component.scale
      };
    },
    handleSelect1Change(config) {
      const component = this.boardConfig.components[this.handlingIndex];
      this.boardConfig.components[this.handlingIndex].componentConfig = {
        ...config,
        scale: component.scale
      };
    },
    handleDatePicker1Change(config) {
      const component = this.boardConfig.components[this.handlingIndex];
      this.boardConfig.components[this.handlingIndex].componentConfig = {
        ...config,
        scale: component.scale
      };
    },
    handlePie1ConfigChange(config) {
      this.boardConfig.components[this.handlingIndex].componentConfig = {
        ...config
      };
    },
    handleTestLinkConfigChange(val) {
      this.boardConfig.components[
        this.handlingIndex
      ].componentConfig.linkedListKey.push(val);
    },
    /* 预览 */
    handlePreview() {
      localStorage.setItem('preview', JSON.stringify(this.boardConfig));
      const boardCode = encodeURIComponent('preview');
      setTimeout(() => {
        window.open('/#/board-preview?code=' + boardCode);
      }, 0);
    },
    /* 自动保存 */
    automaticSave() {
      if (this.boardConfig.boardCode) {
        localStorage.setItem(
          this.boardConfig.boardCode,
          JSON.stringify(this.boardConfig)
        );
      }
    },
    // base64编码的内容变成二进制，同时unit8编码
    dataURLtoBlob(dataurl) {
      var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    },
    /* 保存 */
    handleSave() {
      if (this.saveLoading) return;
      if (this.boardConfig.boardCode && this.boardConfig.boardTitle) {
        /* 1、先生成图片上传 */
        try {
          this.saveLoading = true;
          html2canvas(this.$refs['MaintBoardRef'], {
            scale: 1,
            useCORS: true
          }).then((canvas) => {
            const imgDataURL = canvas.toDataURL('image/png');
            const formData = new FormData();
            const blob = this.dataURLtoBlob(imgDataURL);
            const fileName = new Date().getTime() + '.png';
            formData.append('file', blob, fileName);
            uploadFile(formData)
              .then((res) => {
                if (res && res.code === 0 && res.data) {
                  // 图片的缩略图
                  const scrThum = process.env.VUE_APP_IMG_HOST + res.data;
                  /* 判断是不是编辑, 存在scrId即认为是编辑 */
                  if (this.editForm.rid || this.editForm.scrId) {
                    const postData = {};
                    for (let key in this.editForm) {
                      postData[key] = this.editForm[key];
                    }
                    postData.cfg = JSON.stringify(this.boardConfig);
                    postData.scrName = this.boardConfig.boardTitle;
                    postData.scrCodg = this.boardConfig.boardCode;
                    postData.scrThum = scrThum;
                    updateBoard(postData)
                      .then((boardRes) => {
                        if (
                          boardRes.code === 0 &&
                          boardRes.type === 'success'
                        ) {
                          this.$message.success('保存成功');
                        }
                      })
                      .finally(() => {
                        this.saveLoading = false;
                      });
                  } else {
                    // 保存
                    const postData = {
                      cfg: JSON.stringify(this.boardConfig),
                      scrName: this.boardConfig.boardTitle,
                      scrCodg: this.boardConfig.boardCode,
                      scrThum
                    };
                    saveBoard(postData)
                      .then((boardRes) => {
                        if (
                          boardRes.code === 0 &&
                          boardRes.type === 'success'
                        ) {
                          this.$message.success('保存成功');
                        }
                      })
                      .finally(() => {
                        this.saveLoading = false;
                      });
                  }
                } else {
                  this.saveLoading = false;
                }
              })
              .catch((err) => {
                this.saveLoading = false;
              })
              .finally(() => {
                // this.saveLoading = false;
              });
          });
        } catch (error) {
          this.saveLoading = false;
          this.$message.warning('缩略图生成失败');
        } finally {
        }
        /* localStorage.setItem(
          this.boardConfig.boardCode,
          JSON.stringify(this.boardConfig)
        ); */
      } else {
        this.$message.warning('请填写大屏名称和Code标识');
      }
    },
    /* 提交审核 */
    handleSubmitCheck() {
      if (this.boardConfig.boardCode && this.boardConfig.boardTitle) {
        //  ...
        this.$message.success('提交审核成功');
      } else {
        this.$message.warning('请先填写Code标识');
      }
    },
    handleBack() {
      // this.$router.go(-1)
    }
  }
};
</script>

<style scoped lang="stylus">
@import './EditChartView.styl';
</style>
