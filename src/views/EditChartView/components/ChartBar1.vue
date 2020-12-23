<template>
  <div class="wrapper"
       ref="WrapperRef">
    <div class="container"
         ref="ChartContainer"></div>
  </div>
</template>

<script>
export default {
  name: 'ChartBar1',
  data() {
    return {};
  },
  mounted() {
    /*  const wrapperStyle = window.getComputedStyle(this.$refs['WrapperRef']);
    console.log(wrapperStyle.width); */
    const ChartContainerDom = this.$refs['ChartContainer'];
    // ChartContainerDom.style.width = wrapperStyle.width;
    // ChartContainerDom.style.height = wrapperStyle.height;
    this.$nextTick(() => {
      const chartInstance = this.$echarts.init(ChartContainerDom);
      this.chartInstance = chartInstance;
      const option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(220, 220, 220, 0.8)'
            }
          }
        ]
      };
      chartInstance.setOption(option);
      setTimeout(() => {
        chartInstance.resize({
          width: 'auto',
          height: 'auto',
          silent: true
        });
      }, 0);
    });
  },
  methods: {
    resize() {
      this.chartInstance.resize({
        // width: 'auto',
        // height: 'auto',
        silent: true
      });
    }
  },
  beforeDestroy() {
    this.chartInstance.clear();
    this.chartInstance.dispose();
    this.chartInstance = null;
  }
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
.container {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
  height: 100% !important;
  width: 100% !important;
}
</style>
