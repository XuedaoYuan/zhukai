<template>
  <div>
    <div>
      <el-form label-width="110px" style="margin-top: 20px" :model="dataForm">
        <el-row type="flex" :gutter="20">
          <el-col :span="8">
            <el-form-item label="指标名称/编码:">
              <el-input
                v-model="dataForm.servName"
                clearable
                size="mini"
                placeholder=""
                prefix-icon="el-icon-search"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="相关主题">
              <el-select size="mini" v-model="dataForm.bizSbjName">
                <el-option
                  v-for="option in bizSbjNameList"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实时性">
              <el-select size="mini" v-model="dataForm.rtFlag">
                <el-option
                  v-for="option in rtFlagList"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <!-- <el-col :span="10" style="margin-left: 20px;text-align: left">
            <el-button style="width: 70px" type="success" size="mini">新增</el-button>
          </el-col> -->
          <el-col :span="10" :offset="20">
            <el-button
              style="width: 70px"
              type="primary"
              size="mini"
              @click="searchDataList()"
              >查询</el-button
            >
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column
        type="index"
        :index="indexMethod"
        header-align="center"
        align="center"
        width="50"
        label="序号"
      ></el-table-column>
      <el-table-column
        prop="bizKpiCodg"
        width="150"
        show-overflow-tooltip
        header-align="center"
        align="center"
        label="指标编码"
      ></el-table-column>
      <el-table-column
        prop="bizKpiName"
        header-align="center"
        align="center"
        label="指标名称"
      ></el-table-column>
      <el-table-column
        prop="rtFlag"
        width="100"
        show-overflow-tooltip
        header-align="center"
        align="center"
        label="实时性"
      >
        <template slot-scope="scope">
          <span
            v-for="option in rtFlagList"
            :key="option.value"
            v-show="scope.row.rtFlag === option.value"
            disable-transitions
            >{{ option.label }}</span
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="merchantItemNo"
        width="200"
        show-overflow-tooltip
        header-align="center"
        align="center"
        label="相关主题"
      ></el-table-column>
      <el-table-column
        prop="bizDimName"
        width="200"
        show-overflow-tooltip
        header-align="center"
        align="center"
        label="维度"
      ></el-table-column>
      <el-table-column
        prop="updtTime"
        header-align="center"
        align="center"
        label="更新时间"
      ></el-table-column>
      <!-- <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="200"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click.native.prevent="addOrUpdateHandle(scope.row)">修改</el-button>
          <el-button type="text" size="small" @click="Handle(scope.row.jobId)">详情</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalPage"
    >
    </el-pagination>
  </div>
</template>

<script>
import { bizkpiinfo } from "@/api/oms/new";

export default {
  name: "theIndexList",
  created() {
    this.getDataList();
  },
  data() {
    return {
      dataList: [],
      dataForm: {
        servName: "",
        bizSbjName: "",
        rtFlag: "",
      },
      rtFlagList: [
        {
          value: "1",
          label: "实时",
        },
        {
          value: "2",
          label: "非实时",
        },
      ],
      bizSbjNameList: [
        {
          value: 1,
          label: "实时",
        },
        {
          value: 0,
          label: "非实时",
        },
      ],
      dataListLoading: false,
      currentPage4: 1,
      totalPage: 0,
      pageIndex: 1,
      pageSize: 10,
    };
  },
  methods: {
    getDataList() {
      this.dataListLoading = true;
      let params = {
        bizSbjName: this.dataForm.bizSbjName,
        rtFlag: this.dataForm.rtFlag,
        pageSize: this.pageSize,
        currentPage: this.pageIndex,
      };
      bizkpiinfo(params)
        .then(({ data }) => {
          if (data && data.dataList != "") {
            console.log(data, "data");
            this.dataList = data.dataList;
            var arrs = [];
            var newNum = this.dataList.map((ele, index) => {
              console.log(ele, index, "index");
              ele.bizDimInfoDTOList.map((el, inde) => {
                console.log(el, inde, "111inde");
                arr.push(obj[inde]);
                arr.unshift(obj[inde]);
              });
            });
            console.log(arrs, "arrs");
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
    indexMethod(index) {
      return index + 1 + (this.pageIndex - 1) * this.pageSize;
    },
    searchDataList() {
      (this.pageIndex = 1), this.getDataList();
    },
    selectionChangeHandle() {},
    handleCurrentChange() {},
    handleSizeChange() {},
  },
};
</script>

<style scoped>
</style>
