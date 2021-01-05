<template>
  <div>
    <div style="margin-top:20px">
      <el-form label-width="90px" :model="dataForm">
        <el-row>
          <el-col :span="8">
            <el-form-item label="模块:">
              <el-input size="mini" v-model="dataForm.modu"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="起始时间">
              <el-date-picker
                v-model="dataForm.acssTime"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd HH:mm:ss"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="4" style="text-align: right;">
            <el-button type="" size="mini" @click="rest()">重置</el-button>
            <el-button type="primary" icon="el-icon-search" @click="searchDataList()" >查询</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-button @click="toggleSelection">反选</el-button>
          </el-col>
          <el-col span="6" :offset="12" style="text-align: right;">
            <el-button type="primary" @click="exportXlsxFn">导出Excel</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div style="margin-bottom:10px">
     
    </div>
    <div>
      <el-table
        ref="multipleTable"
        :data="dataList"
        border
        v-loading="dataListLoading"
        @selection-change="selectionChangeHandle"
        style="width: 100%"
        :header-cell-style="{background:'#F0F2F5'}"
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
    <form :action="exportUrl" method="post" target="_self" style="display:none;">
      <input name="modu" v-model="dataForm.modu" />
      <input name="acssTime" v-model="dataForm.acssTime" />
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
      totalNumber: Number,
      dataList: [],
      Arr:[],
      dataForm: {
        modu: "",
        acssTime: "",
      },
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
        modu: this.dataForm.modu,
        acssTime: this.dataForm.acssTime,
        pageSize: this.pageSize,
        currentPage: this.pageIndex,
      };
      loginfo(params)
        .then(({ data }) => {
          if (data && data.dataList != "") {
            console.log(this, "data");
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
    toggleSelection (Arr) {
      this.$nextTick(()=> {
        console.log(this)
        this.dataList.forEach((item,index) =>{
          this.$refs.multipleTable.toggleRowSelection(this.dataList[index])
        })
      })
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
    selectionChangeHandle(val) {
      this.Arr = val
    },
  },
};
</script>

<style scoped>
.el-pagination {
    text-align: right; 
}
</style>
