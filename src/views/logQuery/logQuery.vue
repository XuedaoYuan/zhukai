<template>
  <div>
    <div>
      <el-form label-width="90px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="模块菜单:">
              <el-select size="mini"></el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="起始时间">
              <el-date-picker
                v-model="value1"
                type="daterange"
                size="mini"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="14" style="text-align: right;margin-right: 10px">
            <el-button type="primary" icon="el-icon-search">查询</el-button>
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
        @cell-dblclick="viewData"
        style="width: 100%;">
        <el-table-column
          type="selection"
          fixed="left"
          header-align="center"
          align="center"
          width="50"
        ></el-table-column>
        <el-table-column
          prop="merchantItemNo"
          width="200" show-overflow-tooltip
          header-align="center"
          align="center"
          label="模块"
        ></el-table-column>
        <el-table-column
          prop="merchantItemNo"
          width="100" show-overflow-tooltip
          header-align="center"
          align="center"
          label="姓名"
        ></el-table-column>
        <el-table-column
          prop="merchantItemNo"
          width="250" show-overflow-tooltip
          header-align="center"
          align="center"
          label="访问时间"
        ></el-table-column>
        <el-table-column
          prop="merchantItemNo"
          width="200" show-overflow-tooltip
          header-align="center"
          align="center"
          label="IP地址"
        ></el-table-column>
        <el-table-column
          prop="merchantItemNo"
          width="150" show-overflow-tooltip
          header-align="center"
          align="center"
          label="操作"
        ></el-table-column>
        <el-table-column
          prop="merchantItemNo"
          header-align="center"
          align="center"
          label="备注"
        ></el-table-column>
      </el-table>
    </div>
    <div>
      <el-button>反选</el-button>
      <el-button>导出Excel</el-button>
      <el-button>关闭</el-button>
    </div>
  </div>
</template>

<script>
export default {
name: "logQuery",
  data() {
    return {
      value1:'',
      dataList: [],
      dataListLoading: false,
    }
  }
}
</script>

<style scoped>

</style>
