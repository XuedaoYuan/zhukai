<template>
  <div class="config__container">
    <el-collapse-item title="标题">
      <el-row type="flex" justify="space-between">
        标题
        <el-checkbox v-model="config.titleShowStatus">显示</el-checkbox>
      </el-row>
      <el-row>
        <el-input v-model="config.titleLabel"></el-input>
      </el-row>
      <el-row type="flex" align="middle">
        <el-color-picker
          show-alpha
          v-model="config.titleColor"
        ></el-color-picker>
        <el-input-number
          :min="10"
          :max="30"
          :precision="0"
          controls-position="right"
          v-model="config.titleFontSize"
        ></el-input-number>
        <el-select v-model="config.titleFamily">
          <el-option
            v-for="item in fontFamilyOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-row>
      <el-row type="flex" align="middle">
        <el-radio-group v-model="config.titleTextAlign">
          <el-radio-button label="left">左</el-radio-button>
          <el-radio-button label="center">中</el-radio-button>
          <el-radio-button label="right">右</el-radio-button>
        </el-radio-group>
        <el-checkbox-button
          v-model="config.titleFontWeight"
          true-label="bold"
          false-label="normal"
          >B</el-checkbox-button
        >
      </el-row>
    </el-collapse-item>
  </div>
</template>
<script>
import {
  CollapseItem,
  Row,
  Col,
  Checkbox,
  ColorPicker,
  InputNumber,
  RadioGroup,
  RadioButton,
  CheckboxButton,
} from 'element-ui';
export default {
  name: 'Pie1Config',
  components: {
    'el-collapse-item': CollapseItem,
    'el-checkbox': Checkbox,
    'el-color-picker': ColorPicker,
    'el-input-number': InputNumber,
    'el-radio-group': RadioGroup,
    'el-radio-button': RadioButton,
    'el-checkbox-button': CheckboxButton,
  },
  props: {
    handlingIndex: {
      type: Number,
      required: true,
    },
    componentConfig: {
      type: Object,
      default: () => ({
        // 标题的配置
        titleLabel: '标题1',
        titleColor: 'rgb(83, 226, 255)',
        titleFontSize: 18,
        titleFamily: 'sans-serif,Microsoft YaHei',
        titleTextAlign: 'left',
        titleFontWeight: 'normal',
        titleShowStatus: true,
        // 副标题的配置
        subTitleLabel: '副标题',
        subTitleColor: '#04c1ff',
        subTitleFontSize: 16,
        subTitleFamily: 'sans-serif,Microsoft YaHei',
        subTitleTextAlign: 'left',
        subTitleFontWeight: 'normal',
        subTitleShowStatus: false,
        // 注释的配置
        noteLabel: '注释',
        noteColor: '#fff',
        noteFontSize: 16,
        noteFamily: 'sans-serif,Microsoft YaHei',
        noteTextAlign: 'left',
        noteFontWeight: 'normal',
        noteShowStatus: false,
        scale: 1,
        data: {},
        chartOption: {
          lineSmooth: true, // 曲线 折线
          lineStyleType: 'solid', // 实线solid、虚线dashed
          // 折线的颜色
          lineStyleColorType: 'single', // 单色single、渐变 gradient
          lineStyleColor: '#F0AB4C',
          lineWidth: 2, // 线粗细
          barNum: 12, //  显示柱状的个数
          barStyleColorType: 'single',
          bar1StyleColor: 'rgb(239, 187, 76)',
          bar2StyleColor: 'rgb(121, 212, 255)',
        },
      }),
    },
  },
  data() {
    return {
      fontFamilyOptions: [
        {
          value: 'sans-serif,Microsoft YaHei',
          label: '微软雅黑',
        },
        {
          value: 'serif,Simsun',
          label: '宋体',
        },
      ],
      config: {},
    };
  },
  watch: {
    handlingIndex: function (val, oldVal) {
      // 监听被选中组件，刷新 config
      this.config = { ...this.componentConfig };
    },
    config: {
      deep: true,
      handler: function (val, oldVal) {
        this.$emit('change', val);
      },
    },
  },
  created() {
    this.config = { ...this.componentConfig };
  },
};
</script>
<style scoped lang="stylus">
</style>
