<template>
  <div ref="TestRef"
       class="test_container">
    <h1 class="h1_title">test</h1>
    <div>
      <el-divider content-position="left">测试全局el注册组件</el-divider>
      <el-button>button</el-button>
      <el-button type="primary">button</el-button>
      <el-input v-model="value"
                placeholder="please input"></el-input>
      <div>{{value}}</div>
      <el-divider content-position="left">Vuex Demo</el-divider>
      <h2>count: {{count}}-----doubleCount:{{doubleCount}}</h2>
      <div>
        <el-button @click="hadnleAdd_1_Sync">add 1 sync</el-button>
        <el-button @click="hadnleAdd_10_Async">add 10 async</el-button>
        <el-button @click="hadnleAdd_20_AsyncByDispatch">add 20 async by dispatch</el-button>
      </div>
      <div>
        <el-button @click="$eventBus.$emit('testmsg')">$emit</el-button>
        <el-button @click="handleCapture">Capture</el-button>
      </div>
    </div>
    <div class="canvas_container"
         v-if="canvasShow"
         @click="canvasShow = false"
         ref="CanvasContainerRef"></div>
  </div>
</template>

<script>
// lodash 推荐用法
import concat from 'lodash/concat';
import { testApi } from '@/api/Test/index.js';
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex';
import { Divider } from 'element-ui';
import html2canvas from 'html2canvas';
export default {
  name: 'Test',
  components: {
    // 局部注册组件
    'el-divider': Divider
  },
  data() {
    return {
      value: '',
      canvasShow: false
    };
  },
  computed: {
    ...mapState('hsa/test', ['count']),
    ...mapGetters('hsa/test', ['doubleCount'])
  },
  created() {
    console.log(concat(1, 2, [3]));
    testApi();

    this.$eventBus.$on('testmsg', (event) => {
      console.log(1);
    });
    this.$eventBus.$on('testmsg', (event) => {
      console.log(2);
    });
    console.log('===');
    // console.log(html2canvas);
  },
  methods: {
    ...mapMutations('hsa/test', ['addCount']),
    ...mapActions('hsa/test', ['addCountAsync', 'addCountAsync2']),
    hadnleAdd_1_Sync() {
      this.addCount(1);
    },
    hadnleAdd_10_Async() {
      this.addCountAsync({ n: 10 });
    },
    hadnleAdd_20_AsyncByDispatch() {
      this.addCountAsync2({ n: 20 });
    },
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
    /* 截图 */
    handleCapture() {
      const vm = this;
      html2canvas(this.$refs['TestRef'], {
        scale: 1,
        useCORS: true
      }).then((canvas) => {
        this.canvasShow = true;
        this.$nextTick(() => {
          const imgUrl = canvas.toDataURL('image/png');
          // const formData = new FormData();
          // const blob = this.dataURLtoBlob(imgUrl)
          // formData.append('file', blob)
          const img = document.createElement('img');
          img.setAttribute('src', imgUrl);
          img.onload = () => {
            const canvasDom = document.createElement('canvas');
            // canvasDom.setAttribute('width', 192)
            // canvasDom.width = 192
            // canvasDom.height = 108
            // canvasDom.setAttribute('height', 108)
            const context = canvasDom.getContext('2d');
            context.drawImage(img, 0, 0, 192, 108);
            // vm.$refs['CanvasContainerRef'].appendChild(img);
            vm.$refs['CanvasContainerRef'].appendChild(canvasDom);
          };
        });
      });
    }
  }
};
</script>

<style scoped lang="stylus">
.h1_title {
  color: $main-color;
}

.test_container {
  position: relative;
}

.canvas_container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
