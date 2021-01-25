<template>
  <div>
    <el-collapse-item class="title1-config"
                      title="标题">
      <el-row type="flex"
              justify="space-between">
        标题
        <el-checkbox v-model="config.titleShowStatus"
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
                         :max="30"
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
    <el-collapse-item class="title1-config"
                      title="值">
      <el-row type="flex"
              justify="space-between">
        值
        <el-checkbox v-model="config.valueShowStatus"
                     @change="handleChange">显示</el-checkbox>
      </el-row>
      <el-row type="flex"
              align="middle">
        <el-color-picker show-alpha
                         v-model="config.valueColor"
                         @change="handleChange"></el-color-picker>
        <el-input-number :min="10"
                         :max="30"
                         :precision="0"
                         controls-position="right"
                         v-model="config.valueFontSize"
                         @change="handleChange"></el-input-number>
        <el-select v-model="config.valueFamily"
                   @change="handleChange">
          <el-option v-for="item in fontFamilyOptions"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value"></el-option>
        </el-select>
      </el-row>
      <el-row type="flex"
              align="middle">
        <el-checkbox-button v-model="config.valueFontWeight"
                            @change="handleChange"
                            true-label="bold"
                            false-label="normal">B</el-checkbox-button>
      </el-row>
    </el-collapse-item>
    <el-collapse-item class="title1-config"
                      title="单位">
      <el-row type="flex"
              justify="space-between">
        单位
        <el-checkbox v-model="config.unitShowStatus"
                     @change="handleChange">显示</el-checkbox>
      </el-row>
      <div>
         <el-input v-model="config.unitName"
                  @change="handleChange"></el-input>
      </div>
      <el-row type="flex"
              align="middle">
        <el-color-picker show-alpha
                         v-model="config.unitColor"
                         @change="handleChange"></el-color-picker>
        <el-input-number :min="10"
                         :max="30"
                         :precision="0"
                         controls-position="right"
                         v-model="config.unitFontSize"
                         @change="handleChange"></el-input-number>
        <el-select v-model="config.unitFamily"
                   @change="handleChange">
          <el-option v-for="item in fontFamilyOptions"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value"></el-option>
        </el-select>
      </el-row>
      <el-row type="flex"
              align="middle">
        <el-checkbox-button v-model="config.unitFontWeight"
                            @change="handleChange"
                            true-label="bold"
                            false-label="normal">B</el-checkbox-button>
      </el-row>
    </el-collapse-item>
  </div>
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
  name: 'LabelValue5Config',
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
        titleLabel: '评价数',
        titleColor: 'rgb(255, 255, 255)',
        titleFontSize: 14,
        titleFamily: 'sans-serif,Microsoft YaHei',
        titleFontWeight: 'normal',
        titleShowStatus: true,
        // 值的配置
        value: '23456',
        valueColor: '#87E7FF',
        valueFontSize: 20,
        valueFamily: 'sans-serif,Microsoft YaHei',
        valueFontWeight: 'bold',
        valueShowStatus: true,
        // 单位的配置
        unitName: '次',
        unitShowStatus: true,
        unitColor: '#53E2FF',
        unitFontSize: 12,
        unitFamily: 'sans-serif,Microsoft YaHei',
        unitFontWeight: 'bold'
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
        titleLabel: '评价数',
        titleColor: 'rgb(255, 255, 255)',
        titleFontSize: 14,
        titleFamily: 'sans-serif,Microsoft YaHei',
        titleFontWeight: 'normal',
        titleShowStatus: true,
        // 值的配置
        value: '23456',
        valueColor: '#87E7FF',
        valueFontSize: 20,
        valueFamily: 'sans-serif,Microsoft YaHei',
        valueFontWeight: 'bold',
        valueShowStatus: true,
        // 单位的配置
        unitName: '次',
        unitShowStatus: true,
        unitColor: '#53E2FF',
        unitFontSize: 12,
        unitFamily: 'sans-serif,Microsoft YaHei',
        unitFontWeight: 'bold'
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
