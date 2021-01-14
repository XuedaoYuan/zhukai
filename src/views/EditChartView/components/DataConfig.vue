<template>
  <div class="container">
    <el-row type="flex"
            align="middle">
      <label class="title">来源类型</label>
      <el-select v-model="componentDataConfig.businessType">
        <el-option v-for="item in sourceTypeOptions"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
    </el-row>
    <div v-show="componentDataConfig.businessType === '指标库导入'">
      <el-row type="flex"
              align="middle">
        <label class="title">业务域</label>
        <el-select v-model="componentDataConfig.businessDomain">
          <el-option v-for="item in sourceTypeOptions"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-row>
      <el-row type="flex"
              align="middle">
        <label class="title">指标集</label>
        <el-select v-model="componentDataConfig.businessIndexSet">
          <el-option v-for="item in sourceTypeOptions"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-row>
      <div class="title param-add">参数配置<i class="el-icon-plus"
           @click.stop="handleAddBusinessParam"></i></div>
      <template v-if="componentDataConfig && componentDataConfig.businessParamList">
        <div class="api-param-row"
             v-for="(item, index) in componentDataConfig.businessParamList"
             :key="index">
          <el-input type="text"
                    :style="{marginRight: '10px'}"
                    class="api-url-param__input"
                    v-model="componentDataConfig.businessParamList[index]['key']"
                    placeholder="key"></el-input>
          <el-input type="text"
                    class="api-url-param__input"
                    v-model="componentDataConfig.businessParamList[index]['value']"
                    placeholder="value"></el-input>
          <i class="el-icon-delete"
             @click="handleDeleteBusinessParam(index)"></i>
        </div>
      </template>
    </div>
    <div v-show="componentDataConfig.businessType === '静态数据'">
      <el-input type="textarea"
                :rows="12"
                v-model="componentDataConfig.staticData">
      </el-input>
    </div>
    <div v-show="componentDataConfig.businessType === '自定义API'">
      <el-row type="flex"
              align="middle">
        <label class="title">API URL</label>
        <el-input v-model="componentDataConfig.apiUrl"
                  placeholder="请输入 API 地址"></el-input>
      </el-row>
      <div class="title param-add">参数配置<i class="el-icon-plus"
           @click.stop="handleAddUrlParam"></i></div>
      <template v-if="componentDataConfig && componentDataConfig.apiUrlParamList">
        <div class="api-param-row"
             v-for="(item, index) in componentDataConfig.apiUrlParamList"
             :key="index">
          <el-input type="text"
                    :style="{marginRight: '10px'}"
                    class="api-url-param__input"
                    v-model="componentDataConfig.apiUrlParamList[index]['key']"
                    placeholder="key"></el-input>
          <el-input type="text"
                    class="api-url-param__input"
                    v-model="componentDataConfig.apiUrlParamList[index]['value']"
                    placeholder="value"></el-input>
          <i class="el-icon-delete"
             @click="handleDeleteApiUrlParam(index)"></i>
        </div>
      </template>
    </div>
    <div class="save__container">
      <el-button v-if="componentDataConfig.businessType"
                 size="small"
                 type="primary"
                 :loading="saveLoading"
                 @click="handleSave">保存</el-button>
    </div>
  </div>
</template>
<script>
import _attempt from 'lodash/attempt';
import _isError from 'lodash/isError';
import cloneDeep from 'lodash/cloneDeep';
export default {
  name: 'DataConfig',
  props: {
    componentData: {
      type: Object,
      required: false,
      default: () => ({
        businessType: '', // 指标库导入、静态数据、自定义API
        /* 指标库导入 */
        businessDomain: '', // 业务域
        businessIndexSet: '', // 指标集
        businessParamList: [],
        /* 静态数据 */
        staticData: '', //  Array or Map 序列化的字符串
        /* 自定义API */
        apiUrl: '',
        apiUrlParamList: []
      })
    }
  },
  watch: {
    componentData: {
      handler: function (newData) {
        if (newData) {
          this.componentDataConfig = { ...newData };
        } else {
          this.componentDataConfig = {};
        }
      },
      deep: true
    }
  },
  data() {
    return {
      saveLoading: false,
      componentDataConfig: {
        businessType: '', // 指标库导入、静态数据、自定义API
        /* 指标库导入 */
        businessDomain: '', // 业务域
        businessIndexSet: '', // 指标集
        businessParamList: [],
        /* 静态数据 */
        staticData: '', //  Array or Map 序列化的字符串
        /* 自定义API */
        apiUrl: '',
        apiUrlParamList: []
      },
      sourceTypeOptions: [
        {
          value: '指标库导入',
          label: '指标库导入'
        },
        {
          value: '静态数据',
          label: '静态数据'
        },
        {
          value: '自定义API',
          label: '自定义API'
        }
      ]
    };
  },
  created() {
    if (this.componentData) {
      this.componentDataConfig = cloneDeep(this.componentData);
    } else {
      this.componentDataConfig = {};
    }
  },
  /* computed: {
    staticData: {
      get() {
        return JSON.stringify(this.data || {}, undefined, 4);
      },
      set(val) {
        const parseData = _attempt(() => JSON.parse(val));
        if (_isError(parseData)) {
          this.$message({
            showClose: true,
            message: '格式输入不正确',
            type: 'warning'
          });
        } else {
          // console.log("val ==> ", parseData);
          this.$emit('staticDataChange', parseData);
        }
      }
    }
  }, */
  mounted() {
    // console.log('%c data ==> ', 'color: red', this.data);
  },
  methods: {
    handleSave() {
      if (this.saveLoading) return;
      this.saveLoading = true;
      this.$emit('dataChange', this.componentDataConfig);
      setTimeout(() => {
        this.saveLoading = false;
      }, 1200);
    },
    /* 添加url api的参数 */
    handleAddUrlParam() {
      if (!this.componentDataConfig.apiUrlParamList) {
        this.componentDataConfig.apiUrlParamList = [];
      }
      this.componentDataConfig.apiUrlParamList.push({
        key: '',
        value: ''
      });
    },
    handleDeleteApiUrlParam(index) {
      this.componentDataConfig.apiUrlParamList.splice(index, 1);
    },
    handleAddBusinessParam() {
      if (!this.componentDataConfig.businessParamList) {
        this.componentDataConfig.businessParamList = [];
      }
      this.componentDataConfig.businessParamList.push({
        key: '',
        value: ''
      });
    },
    handleDeleteBusinessParam(index) {
      this.componentDataConfig.businessParamList.splice(index, 1);
    }
  }
};
</script>
<style scoped lang="stylus">
.container {
  padding: 10px;

  .title {
    width: 48px;
    font-size: 12px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #9AB4CE;
    line-height: 1;
    margin-right: 6px;
    flex-shrink: 0;
  }

  .param-add {
    width: 100%;

    i {
      padding: 0 10px;
      cursor: pointer;
    }
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

.save__container {
  padding-top: 16px;
  text-align: center;
}

.api-param-row {
  display: flex;
  align-items: center;
  margin-top: 10px;

  i {
    padding: 6px;
    font-size: 16px;
    color: red;
    cursor: pointer;
  }
}
</style>
