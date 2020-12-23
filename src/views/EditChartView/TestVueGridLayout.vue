<template>
  <div class="TestVueGridLayout__container">
    <div>
      <div><span>{{layout}}</span></div>
      <div>
        <el-button ref="button"
                   @click="handleAddNew">add new</el-button>
        <el-button ref="button"
                   @click="handleAddNewDatePicker">add DatePicker</el-button>
      </div>
    </div>
    <div class="content">
      <div class="left">
        <grid-layout :layout.sync="layout"
                     :col-num="12"
                     :row-height="20"
                     :is-draggable="true"
                     :is-resizable="true"
                     :is-mirrored="false"
                     :vertical-compact="false"
                     :margin="[10, 10]"
                     :use-css-transforms="true"
                     :auto-size="true"
                     :responsive="true">
          <!--   @resize="resizeEvent"
                 @move="moveEvent"
                 @resized="resizedEvent"
                  -->
          <grid-item v-for="(item, index) in layout"
                     :x="item.x"
                     :y="item.y"
                     :w="item.w"
                     :h="item.h"
                     :i="item.i"
                     :key="item.i"
                     @resize="handleResizeEvent"
                     @moved="handleMovedEvent">
            <component :is="item.component"
                       :ref="'Component' + index + 'Ref'"></component>
            <div class="mask_container"
                 @click.stop="handleComponentClick(index)"></div>
          </grid-item>
        </grid-layout>
      </div>
      <div class="right">
        <h4>配置项</h4>
        <div>x: <el-input v-model.number="x"
                    type="number"
                    @change="handleXchange"></el-input> y: <el-input v-model="y"></el-input>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import VueGridLayout from 'vue-grid-layout';
import ChartBar1 from './components/ChartBar1';
import DatePicker from './components/DatePicker';
const testLayout = [
  { x: 0, y: 0, w: 2, h: 4, i: '0', component: 'ChartBar1' },
  { x: 3, y: 0, w: 2, h: 4, i: '1' },
  { x: 4, y: 0, w: 2, h: 5, i: '2' }
  /*
  { x: 6, y: 0, w: 2, h: 3, i: '3' },
  { x: 8, y: 0, w: 2, h: 3, i: '4' },
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
    DatePicker
  },
  data() {
    return {
      layout: [...testLayout],
      x: 0,
      y: 0
    };
  },
  methods: {
    handleResizeEvent(i, newH, newW, newHPx, newWPx) {
      console.log('resize', i);
      console.log();
      this.$refs[`Component${i}Ref`][0].resize();
    },
    handleMovedEvent(i, newX, newY) {
      console.log(i);
      console.log(newX);
    },
    handleAddNew() {
      const layoutInstance = {
        x: 10,
        y: 5,
        w: 2,
        h: 4,
        i: this.layout.length,
        component: 'ChartBar1'
      };
      this.layout.push(layoutInstance);
    },
    handleAddNewDatePicker() {
      const layoutInstance = {
        x: 10,
        y: 5,
        w: 2,
        h: 2,
        i: this.layout.length,
        component: 'DatePicker'
      };
      this.layout.push(layoutInstance);
    },
    handleComponentClick(index) {
      const layoutInstance = this.layout[index];
      this.handlingIndex = index;
      this.x = layoutInstance.x;
      this.y = layoutInstance.y;
    },
    handleXchange() {
      this.layout[this.handlingIndex].x = this.x - 0;
    }
  }
};
</script>

<style scoped lang="stylus">
.TestVueGridLayout__container {
  height: 100%;
}

.vue-grid-item {
  background-color: #ccc;
  position: relative;

  .mask_container {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: transparent;
    z-index: 1;
  }
}

.content {
  display: flex;

  .left {
    flex: 1;
    overflow: hidden;
  }

  .right {
    flex: 0 0 200px;
    border-left: 1px solid #ccc;
  }
}
</style>
