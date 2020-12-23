<template>
  <div>
    <div>
      <el-form label-width="90px">
        <el-row  type="flex" :gutter="20">
          <el-col>
            <el-input clearable size="mini" placeholder="表名注释" prefix-icon="el-icon-search"></el-input>
          </el-col>
          <el-col>
            <el-form-item label="">
              <el-select size="mini"></el-select>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="">
              <el-select size="mini"></el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10" style="margin-left: 20px;text-align: left">
            <el-button style="width: 70px" type="success" size="mini">新增</el-button>
          </el-col>
          <el-col :span="10" style="margin-left: 20px;text-align: right">
            <el-button style="width: 70px" type="primary" size="mini">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      @cell-dblclick="viewData"
      style="width: 100%; margin-top: 20px">
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
        width="150" show-overflow-tooltip
        header-align="center"
        align="center"
        label="指标编码"
      ></el-table-column>
      <el-table-column
        prop="merchantItemNo"
        header-align="center"
        align="center"
        label="指标名称"
      ></el-table-column>
      <el-table-column
        prop="merchantItemNo"
        width="100" show-overflow-tooltip
        header-align="center"
        align="center"
        label="实时性"
      ></el-table-column>
      <el-table-column
        prop="merchantItemNo"
        width="200" show-overflow-tooltip
        header-align="center"
        align="center"
        label="相关主题"
      ></el-table-column>
      <el-table-column
        prop="merchantItemNo"
        width="200" show-overflow-tooltip
        header-align="center"
        align="center"
        label="维度"
      ></el-table-column>
      <el-table-column
        prop="merchantItemNo"
        header-align="center"
        align="center"
        label="更新时间"
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
name: "theIndexList",
  data(){
    return {
      dataList:[],
      dataListLoading:false,
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
