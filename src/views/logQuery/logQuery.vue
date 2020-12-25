<template>
  <div>
    <div>
      <el-form label-width="90px" :model="dataForm">
        <el-row>
          <el-col :span="8">
            <el-form-item label="模块菜单:">
              <el-select size="mini" v-model="dataForm.modu"></el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="起始时间">
              <el-date-picker
                v-model="dataForm.acssTime"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="2" style="text-align: right; margin-right: 10px">
            <el-button type="" size="mini" @click="rest()">重置</el-button>
            <el-button type="primary" icon="el-icon-search" @click="searchDataList()" >查询</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div>
      <el-table
        :data="dataList"
        border
        v-loading="dataListLoading"
        @selection-change="selectionChangeHandle"
        style="width: 100%"
      >
        <el-table-column
          type="selection"
          fixed="left"
          header-align="center"
          align="center"
          width="50"
        ></el-table-column>
        <el-table-column
          prop="modu"
          width="200"
          show-overflow-tooltip
          header-align="center"
          align="center"
          label="模块"
        ></el-table-column>
        <el-table-column
          prop="name"
          width="100"
          show-overflow-tooltip
          header-align="center"
          align="center"
          label="姓名"
        ></el-table-column>
        <el-table-column
          prop="acssTime"
          width="250"
          show-overflow-tooltip
          header-align="center"
          align="center"
          label="访问时间"
        ></el-table-column>
        <el-table-column
          prop="ipAddr"
          width="200"
          show-overflow-tooltip
          header-align="center"
          align="center"
          label="IP地址"
        ></el-table-column>
        <el-table-column
          prop="oprt"
          width="150"
          show-overflow-tooltip
          header-align="center"
          align="center"
          label="操作"
        ></el-table-column>
        <el-table-column
          prop="memo"
          header-align="center"
          align="center"
          label="备注"
        ></el-table-column>
      </el-table>
    </div>
    <div>
      <el-button>反选</el-button>
      <el-button @click="exportXlsxFn">导出Excel</el-button>
      <el-button>关闭</el-button>
    </div>
    <form :action="exportUrl" method="post" target="_self" style="display:none;">
      <input name="settlementPaymentDays" v-model="settlementPaymentDays" />
      <input name="token" v-model="token" />
      <button type="submit" id="export">立即创建</button>
    </form>
  </div>
</template>

<script>
import { loginfo } from "@/api/oms/new";
import { DatePicker } from "element-ui";

export default {
  name: "logQuery",
  components: {
    "el-date-picker": DatePicker,
  },
  data() {
    return {
      settlementPaymentDays:"",
      exportUrl: "/oms/web/manage/loginfo/exportExcel",
      token: sessionStorage.getItem("token"),
      value1: "",
      dataList: [],
      dataForm: {
        modu: "",
        acssTime: "",
      },
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
        modu: this.dataForm.modu,
        acssTime: this.dataForm.acssTime,
        pageSize: this.pageSize,
        currentPage: this.pageIndex,
      };
      loginfo(params)
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
    rest() {
      this.dataForm = {
        modu: "",
        acssTime: "",
      }
    },
    exportXlsxFn() {
        let dom = document.getElementById("export");
        dom.click();
    },
    searchDataList() {
      (this.pageIndex = 1), this.getDataList();
    },
  },
};
</script>

<style scoped>
</style>
