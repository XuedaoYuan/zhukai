<template>
  <el-collapse-item class="title1-config"
                    title="标题">
    <el-row type="flex"
            justify="space-between">
      图标
      <el-checkbox v-model="config.titleIconShowStatus"
                   @change="handleChange">显示</el-checkbox>
    </el-row>
    <el-row>
      <el-input v-model="config.titleLabel"
                @change="handleChange"></el-input>
    </el-row>
    <el-row type="flex"
            align="middle">
      <el-color-picker show-alpha
                       v-model="config.titleColor"
                       @change="handleChange"></el-color-picker>
      <el-input-number :min="10"
                       :max="100"
                       :precision="0"
                       controls-position="right"
                       v-model="config.titleFontSize"
                       @change="handleChange"></el-input-number>
      <el-select v-model="config.titleFamily"
                 @change="handleChange">
        <el-option v-for="item in fontFamilyOptions"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value"></el-option>
      </el-select>
    </el-row>
    <el-row type="flex"
            align="middle">
      <el-checkbox-button v-model="config.titleFontWeight"
                          @change="handleChange"
                          true-label="bold"
                          false-label="normal">B</el-checkbox-button>
    </el-row>
  </el-collapse-item>
</template>

<script>
import {
  CollapseItem,
  Checkbox,
  ColorPicker,
  InputNumber,
  RadioGroup,
  RadioButton,
  CheckboxButton
} from 'element-ui';
import { fontFamilyOptions } from '@/views/EditChartView/constant.js';
export default {
  name: 'HeadTitle3Config',
  components: {
    'el-collapse-item': CollapseItem,
    'el-checkbox': Checkbox,
    'el-color-picker': ColorPicker,
    'el-input-number': InputNumber,
    'el-radio-group': RadioGroup,
    'el-radio-button': RadioButton,
    'el-checkbox-button': CheckboxButton
  },
  props: {
    componentConfig: {
      type: Object,
      required: true,
      default: () => ({
        // 标题的配置
        titleLabel: '医疗服务综合价格指数',
        titleColor: '#0DA2D2',
        titleFontSize: 14,
        titleFamily: 'sans-serif,Microsoft YaHei',
        titleFontWeight: 'normal',
        titleIconShowStatus: true
      })
    }
  },
  watch: {
    componentConfig: {
      handler: function (newConfig) {
        this.config = { ...this.componentConfig };
      },
      deep: true
    }
  },
  data() {
    return {
      fontFamilyOptions: fontFamilyOptions,
      config: {
        // 标题的配置
        titleLabel: '医疗服务综合价格指数',
        titleColor: '#0DA2D2',
        titleFontSize: 14,
        titleFamily: 'sans-serif,Microsoft YaHei',
        titleFontWeight: 'normal',
        titleIconShowStatus: true
      }
    };
  },
  created() {
    this.config = { ...this.componentConfig };
  },
  methods: {
    handleChange() {
      this.$emit('change', this.config);
    }
  }
};
</script>

<style scoped lang="stylus">
.title1-config {
  /deep/ .el-collapse-item__content {
    color: #b0cdeb;
  }

  /deep/ .el-input__inner {
    background: transparent;
    color: #b0cdeb;
  }

  /deep/ .el-row {
    margin-bottom: 10px;

    .el-input-number.is-controls-right .el-input__inner {
      padding-right: 40px;
    }

    >div {
      margin-right: 10px;

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
