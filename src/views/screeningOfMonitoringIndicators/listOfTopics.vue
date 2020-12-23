<template>
  <div>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      @cell-dblclick="viewData"
      style="width: 100%;">
      <el-table-column
        type="index"
        :index="indexMethod"
        header-align="center"
        align="center"
        width="50"
        label="序号"
      ></el-table-column>
      <el-table-column
        prop="merchantItemNo"
        width="200" show-overflow-tooltip
        header-align="center"
        align="center"
        label="业务主题"
      ></el-table-column>
      <el-table-column
        prop="merchantItemNo"
        width="120" show-overflow-tooltip
        header-align="center"
        align="center"
        label="相关指标数"
      ></el-table-column>
      <el-table-column
        prop="merchantItemNo"
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
      :total="40">
    </el-pagination>
  </div>
</template>

<script>
export default {
name: "listOfTopics",
  data() {
    return {
      dataList:[],
      dataListLoading: false,
    }
  },
  methods : {
    indexMethod(index) {
      return index + 1 + (this.pageIndex - 1) * this.pageSize;
    },
  }
}
</script>

<style scoped>

</style>
