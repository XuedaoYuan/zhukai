<template>
  <div class="TestVueGridLayout__container">
    <div>
      <div><span>{{boardConfig.components}}</span></div>
      <div>
        <el-button @click="handleAddNew">add new</el-button>
        <el-button @click="handleAddNewDatePicker">add DatePicker</el-button>
        <el-button @click="handleAddTitle1">add title1</el-button>
        <span>---尺寸</span>
        <el-radio-group v-model="boardSize"
                        @change="handleBoardSizeChange">

          <el-radio v-for="(item, index) in boardSizeList"
                    :label="index"
                    :key="index">{{item[0]}}*{{item[1]}}</el-radio>
        </el-radio-group>
        <span>=====背景</span>
        <div @click="handleChangeBgColor(['red'])"
             class="bg-icon red"></div>
        <div @click="handleChangeBgColor(['blue'])"
             class="bg-icon blue"></div>
        <div @click="handleChangeBgColor(['lightgreen'])"
             class="bg-icon lightgreen"></div>

        <div @click="handleChangeBgColor(['red', 'green'])"
             class="bg-icon redToGreen"></div>

      </div>
      <div>boardBgStyle:{{boardBgStyle}}</div>
    </div>
    <div class="content">
      <div class="left">
        <div class="mian-board__container"
             :style="boardBgStyle"
             ref="MaintBoardRef">
          <grid-layout :layout.sync="boardConfig.components"
                       :col-num="colNum"
                       :row-height="rowHeight"
                       :is-draggable="true"
                       :is-resizable="true"
                       :is-mirrored="false"
                       :vertical-compact="false"
                       :margin="[0, 0]"
                       :use-css-transforms="true"
                       :auto-size="false"
                       :responsive="false">
            <!--   @resize="resizeEvent"
                 @move="moveEvent"
                 @resized="resizedEvent"
                  -->
            <grid-item v-for="(item, index) in boardConfig.components"
                       :x="item.x"
                       :y="item.y"
                       :w="item.w"
                       :h="item.h"
                       :i="item.i"
                       :key="item.i"
                       @resize="handleResizeEvent($event)"
                       @moved="handleMovedEvent">
              <template v-if="item.componentName">
                <component :is="item.componentName"
                           :ref="'Component' + index + 'Ref'"
                           :componentConfig="item.componentConfig"></component>
              </template>
              <div :class="['mask_container', index === handlingIndex ? 'component-selected' : '']"
                   @click.stop="handleComponentClick(index)"></div>
            </grid-item>
          </grid-layout>
        </div>

      </div>
      <div class="right">
        <h4>配置项</h4>
        <el-collapse class="hsa-chart-el-collapse">
          <el-collapse-item title="组件全局配置"
                            name="1">
            <div class="xywh-config__container">
              <div>
                <span>x:</span>
                <el-input v-model.number="x"
                          type="number"
                          @change="handleXchange"></el-input>
              </div>
              <div>
                <span>y:</span>
                <el-input v-model="y"></el-input>
              </div>
            </div>
            <div class="xywh-config__container">
              <div>
                <span>w:</span>
                <el-input v-model.number="x"
                          type="number"
                          @change="handleXchange"></el-input>
              </div>
              <div>
                <span>h:</span>
                <el-input v-model="y"></el-input>
              </div>
            </div>
          </el-collapse-item>
          <Title1Config v-if="handlingIndex > 0 && boardConfig.components[handlingIndex].componentName === 'Title1'" :componentConfig="boardConfig.components[handlingIndex].componentConfig"></Title1Config>

        </el-collapse>

      </div>
    </div>

  </div>
</template>

<script>
import VueGridLayout from 'vue-grid-layout';
import ChartBar1 from './components/ChartBar1';
import DatePicker from './components/DatePicker';
import Title1 from './components/Title1/Title1';
import Title1Config from './components/Title1/Title1Config';
import { Radio, RadioGroup, Collapse, CollapseItem } from 'element-ui';
import throttle from 'lodash/throttle';
import cloneDeep from 'lodash/cloneDeep';
import COMPONENT_CONFIG from './component_config';
/* 看板尺寸 */
const boardSizeList = [
  [2560, 1440],
  [1920, 1080],
  [1366, 768],
  [1440, 1024]
];
const testLayout = [
  { x: 0, y: 30, w: 30, h: 3, i: '3' },
  { x: 0, y: 20, w: 40, h: 3, i: '4' }
  /*
  { x: 10, y: 0, w: 2, h: 3, i: '5' },
  { x: 0, y: 5, w: 2, h: 5, i: '6' },
  { x: 2, y: 5, w: 2, h: 5, i: '7' },
  { x: 4, y: 5, w: 2, h: 5, i: '8' },
  { x: 6, y: 3, w: 2, h: 4, i: '9' },
  { x: 8, y: 4, w: 2, h: 4, i: '10' },
  { x: 10, y: 4, w: 2, h: 4, i: '11' },
  { x: 0, y: 10, w: 2, h: 5, i: '12' },
  { x: 2, y: 10, w: 2, h: 5, i: '13' },
  { x: 4, y: 8, w: 2, h: 4, i: '14' },
  { x: 6, y: 8, w: 2, h: 4, i: '15' },
  { x: 8, y: 10, w: 2, h: 5, i: '16' },
  { x: 10, y: 4, w: 2, h: 2, i: '17' },
  { x: 0, y: 9, w: 2, h: 3, i: '18' },
  { x: 2, y: 6, w: 2, h: 2, i: '19' } */
];
export default {
  name: 'TestVueGridLayout',
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    ChartBar1,
    DatePicker,
    'el-radio': Radio,
    'el-radio-group': RadioGroup,
    'el-collapse': Collapse,
    'el-collapse-item': CollapseItem,
    Title1,
    Title1Config
  },
  data() {
    return {
      colNum: 240,
      rowHeight: 10,
      // layout: [...testLayout],
      x: 0,
      y: 0,
      handlingIndex: -1,
      boardSize: 1,
      // 整个看板的配置
      boardConfig: {
        /* 大屏分辨率 */
        screenRatio: {
          width: 1920,
          height: 1080
        },
        /* 背景 */
        background: {
          // 背景图片，优先级高于背景色
          backgroundImage: '',
          // 背景色，一个元素就是单色，2个元素就是渐变色 渐变方向从左到右
          backgroundColor: ['#000', '#ccc']
        },
        // 组件的一些配置选项, 必然是多个组件
        components: [
          {
            /* 栅格位置大小信息 */
            x: 10,
            y: 0,
            w: 40, // w和col-num有关
            h: 8, // h和row-height有关
            /* grid-layout 栅格元素ID 因为用了sync修饰符，所以这里必须写成i*/
            i: '0',
            /* 组件的类型，主要标明组件的用途，比如说是标题、导航、按钮、日期、图表、地图等。需要一个枚举类。
            根据不同的类型还要存储不同结构的数据 */
            type: '',
            /* 业务类型，可用于筛选，不一定要 */
            businessType: '',
            /* 业务主题， 同上 */
            businessTheme: '',
            // 栅格对应的组件名字，必须是已经注册的组件，而且必须唯一
            componentName: 'ChartBar1',
            /* 组件配置 */
            // 组件本身的属性  比如标题的title color等  这块根据自己的组件自己定义好自己的规则即可
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
        background.backgroundColor.length > 1
      ) {
        style = {
          backgroundImage: `linear-gradient(to right, ${background.backgroundColor[0]} , ${background.backgroundColor[1]})`
        };
      } else if (
        background.backgroundColor &&
        background.backgroundColor.length === 1
      ) {
        style = {
          backgroundColor: background.backgroundColor[0]
        };
      }
      return style;
    }
  },
  created() {
    this.boardSizeList = [...boardSizeList];
  },
  mounted() {
    this.handleResetMainBoardSize();
    this.handleResetMainBoardSizeThrottle = throttle(
      this.handleResetMainBoardSize
    );
    window.addEventListener('resize', this.handleResetMainBoardSizeThrottle);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResetMainBoardSizeThrottle);
  },
  methods: {
    handleChangeBgColor(colors) {
      this.boardConfig.background.backgroundColor = colors;
    },
    handleBoardSizeChange() {
      this.boardConfig.screenRatio.width = boardSizeList[this.boardSize][0];
      this.boardConfig.screenRatio.height = boardSizeList[this.boardSize][1];
      this.handleResetMainBoardSize();
    },
    handleResetMainBoardSize() {
      const MaintBoardDom = this.$refs['MaintBoardRef'];
      const width = this.boardConfig.screenRatio.width;
      const height = this.boardConfig.screenRatio.height;
      const style = window.getComputedStyle(MaintBoardDom);
      // 看板尺寸 按比例设置
      const realHeight = (parseInt(style.width) * height) / width;
      MaintBoardDom.style.height = realHeight + 'px';
    },
    // i, newH, newW, newHPx, newWPx
    handleResizeEvent($event) {
      console.log($event);
      // console.log('resize', i, newH, newW, newHPx, newWPx);
      // this.$refs[`Component${i}Ref`][0].resize();
    },
    handleMovedEvent(i, newX, newY) {
      console.log(i);
      console.log(newX);
    },
    handleAddNew() {
      // 可以计算到最右下角
      const layoutInstance = {
        x: 200,
        y: 10,
        w: 40,
        h: 8,
        i: this.boardConfig.components.length
      };
      this.boardConfig.components.push(layoutInstance);
    },
    handleAddNewDatePicker() {
      const layoutInstance = {
        x: 200,
        y: 10,
        w: 40,
        h: 4,
        i: this.boardConfig.components.length,
        componentName: 'DatePicker'
      };
      this.boardConfig.components.push(layoutInstance);
    },
    handleAddTitle1() {
      debugger;
      const component = cloneDeep(COMPONENT_CONFIG['title1']);
      component.i = this.boardConfig.components.length;
      this.boardConfig.components.push(component);
    },
    handleComponentClick(index) {
      const layoutInstance = this.boardConfig.components[index];
      this.handlingIndex = index;
      this.x = layoutInstance.x;
      this.y = layoutInstance.y;
    },
    handleXchange() {
      this.boardConfig.components[this.handlingIndex].x = this.x - 0;
    }
  }
};
</script>

<style scoped lang="stylus">
.TestVueGridLayout__container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.content {
  display: flex;
  flex: 1;
  overflow: hidden;
  border: 1px solid red;

  > div {
    height: 100%;
  }

  .left {
    flex: 1;
    overflow-y: auto;

    .mian-board__container {
      background-color: lightgreen;
    }
  }

  .right {
    flex: 0 0 200px;
    border-left: 1px solid red;
  }
}

.bg-icon {
  display: inline-block;
  margin-left: 10px;
  width: 16px;
  height: 16px;
  cursor: pointer;

  &.red {
    background-color: red;
  }

  &.blue {
    background-color: blue;
  }

  &.lightgreen {
    background-color: lightgreen;
  }

  &.redToGreen {
    background-image: linear-gradient(to right, red, green);
  }
}

.xywh-config__container {
  display: flex;

  & > div {
    flex: 1;
    display: flex;
    align-items: center;
  }
}
</style>
