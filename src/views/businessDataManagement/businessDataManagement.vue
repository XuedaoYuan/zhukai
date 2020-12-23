<template>
  <div>
    <div style="margin-bottom: 20px; margin-left: 20px;text-align: left">
      <el-button type="primary" size="mini" @click="addOrUpdateHandle()">新增</el-button>
      <el-button type="info" size="mini">删除</el-button>
    </div>
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
        width="100" show-overflow-tooltip
        header-align="center"
        align="center"
        label="数据源名称"
      ></el-table-column>
      <el-table-column
        prop="No"
        width="80" show-overflow-tooltip
        header-align="center"
        align="center"
        label="来源"
      ></el-table-column>
      <el-table-column
        prop="merchantItemNo"
        width="100" show-overflow-tooltip
        header-align="center"
        align="center"
        label="数据源类型"
      ></el-table-column>
      <el-table-column
        prop="merchantItemNo"
        width="100" show-overflow-tooltip
        header-align="center"
        align="center"
        label="所属项目组"
      ></el-table-column>
      <el-table-column
        prop="merchantItemNo"
        width="200" show-overflow-tooltip
        header-align="center"
        align="center"
        label="IP"
      ></el-table-column>
      <el-table-column
        prop="merchantItemNo"
        width="100" show-overflow-tooltip
        header-align="center"
        align="center"
        label="端口号"
      ></el-table-column>
      <el-table-column
        prop="merchantItemNo"
        width="150" show-overflow-tooltip
        header-align="center"
        align="center"
        label="数据库名"
      ></el-table-column>
      <el-table-column
        prop="merchantItemNo"
        header-align="center"
        align="center"
        label="表名"
      ></el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="200"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click.native.prevent="addOrUpdateHandle(scope.row)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.jobId)">测试</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form label-width="90px" :model="sizeForm">
        <el-row>
          <el-col>
            <el-form-item label="数据源名称">
              <el-input size="mini" v-model="sizeForm.sch"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="来源">
              <el-input size="mini" v-model="sizeForm.sch"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="数据源类型">
              <el-input size="mini" v-model="sizeForm.sch"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="所属项目组">
              <el-input size="mini" v-model="sizeForm.sch"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="IP">
              <el-input size="mini" v-model="sizeForm.sch"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="端口号">
              <el-input size="mini" v-model="sizeForm.sch"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="数据库名">
              <el-input size="mini" v-model="sizeForm.sch"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="SCHRMA">
              <el-input size="mini" v-model="sizeForm.sch"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">重 置</el-button>
    <el-button type="primary" @click="dialogVisible = false">保 存</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
const mock = [
  {merchantItemNo:1,NO:11,sch:"wode"},
  {merchantItemNo:2},

]
const mock1 ={
  sch:1
}
export default {
name: "businessDataManagement",
  data(){
    return {
      dataList: mock,
      dataListLoading: false,
      dialogVisible: false,
      sizeForm: {},
    }
  },
  methods : {
    add() {
      // this.sizeForm = mock1,
      this.dialogVisible = true
    },
    addOrUpdateHandle(jobId){
      if(!jobId){
        jobId = ''
      }
      this.sizeForm = jobId,
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped>

</style>
