<template>
  <div>
    <div>
      <el-form label-width="90px">
        <el-row type="flex" justify=end :gutter="20">
          <el-col :span="6">
            <el-button type="primary" size="mini" @click="dialogVisible = true">新增</el-button>
          </el-col>
          <el-col :span="10">
            <el-form-item label="相关主题:">
              <el-select size="mini"></el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实时性:">
              <el-select size="mini"></el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="指标名称:">
              <el-input clearable size="mini" placeholder="指标名称" suffix-icon="el-icon-search"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;"
    >
      <el-table-column
        prop="merchantItemNo"
        width="150" show-overflow-tooltip
        header-align="center"
        align="center"
        label="指标编码"
      ></el-table-column>
      <el-table-column
        prop="materialCode"
        width="150" show-overflow-tooltip
        header-align="center"
        align="center"
        label="指标名称"
      ></el-table-column>
      <el-table-column
        prop="materialName"
        width="100" show-overflow-tooltip
        header-align="center"
        align="center"
        label="实时性"
      ></el-table-column>
      <el-table-column
        prop="providerMaterialNo"
        header-align="center"
        align="center"
        width="260" show-overflow-tooltip
        label="相关主题"
      ></el-table-column>
      <el-table-column
        prop="storeName"
        width="100"
        header-align="center"
        align="center"
        label="配置阈值"
      ></el-table-column>
      <el-table-column
        prop="imagePath"
        header-align="center"
        align="center"
        label="配置渠道"
      ></el-table-column>
      <el-table-column
        prop="updateTime"
        header-align="center"
        align="center"
        label="配置日期"
        width="200" show-overflow-tooltip
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
    <el-dialog
      title="大屏指标配置管理新增"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form  label-width="90px">
        <el-row>
          <el-col>
            主题/指标设置
            <el-form-item label="相关主题:">
              <el-select size="mini"></el-select>
            </el-form-item>
            <el-form-item label="指标名称:">
              <el-select size="mini"></el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col>
            阈值设置
            <el-form-item label="阈值:">
              <el-input clearable size="mini" placeholder="阈值"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">保 存</el-button>
    <el-button @click="dialogVisible = false">取 消</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
name: "bigIndicators",
  data(){
    return {
      dataList: [],
      dataListLoading: false,
      currentPage4: 4,
      dialogVisible:false,
      radio:1,
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
