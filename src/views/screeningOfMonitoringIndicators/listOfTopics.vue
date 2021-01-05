<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="主题列表" name="first">
        <el-table
          :data="dataList"
          border
          v-loading="dataListLoading"
          @selection-change="selectionChangeHandle"
          style="width: 100%;"
          :header-cell-style="{background:'#F0F2F5'}">
          <el-table-column
            type="index"
            :index="indexMethod"
            header-align="center"
            align="center"
            width="50"
            label="序号"
          ></el-table-column>
          <el-table-column
            prop="bizSbjName"
            width="200" show-overflow-tooltip
            header-align="center"
            align="center"
            label="业务主题"
          ></el-table-column>
          <el-table-column
            prop="bizKpiNumber"
            width="120" show-overflow-tooltip
            header-align="center"
            align="center"
            label="相关指标数"
          ></el-table-column>
          <el-table-column
            prop="bizSbjDscr"
            header-align="center"
            align="center"
            label="主题介绍"
          ></el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalPage">
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { bizsbjinfo } from "@/api/oms/new" ;
export default {
name: "listOfTopics",
created() {
    this.getDataList();
  },
  data() {
    return {
      dataList:[],
      dataListLoading: false,
      activeName: 'first',
      currentPage4:1,
      totalPage: 0,
      pageIndex: 1,
      pageSize: 10,
    }
  },
  methods : {
    getDataList(){
      this.dataListLoading = true;
      let params = {
        pageSize: this.pageSize,
        currentPage: this.pageIndex,
      };
      bizsbjinfo(params)
        .then(({ data }) => {
          if (data && data.dataList != "") {
            console.log(data,"data")
            this.dataList = data.dataList;
            this.totalPage = data.totalCount;
          } else {
            this.dataList = [];
            this.totalPage = 0;
          }
          this.dataListLoading = false;
        })
        .catch(e => {
          console.log(e);
          this.dataListLoading = false;
        });

    },
    indexMethod(index) {
      return index + 1 + (this.pageIndex - 1) * this.pageSize;
    },
    handleCurrentChange() {

    },
    handleSizeChange() {

    },
    selectionChangeHandle() {

    }
  }
}
</script>

<style scoped>
.el-pagination {
    text-align: right; 
}
</style>
