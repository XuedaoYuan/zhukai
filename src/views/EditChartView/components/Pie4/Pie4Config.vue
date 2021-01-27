<template>
  <div class="config__container">
    <el-collapse-item class="title1-config"
                      title="tooltip名字">
      <el-row>
        <el-input v-model="config.seriesName"
                  @change="handleChange"></el-input>
      </el-row>
    </el-collapse-item>
    <el-collapse-item class="title1-config"
                      title="图例标题">
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
        <el-select v-model="config.titleFontFamily"
                   @change="handleChange">
          <el-option v-for="item in fontFamilyOptions"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value"></el-option>
        </el-select>
      </el-row>
    </el-collapse-item>
    <el-collapse-item class="title1-config"
                      title="图例值">
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
        <el-select v-model="config.valueFontFamily"
                   @change="handleChange">
          <el-option v-for="item in fontFamilyOptions"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value"></el-option>
        </el-select>
      </el-row>
    </el-collapse-item>
    <!-- <el-collapse-item class="title1-config"
                      title="标题">
      <el-row type="flex"
              justify="space-between">
        标题
        <el-checkbox v-model="config.showStatus"
                     @change="handleChange">显示</el-checkbox>
      </el-row>
      <el-row>
        <el-input v-model="config.title"
                  @change="handleChange"></el-input>
      </el-row>
      <el-row type="flex"
              align="middle">
        <el-color-picker show-alpha
                         v-model="config.color"
                         @change="handleChange"></el-color-picker>
        <el-input-number :min="10"
                         :max="30"
                         :precision="0"
                         controls-position="right"
                         v-model="config.fontSize"
                         @change="handleChange"></el-input-number>
        <el-select v-model="config.fontFamily"
                   @change="handleChange">
          <el-option v-for="item in fontFamilyOptions"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value"></el-option>
        </el-select>
      </el-row>
      <el-row type="flex"
              align="middle">
        <el-radio-group v-model="config.textAlign"
                        @change="handleChange">
          <el-radio-button label="left">左</el-radio-button>
          <el-radio-button label="center">中</el-radio-button>
          <el-radio-button label="right">右</el-radio-button>
        </el-radio-group>
        <el-checkbox-button v-model="config.fontWeight"
                            @change="handleChange"
                            true-label="bold"
                            false-label="normal">B</el-checkbox-button>
      </el-row>
    </el-collapse-item> -->

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
import { fontFamilyOptions } from '../../constant';
export default {
  name: 'Pie4Config',
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
        // 图的系列name
        seriesName: '投诉举报情况',
        // 图例标题配置
        titleColor: '#FFFFFF',
        titleFontSize: 12,
        titleFontFamily: 'sans-serif,Microsoft YaHei',
        // 图例值的配置
        valueColor: '#FFFFFF',
        valueFontSize: 16,
        valueFontFamily: 'sans-serif,Microsoft YaHei'
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
        // 图的系列name
        seriesName: '投诉举报情况',
        // 图例标题配置
        titleColor: '#FFFFFF',
        titleFontSize: 12,
        titleFontFamily: 'sans-serif,Microsoft YaHei',
        // 图例值的配置
        valueColor: '#FFFFFF',
        valueFontSize: 16,
        valueFontFamily: 'sans-serif,Microsoft YaHei'
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

<style scoped lang="stylus"></style>
