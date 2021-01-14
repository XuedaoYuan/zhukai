<template>
  <div class="wrapper" ref="WrapperRef">
    <div v-if="componentConfig.titleShow" class="title">
      {{ componentConfig.title || "海南地图" }}
    </div>
    <div class="container" ref="ChartContainer"></div>
  </div>
</template>
<script>
import _omit from "lodash/omit";
import axios from "axios";
export default {
  name: "ChinaMap1",
  props: ["componentConfig"],
  data() {
    return {
      chartInstance: null,
      chartContainerDOM: null,
      chinaJSON: '/static/mapData/china.json'
    };
  },
  watch: {
    // "componentConfig.titleShow": function (val, oldVal) {
    //   this.resize();
    // },
    // "componentConfig.fontSize": function (val, oldVal) {
    //   this.resize();
    // },
    // "componentConfig.data": function(val, oldVal){
    //   this.chartInstance.setOption(this.componentConfig.data);
    // },
  },
  computed: {
    // titleStyle: function () {
    //   return _omit(this.componentConfig, ["title", "titleShow"]);
    // },
  },
  mounted() {
    const chartContainerDOM = this.$refs["ChartContainer"];
    this.chartContainerDOM = chartContainerDOM;
    this.$nextTick(() => {
      this.chartInstance = this.$echarts.init(chartContainerDOM);
      this.chartInstance.showLoading();
      axios.get(this.chinaJSON).then(({ data }) => {
        this.$echarts.registerMap("china", data);
        this.chartInstance.hideLoading();
        this.chartInstance.setOption(this.componentConfig.data);
      });
    });
  },
  methods: {
    resize() {
      this.$nextTick(() => {
        this.chartInstance.resize();
      });
    },
  },
  destroyed() {
    console.log("destroy");
    this.chartInstance.clear();
    this.chartInstance.dispose();
    this.chartInstance = null;
  },
};
</script>
<style scoped lang="stylus">
.wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;

  .title {
    color: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 18px;
    line-height: 200%;
    flex-shrink: 0;
  }

  .container {
    background-image: url('../../assets/bg-border.png');
    background-size: 100% 100%;
    flex: 1;
  }
}
</style>