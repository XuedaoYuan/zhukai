import * as echarts from 'echarts';
export default {
  install: (Vue) => {
    Vue.prototype.$echarts = echarts;
  }
};
