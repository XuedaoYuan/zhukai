<template>
  <div class="BoardPreview__container"
       ref="MaintBoardRef"
       :style="boardBgStyle">
    <grid-layout :layout.sync="boardConfig.components"
                 :col-num="colNum"
                 :row-height="rowHeight"
                 :is-draggable="false"
                 :is-resizable="false"
                 :is-mirrored="false"
                 :vertical-compact="false"
                 :margin="[0, 0]"
                 :use-css-transforms="false"
                 :auto-size="false"
                 :responsive="false">
      <grid-item v-for="(item, index) in boardConfig.components"
                 :x="item.x"
                 :y="item.y"
                 :w="item.w"
                 :h="item.h"
                 :i="item.i"
                 :key="item.i">
        <template v-if="item.componentName">
          <component :is="item.componentName"
                     :ref="'Component' + index + 'Ref'"
                     :i="item.i"
                     :componentConfig="item.componentConfig"></component>
        </template>

      </grid-item>
    </grid-layout>
  </div>
</template>

<script>
/* 预览页面 */
import VueGridLayout from 'vue-grid-layout';
import throttle from 'lodash/throttle';

/* 展示组件 */
import Title1 from './components/Title1/Title1';
import DatePicker from './components/DatePicker';
import TestLink from './components/TestLink/TestLink';
import ChartBar1 from './components/ChartBar1';
export default {
  name: 'BoardPreview',
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    Title1,
    DatePicker,
    TestLink,
    ChartBar1
  },
  data() {
    return {
      colNum: 240,
      rowHeight: 10,
      boardConfig: {
        /* 大屏名称 */
        boardTitle: '',
        /* 大屏Code标识 */
        boardCode: '',
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
          backgroundColor: []
        },
        // 组件的一些配置选项, 必然是多个组件
        components: []
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
    this.handleInit();
  },
  mounted() {
    this.initResize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResetMainBoardSizeThrottle);
  },
  methods: {
    /*  初始化 */
    handleInit() {
      const boardConfigString = localStorage.getItem('boardConfig');
      if (boardConfigString) {
        this.boardConfig = JSON.parse(boardConfigString);
        document.title = this.boardConfig.boardTitle;
      }
    },
    initResize() {
      this.handleResetMainBoardSize();
      this.handleResetMainBoardSizeThrottle = throttle(
        this.handleResetMainBoardSize
      );
      window.addEventListener('resize', this.handleResetMainBoardSizeThrottle);
    },
    handleResetMainBoardSize() {
      const MaintBoardDom = this.$refs['MaintBoardRef'];
      const width = this.boardConfig.screenRatio.width;
      const height = this.boardConfig.screenRatio.height;
      const style = window.getComputedStyle(MaintBoardDom);
      // 看板尺寸 按比例设置
      const realHeight = (parseInt(style.width) * height) / width;
      MaintBoardDom.style.height = realHeight + 'px';
    }
  }
};
</script>

<style scoped lang="stylus">
.BoardPreview__container {
  width: 100%;
}
</style>    
