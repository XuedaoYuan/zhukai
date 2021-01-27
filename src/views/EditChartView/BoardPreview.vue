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
                     @resize="onComponentResize"
                     :moduleId="item.moduleId"
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
import mixin from './EditChartViewMixin';
export default {
  name: 'BoardPreview',
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    Title1: () => import('./components/Title1/Title1'),
    Title3: () => import('./components/Title3/Title3'),
    ChartBar1: () => import('./components/ChartBar1'),
    Pie1: () => import('./components/Pie1/Pie1'),
    DatePicker1: () => import('./components/DatePicker1/DatePicker1.vue'),
    Select1: () => import('./components/Select1/Select1.vue'),
    Bar1: () => import('./components/Bar1/Bar1.vue'),
    Bar2: () => import('./components/Bar2/Bar2.vue'),
    Bar3: () => import('./components/Bar3/Bar3'),
    Line1: () => import('./components/Line1/Line1.vue'),
    Map1: () => import('./components/Map1/Map1.vue'),
    ChinaMap1: () => import('./components/ChinaMap1/ChinaMap1.vue'),
    Pie2: () => import('./components/Pie2/Pie2'),
    Pie3: () => import('./components/Pie3/Pie3'),
    Pie4: () => import('./components/Pie4/Pie4'),
    Line2: () => import('./components/Line2/Line2'),
    HeadTitle1: () => import('./components/HeadTitle1/HeadTitle1'),
    HeadTitle2: () => import('./components/HeadTitle2/HeadTitle2'),
    LabelValue1: () => import('./components/LabelValue1/LabelValue1'),
    LabelValue2: () => import('./components/LabelValue2/LabelValue2'),
    LabelValue3: () => import('./components/LabelValue3/LabelValue3'),
    LabelValue4: () => import('./components/LabelValue4/LabelValue4'),
    LabelValue5: () => import('./components/LabelValue5/LabelValue5'),
    LabelValue6: () => import('./components/LabelValue6/LabelValue6'),
    LabelValue7: () => import('./components/LabelValue7/LabelValue7'),
    LabelValue8: () => import('./components/LabelValue8/LabelValue8'),
    LabelValue9: () => import('./components/LabelValue9/LabelValue9'),
    LabelValue10: () => import('./components/LabelValue10/LabelValue10')
  },
  mixins: [mixin],
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
          height: 1080,
          isCustom: false
        },
        /* 背景 */
        background: {
          // 背景图片，优先级高于背景色
          backgroundImage: '',
          // 背景色，一个元素就是单色，2个元素就是渐变色 渐变方向从左到右
          backgroundColor: ''
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
    this.handleInit();
  },
  mounted() {
    console.log('boardConfig ==> ', this.boardConfig);
    this.initResize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResetMainBoardSizeThrottle);
  },
  methods: {
    /*  初始化 */
    handleInit() {
      const query = this.$route.query;
      let code = query.code;
      code = decodeURIComponent(code);
      if (!code) {
        return;
      }
      const boardConfigString = localStorage.getItem(code);
      if (boardConfigString) {
        this.boardConfig = JSON.parse(boardConfigString);
        document.title = this.boardConfig.boardTitle;
      }
    },
    initResize() {
      this.handleResetMainBoardSize();
      this.handleResetMainBoardSizeThrottle = throttle(
        this.handleResetMainBoardSize,
        100
      );
      window.addEventListener('resize', this.handleResetMainBoardSizeThrottle);
    },
    handleResetMainBoardSize() {
      const MaintBoardDom = this.$refs['MaintBoardRef'];
      const width = this.boardConfig.screenRatio.width;
      const height = this.boardConfig.screenRatio.height;
      const style = window.getComputedStyle(MaintBoardDom);
      const realWidth = parseFloat(style.width);
      // 看板尺寸 按比例设置
      const realHeight = (realWidth * height) / width;
      MaintBoardDom.style.height = realHeight + 'px';
      this.$nextTick(() => {
        this.rowHeight = (realWidth / width) * 10;
        console.log('this.rowHeight', this.rowHeight);
      });
    }
  }
};
</script>

<style scoped lang="stylus">
.BoardPreview__container {
  width: 100%;

  // 预览时，组件不需要展示背景框
  /deep/ .chart__container {
    background-image: none;
  }
}
</style>    
