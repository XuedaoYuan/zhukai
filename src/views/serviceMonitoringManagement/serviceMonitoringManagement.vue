<template>
  <div>
    <el-form label-width="90px" :model="dataForm">
      <el-row style="margin-top: 20px; height: 60px">
        <el-col :span="6" style="font-weight: bold">
          <el-form-item label="服务名称:">
            <el-input clearable size="mini" placeholder="服务名称" v-model="dataForm.servName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" style="font-weight: bold">
          <el-form-item label="组件类型:">
            <el-input clearable size="mini" placeholder="组件类型" v-model="dataForm.comtType"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="6">
          <el-button @click="searchDataList()">查询</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="font-weight: bold">
        <el-col :span="8" :offset="2">
          服务接入数<span style="color: #2fd4cd">&nbsp;330</span>
        </el-col>
        <el-col :span="8" :offset="4">
          服务正常数<span style="color: #27bc20">&nbsp;265</span>
          服务异常数<span style="color: #cd250e">&nbsp;65</span>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      @cell-dblclick="viewData"
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
  </div>
</template>

<script>
import { servmnitinfo } from "@/api/oms/new";

export default {
  name: "serviceMonitoringManagement",
  data() {
    return {
      dataForm: {
        servName:"",
        comtType:"",
      },
      dataList: [],
      dataListLoading: false,
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
  }
};
</script>

<style scoped>
</style>
