<template>
  <div style="height: 100%">
    <el-form>
      <el-row style="height: 100%">
        <el-col :span="12">
          <el-row style="padding-top:80px; height:226px; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3)">
            <el-col :span="6" :offset="6">
              <el-form-item label="主题概览/个">
                <!-- <span>{{ 10 }}人</span> -->
              </el-form-item>
              10
            </el-col>
            <!-- <el-col :span="2" style="text-align:center"><i class="el-icon-share"></i></el-col> -->
            <el-col :span="6">
              <el-form-item label="相关指标/个">
                <!-- <span>{{ 10 }}人</span> -->
              </el-form-item>
              20
            </el-col>
          </el-row>
          <el-row style="height:407px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3)">
            <el-col :span="8" :offset="20"><router-link to="/listOfTopics"><span style="font-size:13px;color: #1964B9;">查看详情 >></span></router-link></el-col>
            <el-col>
              <el-tag
                v-for="item in items"
                :key="item.label"
                :type="item.type"
                effect="dark"
              >
                {{ item.label }}
              </el-tag>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="11" :offset="1" style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3)">
          <el-row>
            <el-col :span="8" :offset="20"><router-link to="/theIndexList"><span style="font-size:13px;color: #1964B9;">查看详情 >></span></router-link></el-col>
            <el-col><div id="main" style="width: 100%; height: 400px"></div></el-col>
            <el-col></el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
let echarts = require("echarts");
export default {
  name: "screeningOfMonitoringIndicators",
  data() {
    return {
      items: [
        { type: "", label: "标签一" },
        { type: "", label: "标签二" },
        { type: "", label: "标签三" },
        { type: "", label: "标签四" },
        { type: "", label: "标签五" },
      ],
      charts: "",
      opinion: ["实施指标", "非实时指标"],
      opinionData: [
        { value: 335, name: "实施指标" },
        { value: 210, name: "非实时指标" },
      ],
    };
  },
  methods: {
    drawPie(id) {
      console.log(id);
      this.charts = echarts.init(document.getElementById(id));
      console.log(this.charts);
      this.charts.setOption({
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          x: "left",
          data: this.opinion,
        },
        series: [
          {
            name: "指标",
            type: "pie",
            radius: "55%",
            roseType: "radius",
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center",
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "blod",
                },
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: this.opinionData,
            color: ["#7EC0EE", "#FF9F7F"],
          },
        ],
      });
    },
  },
  //调用
  mounted() {
    this.$nextTick(function () {
      this.drawPie("main");
    });
  },
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
