<template>
  <div class="TestVueGridLayout__container">
    <div>
      <div><span>{{layout}}</span></div>
      <div>
        <el-button ref="button"
                   @click="handleAddNew">add new</el-button>
      </div>
    </div>
    <!-- <ChartBar1></ChartBar1> -->
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
        <component :is="item.component"></component>
      </grid-item>
    </grid-layout>
  </div>
</template>

<script>
import VueGridLayout from 'vue-grid-layout';
import ChartBar1 from './components/ChartBar1';
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
    ChartBar1
  },
  data() {
    return {
      layout: [...testLayout]
    };
  },
  methods: {
    handleResizeEvent(i, newH, newW, newHPx, newWPx) {
      console.log('resize', i);
      console.log(ChartBar1);
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
}
</style>
