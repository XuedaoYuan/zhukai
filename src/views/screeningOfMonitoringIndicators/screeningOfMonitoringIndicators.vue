<template>
  <div class="fundamental-demo">
    <el-form>
      <el-row style="height: 100%" type="flex">
        <el-col :span="12">
          <el-row
            style="
              margin-bottom: 11px;
              
              height: 277px;
              box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
            "
          >
            <el-col>
              <span style="display:flex;margin:5px"><el-tag color="#1B65B9" style="align-self:center"></el-tag>主题概览</span>
            </el-col>
            <el-col :span="6" :offset="6" style="padding-top: 80px;">
              <el-form-item label="主题概览/个">
                <!-- <span>{{ 10 }}人</span> -->
              </el-form-item>
              <span style="font-size:24px">{{this.datas.bizSbjInfoCount}}</span>
            </el-col>
            <!-- <el-col :span="2" style="text-align:center"><i class="el-icon-share"></i></el-col> -->
            <el-col :span="6" style="padding-top: 80px;">
              <el-form-item label="相关指标/个">
                <!-- <span>{{ 10 }}人</span> -->
              </el-form-item>
              <span style="font-size:24px">{{this.datas.bizKpiInfoCount}}</span>
            </el-col>
          </el-row>
          <el-row
            style="height: 502px; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3)"
          >
            <el-col :span="6">
              <span style="display:flex;margin:5px"><el-tag color="#1B65B9" style="align-self:center"></el-tag>主题类型</span>
            </el-col>
            <el-col :span="4" :offset="14" style="text-align:right;margin-top:5px"
              ><router-link to="/listOfTopics"
                ><span style="font-size: 13px; color: #1964b9"
                  >查看详情 >></span
                ></router-link
              ></el-col
            >
            <el-col>
              <el-button
                v-for="item in datatype"
                :key="item.label"
                :style="buttonType()"
                effect="dark"
                style="margin:5px"
              >
                {{ item.bizSbjName }}
              </el-button>
            </el-col>
          </el-row>
        </el-col>
        <el-col
          :span="11"
          :offset="1"
          style="height:790px; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3)"
        >
          <el-row>
            <el-col :span="6">
              <span style="display:flex;margin:5px"><el-tag color="#1B65B9" style="align-self:center"></el-tag>主题概览</span>
            </el-col>
            <el-col :span="4" :offset="14" style="text-align:right;margin-top:5px"
              ><router-link to="/theIndexList"
                ><span style="font-size: 13px; color: #1964b9"
                  >查看详情 >></span
                ></router-link
              ></el-col
            >
            <el-col
              ><div id="main" style="width: 100%; height: 280px;margin-bottom:30px"></div
            ></el-col>
            <el-col>
              <div class="tet">
              <el-button
                v-for="item in databig"
                :key="item.label"
                type="text"
                :class="tagclass()"
                effect="dark"
              >
                {{ item.bizDimName }}
              </el-button>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { percentage, selectAll, bizdiminfo } from '@/api/oms/new'
let echarts = require("echarts");
export default {
  name: "screeningOfMonitoringIndicators",
  created() {
    this.getDataList();
  },
  data() {
    return {
      datas: [],
      datatype: [],
      databig: [],
      items: [
        { type: "primary", label: "业务总体经办情况监测" },
        { type: "success", label: "定点医疗机构住院基本指标分析监测" },
        { type: "warning", label: "定点医疗机构住院基本指标分析监测" },
        { type: "danger", label: "定点医疗机构住院基本指标分析监测" },
        { type: "info", label: "定点医疗机构住院基本指标分析监测" },
      ],
      charts: "",
      // opinion: ["实施指标", "非实时指标"],
      // opinionData: [
      //   { value: 335, name: "实施指标" },
      //   { value: 210, name: "非实时指标" },
      // ],
    };
  },
  methods: {
    getDataList() {
      this.dataListLoading = true;
      let params = {
        
      };
      percentage(params)
        .then(({ data }) => {
          if (data && data.dataList != "") {
            console.log(data, "data1");
            this.datas = data;
            this.drawPie("main");
          } else {
            this.dataList = [];
          }
          console.log(this.datas,"datas")
        })
        .catch((e) => {
          console.log(e);
        });
      selectAll()
        .then(({ data }) => {
          if (data && data.dataList != "") {
            console.log(data, "data1");
            this.datatype = data;
            // this.drawPie("main");
          } else {
            this.datatype = [];
          }
          // console.log(this.datas,"datas")
        })
        .catch((e) => {
          console.log(e);
        });
      bizdiminfo()
        .then(({ data }) => {
          if (data && data.dataList != "") {
            console.log(data, "data3");
            this.databig = data;
            // this.drawPie("main");
          } else {
            this.databig = [];
          }
          // console.log(this.datas,"datas")
        })
        .catch((e) => {
          console.log(e);
        });
    },
    drawPie(id) {
      console.log(id);
      this.charts = echarts.init(document.getElementById(id));
      console.log(this.charts);
      this.charts.setOption({
        tooltip: {
          trigger: "item",
        },
        legend: {
          // orient: "vertical",
          // x: "center",
          // y: "bottom",
          bottom: 10,
          left: "center",
          data: ["实施指标 "+this.datas.realTime+"个 "+this.datas.realTimePercentage,"非实施指标 "+this.datas.nonrealTime+"个 "+this.datas.nonrealTimePercentage],
          // data: this.opinion,
        },
        series: [
          {
            name: "指标",
            type: "pie",
            radius: "55%",
            center: ["50%", "30%"],
            // roseType: "radius",
            avoidLabelOverlap: false,
            label: {
              normal: {
                formatter: '{d}%',
                position: 'inner'
                // show: false,
                // position: "center",
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "blod",
                },
              },
            },
            itemStyle: {
              // 此配置
              normal: {
                borderWidth: 4,
                borderColor: "#ffffff",
                
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              { value: this.datas.realTime, name: "实施指标 "+this.datas.realTime+"个 "+this.datas.realTimePercentage },
              { value: this.datas.nonrealTime, name: "非实施指标 "+this.datas.nonrealTime+"个 "+this.datas.nonrealTimePercentage },
            ],
            color: ["#1964B9", "#2DC0C0"],
          },
        ],
      });
    },
    buttonType(){
      const random = Math.ceil(Math.random()*5);
      // console.log(random,"random")
      if(random == 1){
        // return "primary"
        return "color:#F66B6C;border-color:#F66B6C;background-color:#FEF1F0"
      }
      if(random == 2){
        // return "success"
        return "color:#1B65B9;border-color:#1B65B9;background-color:#DCE7F5"
      }
      if(random == 3){
      //  return "warning"
        return "color:#4BBF6C;border-color:#4BBF6C;background-color:#E9F6E2"
      }
      if(random == 4){
      //  return "danger"
        return "color:#A06FE6;border-color:#A06FE6;background-color:#F3EAFF"
      }
      if(random == 5){
      //  return "info"
        return "color:#F2AF49;border-color:#F2AF49;background-color:#FCF1E2"
      }
   },
   tagclass(){
     const random1 = Math.ceil(Math.random()*14);
     if(random1 == 1){
        return "tags1"
      }
      if(random1 == 2){
        return "tags2"
      }
      if(random1 == 3){
       return "tags3"
      }
      if(random1 == 4){
       return "tags4"
      }
      if(random1 == 5){
       return "tags5"
      }
      if(random1 == 6){
        return "tags6"
      }
      if(random1 == 7){
        return "tags7"
      }
      if(random1 == 8){
       return "tags8"
      }
      if(random1 == 9){
       return "tags9"
      }
      if(random1 == 10){
       return "tags10"
      }
      if(random1 == 11){
       return "tags11"
      }
      if(random1 == 12){
       return "tags12"
      }
      if(random1 == 13){
       return "tags13"
      }
      if(random1 == 14){
       return "tags14"
      }
   }
  },
  //调用
  mounted() {
    // this.$nextTick(function () {
    //   this.drawPie("main");
    // });
  },
};
</script>

<style scoped>
/* .el-row {
  margin-bottom: 11px;
} */
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
.tet{width: 88%; text-align: center;margin: 0 auto;overflow: hidden;height: 385px;}
.tags0{color:#030; font-weight:bold; font-size:18px;opacity:.33} 
.tags1{color:#C00; font-size:24px;opacity:.5;margin: 12px 16px;} 
.tags2{color:#030; font-size:16px;opacity:.39;margin-right:100px ;} 
.tags3{color:#00F;opacity:.2;margin-left: 96px 33px;} 
.tags4{ font-size:16px;margin-left: 10px;} 
.tags5{color:#C00; font-size:20px;opacity:.5; margin: 55px;} 
.tags6{color:#F06; font-size:20px;opacity:.7;margin-left: 30px;} 
.tags7{color:#030; font-weight:bold; font-size:18px;opacity:.33;margin-right: 53px;} 
.tags8{color:#F06; font-weight:bold;opacity:.8;margin-left: 5px;} 
.tags9{color:#C00; font-weight:bold;font-size:16px;opacity:.5;margin-left: 23px;} 
.tags10{color:#090; font-weight:bold;font-size:18px;opacity:.9;margin-right: 9px;} 
.tags11{color:#09F;opacity:.2;margin: 11px;} 
.tags12{color:#F90;font-size:14px;margin-left: 3px;}
.tags13{color:#FF8147; font-weight:bold;opacity:.39;margin-left: 5px;} 
.tags14{color:#468EF0; font-weight:bold;opacity:.39;margin-left: 5px;} 
</style>
