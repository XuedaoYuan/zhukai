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
        <el-radio-group v-model="config.titleTextAlign"
                        @change="handleChange">
          <el-radio-button label="left">左</el-radio-button>
          <el-radio-button label="center">中</el-radio-button>
          <el-radio-button label="right">右</el-radio-button>
        </el-radio-group>
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
                         :max="100"
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
        <el-radio-group v-model="config.valueTextAlign"
                        @change="handleChange">
          <el-radio-button label="left">左</el-radio-button>
          <el-radio-button label="center">中</el-radio-button>
          <el-radio-button label="right">右</el-radio-button>
        </el-radio-group>
        <el-checkbox-button v-model="config.valueFontWeight"
                            @change="handleChange"
                            true-label="bold"
                            false-label="normal">B</el-checkbox-button>
      </el-row>
    </el-collapse-item>
    <el-collapse-item class="title1-config"
                      title="框样式">
      <el-row type="flex"
              justify="space-between">
        背景色
        <el-checkbox v-model="config.backgroundShow"
                     @change="handleChange">显示</el-checkbox>
      </el-row>
      <el-row type="flex">
        <span>背景色：</span>
        <el-color-picker show-alpha
                         v-model="config.backgroundColor"
                         @change="handleChange"></el-color-picker>
      </el-row>

      <el-row type="flex"
              justify="space-between">
        边框
        <el-checkbox v-model="config.borderShow"
                     @change="handleChange">显示</el-checkbox>
      </el-row>
      <el-row type="flex"
              justify="">

        <span>线宽：</span>
        <el-input-number :min="1"
                         :max="100"
                         :precision="0"
                         :style="{width: '80px'}"
                         controls-position="right"
                         v-model="config.borderWidth"
                         @change="handleChange"></el-input-number>
        <span>颜色：</span>
        <el-color-picker show-alpha
                         v-model="config.borderColor"
                         @change="handleChange"></el-color-picker>

      </el-row>
      <el-row type="flex"
              justify="space-between">
        边框样式
        <el-radio-group v-model="config.borderStyle"
                        @change="handleChange">
          <el-radio-button label="solid">实线</el-radio-button>
          <el-radio-button label="dashed">虚线</el-radio-button>
          <el-radio-button label="dotted">点线</el-radio-button>
        </el-radio-group>
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
  name: 'LabelValue3Config',
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
        titleLabel: '城镇职工基金预算',
        titleColor: '#FFFFFF',
        titleFontSize: 14,
        titleFamily: 'sans-serif,Microsoft YaHei',
        titleFontWeight: 'normal',
        titleTextAlign: 'center',
        titleShowStatus: true,
        // 值的配置
        valueColor: '#5AB3FE',
        valueFontSize: 14,
        valueFamily: 'sans-serif,Microsoft YaHei',
        valueFontWeight: 'normal',
        valueTextAlign: 'center',
        valueShowStatus: true,
        // 框样式
        backgroundColor: '#142A5D',
        backgroundShow: true,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#2F4184',
        borderShow: true
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
        titleLabel: '城镇职工基金预算',
        titleColor: '#FFFFFF',
        titleFontSize: 14,
        titleFamily: 'sans-serif,Microsoft YaHei',
        titleFontWeight: 'normal',
        titleTextAlign: 'center',
        titleShowStatus: true,
        // 值的配置
        valueColor: '#5AB3FE',
        valueFontSize: 14,
        valueFamily: 'sans-serif,Microsoft YaHei',
        valueFontWeight: 'normal',
        valueTextAlign: 'center',
        valueShowStatus: true,
        // 框样式
        backgroundColor: '#142A5D',
        backgroundShow: true,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#2F4184',
        borderShow: true
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
