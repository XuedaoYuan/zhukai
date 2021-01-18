<template>
  <div class="fundamental-demo">
    <div>
      <div style="height:50px">
      <el-breadcrumb separator="/" class="breadcrumbder">
        <el-breadcrumb-item><b>指标管理</b></el-breadcrumb-item>
        <el-breadcrumb-item :to="{path: '/screeningOfMonitoringIndicators'}">监测指标筛选</el-breadcrumb-item>
        <el-breadcrumb-item>指标列表</el-breadcrumb-item>
      </el-breadcrumb></div>
      <el-divider></el-divider>
      <el-form label-width="110px" style="margin-top: 20px" :model="dataForm">
        <el-row type="flex" :gutter="20">
          <el-col :span="8">
            <el-form-item label="指标名称/编码:">
              <el-input
                v-model="dataForm.bizKpiName"
                clearable
                size="mini"
                placeholder=""
                prefix-icon="el-icon-search"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="相关主题">
              <el-select size="mini" v-model="dataForm.bizSbjName">
                <el-option
                  v-for="option in bizSbjNameList"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          
        </el-row>
        <el-row style="margin-top: 10px">
          <!-- <el-col :span="10" style="margin-left: 20px;text-align: left">
            <el-button style="width: 70px" type="success" size="mini">新增</el-button>
          </el-col> -->
          <el-col :span="8">
            <el-form-item label="实时性">
              <el-select size="mini" v-model="dataForm.rtFlag">
                <el-option
                  v-for="option in rtFlagList"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="10" style="text-align: right">
            <el-button type="" size="mini" @click="rest()">重置</el-button>
            <el-button
              style="width: 70px"
              type="primary"
              size="mini"
              @click="searchDataList()"
              >查询</el-button
            >
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%; margin-top: 20px"
      :header-cell-style="{background:'#F0F2F5'}"
    >
      <el-table-column
        type="index"
        :index="indexMethod"
        header-align="center"
        align="center"
        width="50"
        label="序号"
      ></el-table-column>
      <el-table-column
        prop="bizKpiCodg"
        width="150"
        show-overflow-tooltip
        header-align="center"
        align="center"
        label="指标编码"
      ></el-table-column>
      <el-table-column
        prop="bizKpiName"
        header-align="center"
        align="center"
        label="指标名称"
      ></el-table-column>
      <el-table-column
        prop="rtFlag"
        width="100"
        show-overflow-tooltip
        header-align="center"
        align="center"
        label="实时性"
      >
        <template slot-scope="scope">
          <span
            v-for="option in rtFlagList"
            :key="option.value"
            v-show="scope.row.rtFlag === option.value"
            disable-transitions
            >{{ option.label }}</span
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="bizSbjInfoDTOList"
        width="200"
        show-overflow-tooltip
        header-align="center"
        align="center"
        label="相关主题"
      ></el-table-column>
      <el-table-column
        prop="bizDimInfoDTOList"
        width="200"
        show-overflow-tooltip
        header-align="center"
        align="center"
        label="维度"
      ></el-table-column>
      <el-table-column
        prop="updtTime"
        header-align="center"
        align="center"
        label="更新时间"
      ></el-table-column>
      <!-- <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="200"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click.native.prevent="addOrUpdateHandle(scope.row)">修改</el-button>
          <el-button type="text" size="small" @click="Handle(scope.row.jobId)">详情</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalPage"
      style="margin-right:10px"
    >
    </el-pagination>
  </div>
</template>

<script>
import { bizkpiinfo } from "@/api/oms/new";
import { Breadcrumb, BreadcrumbItem, Divider } from 'element-ui'

export default {
  name: "theIndexList",
  components: {
    "el-breadcrumb": Breadcrumb,
    "el-breadcrumb-item": BreadcrumbItem,
    "el-divider": Divider,
  },
  created() {
    this.getDataList();
  },
  data() {
    return {
      dataList: [],
      arr: {},
      arr1: {},
      dataForm: {
        bizKpiName: "",
        bizSbjName: "",
        rtFlag: "",
      },
      rtFlagList: [
        {
          value: "1",
          label: "实时",
        },
        {
          value: "2",
          label: "非实时",
        },
      ],
      bizSbjNameList: [
        {
          value: "1",
          label: "业务总体经办情况监测",
        },
        {
          value: "10",
          label: "三医费用结构分析监测",
        },
        {
          value: "2",
          label: "公共服务情况监测",
        },
        {
          value: "4",
          label: "药品与医用耗材使用排名",
        },
        {
          value: "5",
          label: "定点医疗机构住院基本指标分析监测",
        },
        {
          value: "3",
          label: "定点医药机构结算情况监测",
        },
        {
          value: "9",
          label: "异地就医情况监测",
        },
        {
          value: "8",
          label: "门诊慢特病分析监测",
        },
        {
          value: "6",
          label: "DRGs指标分析评价",
        },
        {
          value: "7",
          label: "住院单病种分析监测",
        },
      ],
      dataListLoading: false,
      currentPage4: 1,
      totalPage: 0,
      pageIndex: 1,
      pageSize: 10,
    };
  },
  methods: {
    getDataList() {
      this.dataListLoading = true;
      let params = {
        bizKpiCodg: this.dataForm.bizKpiName,
        bizKpiName: this.dataForm.bizKpiName,
        bizSbjId: this.dataForm.bizSbjName,
        rtFlag: this.dataForm.rtFlag,
        pageSize: this.pageSize,
        currentPage: this.pageIndex,
      };
      bizkpiinfo(params)
        .then(({ data }) => {
          if (data && data.dataList != "") {
            console.log(data, "data");
            this.dataList = data.dataList;
            var net = [];
            var nets = [];
            var newNum = this.dataList.map((ele, index) => {
              var arrs = [];
              var arrss = [];
              console.log(ele, index, "index");
              ele.bizDimInfoDTOList.map((el, inde) => {
                console.log(el, inde, "111inde");
                arrs.push(el.bizDimName);
                // arrs.unshift(arrs[inde]);
              });
              net[index] = arrs;
              this.dataList[index].bizDimInfoDTOList = net[index].join()
              console.log(this.dataList)
              ele.bizSbjInfoDTOList.map((le, indx) => {
                console.log(le, indx, "le");
                arrss.push(le.bizSbjName);
                // arrs.unshift(arrs[inde]);
              });
              nets[index] = arrss;
              this.dataList[index].bizSbjInfoDTOList = nets[index].join()
            });
            // console.log(arrs, "arrs");
            // this.arr = arrs.join()
            // this.arr1 = arrss.join()
            this.totalPage = data.totalCount;
          } else {
            this.dataList = [];
            this.totalPage = 0;
          }
          this.dataListLoading = false;
        })
        .catch((e) => {
          console.log(e);
          this.dataListLoading = false;
        });
    },
    indexMethod(index) {
      return index + 1 + (this.pageIndex - 1) * this.pageSize;
    },
    searchDataList() {
      (this.pageIndex = 1), this.getDataList();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getDataList();
    },
    rest() {
      this.dataForm = {
        bizKpiName: "", 
        bizSbjName: "", 
        rtFlag: "",
      }
    },
    selectionChangeHandle() {},
  },
};
</script>

<style scoped>
.el-pagination {
    text-align: right; 
}
.breadcrumbder {
  /* height: 50px; */
  line-height: 50px;
}
</style>
