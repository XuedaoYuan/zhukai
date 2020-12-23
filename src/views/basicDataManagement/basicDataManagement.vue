<template>
  <div>
    <div>
      <div style="margin-bottom: 20px; margin-left: 20px; text-align: left">
        <el-button type="primary" size="mini" @click="addOrUpdateHandle()"
          >新增</el-button
        >
        <el-button
          type="info"
          size="mini"
          :disabled="dataListSelections.length <= 0"
          @click="deleteHandle()"
          >删除</el-button
        >
      </div>
    </div>
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
        prop="dsName"
        width="100"
        show-overflow-tooltip
        header-align="center"
        align="center"
        label="数据源名称"
      ></el-table-column>
      <el-table-column
        prop="soucType"
        width="80"
        show-overflow-tooltip
        header-align="center"
        align="center"
        label="来源"
      ></el-table-column>
      <el-table-column
        prop="dsType"
        width="100"
        show-overflow-tooltip
        header-align="center"
        align="center"
        label="数据源类型"
      ></el-table-column>
      <el-table-column
        prop="dsIp"
        width="200"
        show-overflow-tooltip
        header-align="center"
        align="center"
        label="IP"
      ></el-table-column>
      <el-table-column
        prop="dsPort"
        width="100"
        show-overflow-tooltip
        header-align="center"
        align="center"
        label="端口号"
      ></el-table-column>
      <el-table-column
        prop="merchantItemNo"
        width="150"
        show-overflow-tooltip
        header-align="center"
        align="center"
        label="数据库名"
      ></el-table-column>
      <el-table-column
        prop="tabname"
        header-align="center"
        align="center"
        label="表名"
      ></el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="200"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.native.prevent="addOrUpdateHandle(scope.row)"
            >修改</el-button
          >
          <el-button type="text" size="small" @click="Handle(scope.row.jobId)"
            >测试</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible" width="30%">
      <el-form label-width="90px" :model="sizeForm">
        <el-row>
          <el-col>
            <el-form-item label="数据源名称">
              <el-input size="mini" v-model="sizeForm.dsName"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="来源">
              <el-input size="mini" v-model="sizeForm.soucType"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="数据源类型">
              <el-input size="mini" v-model="sizeForm.dsType"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="所属项目组">
              <el-input size="mini" v-model="sizeForm.sch"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="IP">
              <el-input size="mini" v-model="sizeForm.dsIp"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="端口号">
              <el-input size="mini" v-model="sizeForm.dsPort"></el-input>
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
        <el-button type="primary" @click="addSave()">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import { queryPage, save, deleteBatchById } from "@/api/oms/new";
const mock = [
  { merchantItemNo: 1 },
  { merchantItemNo: 2 },
  { merchantItemNo: 3 },
  { merchantItemNo: 4 },
  { merchantItemNo: 5 },
  { merchantItemNo: 6 },
  { merchantItemNo: 7 },
];
export default {
  name: "basicDataManagement",
  created() {
    this.getDataList();
  },
  methods: {
    getDataList() {
      this.dataListLoading = true;
      let params = {
        soucType: "基础数据",
        pageSize: this.pageSize,
        currentPage: this.pageIndex,
      };
      queryPage(params)
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
    //新增、修改
    addOrUpdateHandle(jobId) {
      if (!jobId) {
        jobId = this.sizeForm;
      }
      (this.sizeForm = jobId), (this.dialogVisible = true);
    },
    addSave() {
      let params = this.sizeForm;
      save(params);
      this.dialogVisible = false;
    },
    // 多选
    selectionChangeHandle(val) {
      this.dataListSelections = val;
      for (let i = 0; i < val.length; i++) {
        if (val[i].settlementStatus != 1) {
          this.submitBoo = true;
          break;
        } else {
          this.submitBoo = false;
        }
      }
    },
    // 删除
    deleteHandle(id) {
      const ids = id
        ? [id]
        : this.dataListSelections.map((item) => {
            return item.basDataInfoId;
          });
      this.$confirm(`您确定要删除吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteBatchById(ids)
            .then(({ data }) => {
              if (data && data.status === 1 && data.data !== 0) {
                this.$message({
                  message: "操作成功",
                  type: "success",
                  duration: 1500,
                  onClose: () => {
                    this.getDataList();
                  },
                });
              } else if (data.data === 0) {
                this.$message.error("操作失败");
              }
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    Handle() {},
  },
  data() {
    return {
      dataList: [],
      dataListLoading: false,
      currentPage4: 4,
      sizeForm: {
        dsType: "",
        dsName: "",
        soucType: "",
        dsIp: "",
        dsPort: "",
      },
      dialogVisible: false,
      dataListSelections: [],
      submitBoo: true,
      pageIndex: 1,
      pageSize: 10,
    };
  },
};
</script>

<style scoped>
</style>
