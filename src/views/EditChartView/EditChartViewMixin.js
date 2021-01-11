import findIndex from 'lodash/findIndex';
export default {
  methods: {
    // 组件的大小(size)变化
    onComponentResize({ contentRect, i, componentName }) {
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
          const scale = width / 1000;
          const h = (33 * scale) / this.rowHeight;
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

        default:
          break;
      }
    }
  }
};
