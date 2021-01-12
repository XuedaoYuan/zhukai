<template>
  <div class="container">
    <el-row type="flex" align="middle">
      <label class="title">来源类型</label>
      <el-select v-model="sourceType">
        <el-option
          v-for="item in sourceTypeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-row>
    <div v-show="sourceType === '指标库导入'">
      <el-row type="flex" align="middle">
        <label class="title">主题</label>
        <el-select v-model="sourceType">
          <el-option
            v-for="item in sourceTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-row>
      <el-row type="flex" align="middle">
        <label class="title">指标库</label>
        <el-select v-model="sourceType">
          <el-option
            v-for="item in sourceTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-row>
    </div>
    <div v-show="sourceType === '静态数据'">
      <el-input
        type="textarea"
        :rows="30"
        v-model="staticData"
      >
      </el-input>
    </div>
  </div>
</template>
<script>
import _attempt from "lodash/attempt";
import _isError from "lodash/isError";
export default {
  name: "DataConfig",
  props: ["data"],
  data() {
    return {
      sourceType: "指标库导入",
      sourceTypeOptions: [
        {
          value: "指标库导入",
          label: "指标库导入",
        },
        {
          value: "静态数据",
          label: "静态数据",
        },
        {
          value: "自定义 API",
          label: "自定义 API",
        },
      ],
    };
  },
  computed: {
    staticData: {
      get() {
        return JSON.stringify(this.data || {}, undefined, 4);
      },
      set(val) {
        const parseData = _attempt(() => JSON.parse(val));
        if (_isError(parseData)) {
          this.$message({
            showClose: true,
            message: "格式输入不正确",
            type: "warning",
          });
        } else {
          // console.log("val ==> ", parseData);
          this.$emit("staticDataChange", parseData);
        }
      },
    },
  },
  mounted() {
    console.log("%c data ==> ", "color: red", this.data);
  },
  methods: {
    // handleStaticDataChange(val) {
    //   console.log("data ==> ", val);
    // },
  },
};
</script>
<style scoped lang="stylus">
.container {
  padding: 10px;

  .title {
    width: 48px;
    height: 12px;
    font-size: 12px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #9AB4CE;
    line-height: 12px;
    margin-right: 6px;
    flex-shrink: 0;
  }

  /deep/ .el-row {
    margin-bottom: 10px;

    .el-input__inner {
      color: #9AB4CE;
      background: transparent;
    }
  }

  /deep/ .el-textarea__inner {
    color: #9AB4CE;
    background: transparent;
  }
}
</style>
