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
      switch (componentName) {
        case 'Select1':
        case 'DatePicker1':
        case 'Title1':
        case 'Bar1':
        case 'Line1':
        case 'Pie1':
        case 'Pie2':
        case 'Pie3':
        case 'Line2':
        case 'ChinaMap1': {
          const h = (initialH * scaleNew) / this.rowHeight;
          this.$nextTick(() => {
            this.boardConfig.components[index].h = h;
            this.h = h;
          });
          break;
        }

        /* case "LabelValue1": {
          break
        } */

        default: {
          const h = (initialH * scaleNew) / this.rowHeight;
          this.$nextTick(() => {
            this.boardConfig.components[index].h = h;
            this.h = h;
          });
          break;
        }
      }
    }
  }
};
