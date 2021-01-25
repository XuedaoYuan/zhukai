<template>
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
  name: 'HeadTitle2Config',
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
        titleLabel: '标题',
        titleColor: 'rgb(83, 226, 255)',
        titleFontSize: 18,
        titleFamily: 'sans-serif,Microsoft YaHei',
        titleTextAlign: 'left',
        titleFontWeight: 'normal',
        titleShowStatus: true
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
        titleLabel: '标题',
        titleColor: 'rgb(83, 226, 255)',
        titleFontSize: 18,
        titleFamily: 'sans-serif,Microsoft YaHei',
        titleTextAlign: 'left',
        titleFontWeight: 'normal',
        titleShowStatus: true
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
