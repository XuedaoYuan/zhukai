import findIndex from 'lodash/findIndex';
export default {
  methods: {
    // 组件的大小(size)变化
    // initialW  initialH 为组件定义是的具体宽高。比如Select1的宽高为248*36 这是在css写死的，后续缩放全部通过transform
    onComponentResize({ contentRect, i, componentName, initialW, initialH }) {
      // console.log(contentRect, i);
      const index = findIndex(this.boardConfig.components, (o) => o.i === i);
      const component = this.boardConfig.components[index];
      const width = contentRect.width;
      // const height = contentRect.height;
      switch (componentName) {
        case 'Select1': {
          const scale = width / 248;
          const h = (36 * scale) / this.rowHeight;
          this.$nextTick(() => {
            this.boardConfig.components[index].h = h;
            this.h = h;
          });
          this.boardConfig.components[index].componentConfig = {
            ...component.componentConfig,
            scale: scale
          };
          break;
        }
        case 'DatePicker1': {
          const scale = width / 248;
          const h = (36 * scale) / this.rowHeight;
          this.$nextTick(() => {
            this.boardConfig.components[index].h = h;
            this.h = h;
          });
          this.boardConfig.components[index].componentConfig = {
            ...component.componentConfig,
            scale: scale
          };
          break;
        }
        case 'Title1': {
          const scale = width / initialW;
          const h = (initialH * scale) / this.rowHeight;
          this.$nextTick(() => {
            this.boardConfig.components[index].h = h;
            this.h = h;
          });
          this.boardConfig.components[index].componentConfig.scale = scale;
          break;
        }
        case 'Bar1': {
          const scale = width / initialW;
          const h = (initialH * scale) / this.rowHeight;
          this.$nextTick(() => {
            this.boardConfig.components[index].h = h;
            this.h = h;
          });
          this.boardConfig.components[index].componentConfig.scale = scale;
          break;
        }

        default:
          break;
      }
    }
  }
};
