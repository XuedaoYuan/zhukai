import findIndex from 'lodash/findIndex';
export default {
  methods: {
    // 组件的大小(size)变化
    // initialW  initialH 为组件定义是的具体宽高。比如Select1的宽高为248*36 这是在css写死的，后续缩放全部通过transform
    onComponentResize({ contentRect, i, componentName, initialW, initialH, scaleNew }) {
      // console.log(contentRect, i);
      const index = findIndex(this.boardConfig.components, (o) => o.i === i);
      const component = this.boardConfig.components[index];
      // const width = contentRect.width;
      // const height = contentRect.height;
      const h = (initialH * scaleNew) / this.rowHeight;
      this.$nextTick(() => {
        this.boardConfig.components[index].h = h;
        this.h = h;
        if (!this.boardConfig.components[index].initialized) {
          this.setInitialYVal(this.boardConfig.components[index]);
          this.boardConfig.components[index].initialized = true;
        }
      });
    }
  }
};
