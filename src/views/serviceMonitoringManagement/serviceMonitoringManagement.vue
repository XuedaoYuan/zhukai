<template>
  <div class="fundamental-demo">
    <el-form label-width="90px" :model="dataForm">
      <el-row style="margin-top: 20px; height: 60px">
        <el-col :span="8" style="font-weight: bold">
          <el-form-item label="服务名称:">
            <el-input clearable size="mini" placeholder="服务名称" v-model="dataForm.servName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" style="font-weight: bold">
          <el-form-item label="组件类型:">
            <el-input clearable size="mini" placeholder="组件类型" v-model="dataForm.comtType"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="2" style="text-align:right">
            <el-button type="" size="mini" @click="rest()">重置</el-button>
          <el-button type="primary" @click="searchDataList()">查询</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="font-weight: bold">
        <el-col :span="6" :offset="2">
          <span class="fuwuicon"><img src="./img/f1.png" alt=""></span>
          <span class="fuwuName">服务接入数</span>
          <span class="fuwuNum" style="color:#333333">&nbsp;{{this.datas.servCountCnt}}</span>
        </el-col>
        <el-col :span="6" :offset="2">
          <span class="fuwuicon"><img src="./img/f2.png" alt=""></span>
          <span class="fuwuName">服务正常数</span>
          <span class="fuwuNum" style="color:#49C16D">&nbsp;{{this.datas.servNormalCnt}}</span>
        </el-col>
        <el-col :span="6" :offset="2">
          <span class="fuwuicon"><img src="./img/f3.png" alt=""></span>
          <span class="fuwuName">服务异常数</span>
          <span class="fuwuNum" style="color:#F56D6C">&nbsp;{{this.datas.servAbnormalCnt}}</span>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%; margin-top: 20px"
      :header-cell-style="{background:'#F0F2F5'}"
    >
      <el-table-column
        prop="servName"
        width="150"
        show-overflow-tooltip
        header-align="center"
        align="center"
        label="服务名称"
      ></el-table-column>
      <el-table-column
        prop="servAddr"
        header-align="center"
        align="center"
        label="服务地址"
      ></el-table-column>
      <el-table-column
        prop="servStas"
        width="150"
        show-overflow-tooltip
        header-align="center"
        align="center"
        label="服务状态"
      ></el-table-column>
      <el-table-column
        prop="servType"
        header-align="center"
        align="center"
        label="服务类型"
      ></el-table-column>
      <el-table-column
        prop="comtType"
        header-align="center"
        align="center"
        label="组件类型"
      ></el-table-column>
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
import { servmnitinfo, countCnt } from "@/api/oms/new";

export default {
  name: "serviceMonitoringManagement",
  data() {
    return {
      dataForm: {
        servName:"",
        comtType:"",
      },
      dataList: [],
      datas: [],
      dataListLoading: false,
      totalPage:0,
      currentPage4: 1,
      pageIndex: 1,
      pageSize: 10,
    };
  },

  created() {
    this.getDataList();
  },

  methods: {
    getDataList() {
      this.dataListLoading = true;
      let params = {
        servName: this.dataForm.servName,
        comtType: this.dataForm.comtType,
        pageSize: this.pageSize,
        currentPage: this.pageIndex,
      };
      countCnt()
        .then(({ data }) => {
          if (data && data != "") {
            console.log(data, "1");
            this.datas = data;
          } else {
            this.datas = [];
          }
        })
        .catch((e) => {
          console.log(e);
        });
      servmnitinfo(params)
        .then(({ data }) => {
          if (data && data.dataList != "") {
            console.log(data, "data");
            this.dataList = data.dataList;
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
    searchDataList() {
      this.pageIndex = 1,
      this.getDataList();
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
        comtType: "", 
        servName: "",
      }
    },
    selectionChangeHandle() {

    },
  }
};
</script>

<style scoped>
.el-pagination {
    text-align: right; 
}
.fuwuicon {
  width:70px;
  height:70px;
  margin-right:10px;
}
.fuwuName {
  position: absolute;
  top: 5px;
}
.fuwuNum {
  bottom:5px;
  position: absolute;
  font-size:24px;
}
</style>
