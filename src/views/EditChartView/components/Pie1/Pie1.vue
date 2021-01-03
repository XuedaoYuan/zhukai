<template>
  <div class="wrapper" ref="WrapperRef">
    <div v-if="componentConfig.titleShow" class="title" :style="titleStyle">
      {{ componentConfig.title || "医保支出" }}
    </div>
    <div class="container" ref="ChartContainer"></div>
  </div>
</template>
<script>
import _omit from "lodash/omit";
export default {
  name: "Pie1",
  props: ["componentConfig"],
  data() {
    return {
      chartInstance: null,
      chartContainerDOM: null,
      option: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: 10,
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
          textStyle: {
            color: "#fff",
          },
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" },
            ],
          },
        ],
      },
    };
  },
  watch: {
    "componentConfig.titleShow": function (val, oldVal) {
      this.chartResize();
    },
  },
  computed: {
    titleStyle: function () {
      return _omit(this.componentConfig, ["title", "titleShow"]);
    },
  },
  mounted() {
    const chartContainerDOM = this.$refs["ChartContainer"];
    this.chartContainerDOM = chartContainerDOM;
    this.$nextTick(() => {
      this.chartInstance = this.$echarts.init(chartContainerDOM);
      this.chartInstance.setOption(this.option);
    });
  },
  methods: {
    chartResize() {
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