<template>
  <div>
    <el-form label-width="90px">
      <el-row>
        <el-col :span="8" style="font-weight: bold">
          <el-form-item label="服务名称:">
            <el-input clearable size="mini" placeholder="服务名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" style="font-weight: bold">
          <el-form-item label="组件类型:">
            <el-input clearable size="mini" placeholder="组件类型"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-button>查询</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="font-weight: bold">
        <el-col :span="8" style="border: 1px solid #000">
          服务接入数<span style="color: #2FD4CD">&nbsp;330</span>
        </el-col>
        <el-col :span="14">
          服务正常数<span style="color: #27BC20;">&nbsp;265</span>
          服务异常数<span style="color: #CD250E">&nbsp;65</span>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      @cell-dblclick="viewData"
      style="width: 100%;margin-top: 20px">
      <el-table-column
        prop="merchantItemNo"
        width="150" show-overflow-tooltip
        header-align="center"
        align="center"
        label="服务名称"
      ></el-table-column>
      <el-table-column
        prop="merchantItemNo"
        header-align="center"
        align="center"
        label="服务地址"
      ></el-table-column>
      <el-table-column
        prop="merchantItemNo"
        width="150" show-overflow-tooltip
        header-align="center"
        align="center"
        label="服务状态"
      ></el-table-column>
      <el-table-column
        prop="merchantItemNo"
        header-align="center"
        align="center"
        label="服务类型"
      ></el-table-column>
      <el-table-column
        prop="merchantItemNo"
        header-align="center"
        align="center"
        label="组件类型"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
name: "serviceMonitoringManagement",
  data(){
    return {
      dataList:[],
      dataListLoading:false,
    }
  }
}
</script>

<style scoped>

</style>
