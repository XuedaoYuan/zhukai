<template>
  <div>
    <div>
      <el-form label-width="90px" style="margin-top: 20px">
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
        <el-row style="margin-top: 10px">
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
        prop="bizKpiCodg"
        width="150" show-overflow-tooltip
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
        prop="bizDimName"
        width="200" show-overflow-tooltip
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
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="200"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click.native.prevent="addOrUpdateHandle(scope.row)">修改</el-button>
          <el-button type="text" size="small" @click="Handle(scope.row.jobId)">详情</el-button>
        </template>
      </el-table-column>
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
  </div>
</template>

<script>
import { bizkpiinfo } from "@/api/oms/new" ;

export default {
name: "theIndexList",
created() {
    this.getDataList();
  },
  data(){
    return {
      dataList:[],
      dataListLoading:false,
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
      bizkpiinfo(params)
        .then(({ data }) => {
          if (data && data.dataList != "") {
            console.log(data,"data")
            this.dataList = data.dataList;
            var newNum = this.dataList.map((ele, index) => {
            console.log(ele,index,"index")
            ele.bizDimInfoDTOList.map((el,inde) => {
              console.log(el,inde,"111inde")
            })
        })
            var arrs = []
            console.log(arrs,"arrs")
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
  }
}
</script>

<style scoped>

</style>
