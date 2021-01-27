<template>
  <div>
    <el-collapse-item class="select1-config"
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
    <el-collapse-item class="select1-config"
                      title="副标题">
      <el-row type="flex"
              justify="space-between">
        副标题
        <el-checkbox v-model="config.subTitleShowStatus"
                     @change="handleChange">显示</el-checkbox>
      </el-row>
      <el-row>
        <el-input v-model="config.subTitleLabel"
                  @change="handleChange"></el-input>
      </el-row>
      <el-row type="flex"
              align="middle">
        <el-color-picker show-alpha
                         v-model="config.subTitleColor"
                         @change="handleChange"></el-color-picker>
        <el-input-number :min="10"
                         :max="30"
                         :precision="0"
                         controls-position="right"
                         v-model="config.subTitleFontSize"
                         @change="handleChange"></el-input-number>
        <el-select v-model="config.subTitleFamily"
                   @change="handleChange">
          <el-option v-for="item in fontFamilyOptions"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value"></el-option>
        </el-select>
      </el-row>
      <el-row type="flex"
              align="middle">
        <el-radio-group v-model="config.subTitleTextAlign"
                        @change="handleChange">
          <el-radio-button label="left">左</el-radio-button>
          <el-radio-button label="center">中</el-radio-button>
          <el-radio-button label="right">右</el-radio-button>
        </el-radio-group>
        <el-checkbox-button v-model="config.subTitleFontWeight"
                            @change="handleChange"
                            true-label="bold"
                            false-label="normal">B</el-checkbox-button>
      </el-row>
    </el-collapse-item>
    <el-collapse-item class="select1-config"
                      title="注释">
      <el-row type="flex"
              justify="space-between">
        注释
        <el-checkbox v-model="config.noteShowStatus"
                     @change="handleChange">显示</el-checkbox>
      </el-row>
      <el-row>
        <el-input v-model="config.noteLabel"
                  @change="handleChange"></el-input>
      </el-row>
      <el-row type="flex"
              align="middle">
        <el-color-picker show-alpha
                         v-model="config.noteColor"
                         @change="handleChange"></el-color-picker>
        <el-input-number :min="10"
                         :max="30"
                         :precision="0"
                         controls-position="right"
                         v-model="config.noteFontSize"
                         @change="handleChange"></el-input-number>
        <el-select v-model="config.noteFamily"
                   @change="handleChange">
          <el-option v-for="item in fontFamilyOptions"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value"></el-option>
        </el-select>
      </el-row>
      <el-row type="flex"
              align="middle">
        <el-radio-group v-model="config.noteTextAlign"
                        @change="handleChange">
          <el-radio-button label="left">左</el-radio-button>
          <el-radio-button label="center">中</el-radio-button>
          <el-radio-button label="right">右</el-radio-button>
        </el-radio-group>
        <el-checkbox-button v-model="config.noteFontWeight"
                            @change="handleChange"
                            true-label="bold"
                            false-label="normal">B</el-checkbox-button>
      </el-row>
    </el-collapse-item>
    <el-collapse-item class="select1-config"
                      title="x轴">
      <el-row type="flex"
              justify="space-between">
        轴文字
        <el-checkbox v-model="config.chartOption.xAxisLabelShow"
                     @change="handleChange">显示</el-checkbox>
      </el-row>
      <el-row type="flex"
              align="middle">
        <el-color-picker show-alpha
                         v-model="config.chartOption.xAxisLabelColor"
                         @change="handleChange"></el-color-picker>
        <el-input-number :min="10"
                         :max="30"
                         :precision="0"
                         controls-position="right"
                         v-model="config.chartOption.xAxisLabelFontSize"
                         @change="handleChange"></el-input-number>
        <el-select v-model="config.chartOption.xAxisLabelFontFamily"
                   @change="handleChange">
          <el-option label="微软雅黑"
                     value="sans-serif,Microsoft YaHei"></el-option>
          <el-option label="宋体"
                     value="serif,Simsun"></el-option>
        </el-select>
      </el-row>
      <el-row type="flex"
              justify="space-between">
        轴线
        <el-checkbox v-model="config.chartOption.xAxisLineShow"
                     @change="handleChange">显示</el-checkbox>
      </el-row>
      <el-row type="flex"
              align="middle">
        <el-color-picker show-alpha
                         v-model="config.chartOption.xAxisLineColor"
                         @change="handleChange"></el-color-picker>
        <span>粗细：</span>
        <el-input-number :min="1"
                         :precision="0"
                         controls-position="right"
                         :style="{width: '80px'}"
                         v-model="config.chartOption.xAxisLineWidth"
                         @change="handleChange"></el-input-number>
      </el-row>
    </el-collapse-item>
    <el-collapse-item class="select1-config"
                      title="y轴">
      <el-row type="flex"
              justify="space-between">
        轴文字
        <el-checkbox v-model="config.chartOption.yAxisLabelShow"
                     @change="handleChange">显示</el-checkbox>
      </el-row>
      <el-row type="flex"
              align="middle">
        <el-color-picker show-alpha
                         v-model="config.chartOption.yAxisLabelColor"
                         @change="handleChange"></el-color-picker>
        <el-input-number :min="10"
                         :max="30"
                         :precision="0"
                         controls-position="right"
                         v-model="config.chartOption.yAxisLabelFontSize"
                         @change="handleChange"></el-input-number>
        <el-select v-model="config.chartOption.yAxisLabelFontFamily"
                   @change="handleChange">
          <el-option label="微软雅黑"
                     value="sans-serif,Microsoft YaHei"></el-option>
          <el-option label="宋体"
                     value="serif,Simsun"></el-option>
        </el-select>
      </el-row>
      <!-- <el-row type="flex"
              justify="space-between">
        轴线
        <el-checkbox v-model="config.chartOption.yAxisLineShow"
                     @change="handleChange">显示</el-checkbox>
      </el-row>
      <el-row type="flex"
              align="middle">
        <el-color-picker show-alpha
                         v-model="config.chartOption.yAxisLineColor"
                         @change="handleChange"></el-color-picker>
        <span>粗细：</span>
        <el-input-number :min="1"
                         :precision="0"
                         controls-position="right"
                         :style="{width: '80px'}"
                         v-model="config.chartOption.yAxisLineWidth"
                         @change="handleChange"></el-input-number>
      </el-row> -->
    </el-collapse-item>
    <el-collapse-item class="select1-config"
                      title="浮框">
      <el-row type="flex"
              justify="space-between">
        浮框
        <el-checkbox v-model="config.chartOption.tooltipShow"
                     @change="handleChange">显示</el-checkbox>
      </el-row>
    </el-collapse-item>
    <el-collapse-item class="select1-config"
                      title="柱状图">
      <el-row type="flex"
              align="middle">
        <span>柱状颜色：</span>
        <el-color-picker show-alpha
                         v-model="config.chartOption.barItemColor"
                         @change="handleChange"></el-color-picker>
        <span>柱状背景色：</span>
        <el-color-picker show-alpha
                         v-model="config.chartOption.barBackgroundColor"
                         @change="handleChange"></el-color-picker>
      </el-row>
      <el-row type="flex"
              align="middle">
        <span>宽度：</span>
        <el-input-number :min="1"
                         :precision="0"
                         controls-position="right"
                         :style="{width: '80px'}"
                         v-model="config.chartOption.barWidth"
                         @change="handleChange"></el-input-number>
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
  CheckboxButton,
  Radio
} from 'element-ui';
import cloneDeep from 'lodash/cloneDeep';

export default {
  name: 'Bar3Config',
  components: {
    'el-collapse-item': CollapseItem,
    'el-checkbox': Checkbox,
    'el-color-picker': ColorPicker,
    'el-input-number': InputNumber,
    'el-radio-group': RadioGroup,
    'el-radio-button': RadioButton,
    'el-checkbox-button': CheckboxButton,
    'el-radio': Radio
  },
  props: {
    componentConfig: {
      type: Object,
      required: true,
      default: () => ({
        // 标题的配置
        titleLabel: '标题',
        titleColor: 'rgb(83, 226, 255)',
        titleFontSize: 18,
        titleFamily: 'sans-serif,Microsoft YaHei',
        titleTextAlign: 'left',
        titleFontWeight: 'normal',
        titleShowStatus: true,
        // 副标题
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
        chartOption: {
          // x轴的一些配置
          xAxisLabelShow: true,
          xAxisLabelColor: '#5B5D66',
          xAxisLabelFontSize: 12,
          xAxisLabelFontFamily: 'sans-serif,Microsoft YaHei',
          xAxisLineShow: true,
          xAxisLineColor: '#5B5D66',
          xAxisLineWidth: 1,
          // y轴的一些配置
          yAxisLabelShow: true,
          yAxisLabelColor: '#5B5D66',
          yAxisLabelFontSize: 12,
          yAxisLabelFontFamily: 'sans-serif,Microsoft YaHei',
          yAxisLineShow: true,
          yAxisLineColor: '#5B5D66',
          yAxisLineWidth: 1,
          // 浮框
          tooltipShow: true,
          // 柱状图的一些配置
          barItemColor: '#53E2FF',
          barBackgroundColor: '#2C547C',
          barWidth: 10
        }
      })
    }
  },
  watch: {
    componentConfig: {
      handler: function (newConfig) {
        this.config = cloneDeep(this.componentConfig);
      },
      deep: true
    }
  },
  data() {
    return {
      fontFamilyOptions: [
        {
          value: 'sans-serif,Microsoft YaHei',
          label: '微软雅黑'
        },
        {
          value: 'serif,Simsun',
          label: '宋体'
        }
      ],
      config: {
        // 标题的配置
        titleLabel: '标题',
        titleColor: 'rgb(83, 226, 255)',
        titleFontSize: 18,
        titleFamily: 'sans-serif,Microsoft YaHei',
        titleTextAlign: 'left',
        titleFontWeight: 'normal',
        titleShowStatus: true,
        // 副标题
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
        // 数据源配置
        data: {
          businessType: '', // 指标库导入、静态数据、自定义API
          /* 指标库导入 */
          businessDomain: '', // 业务域
          businessIndexSet: '', // 指标集
          businessX: '', // x 轴字段
          businessY: '', // y 轴字段
          businessParamList: [{ key: '', value: '' }],
          /* 静态数据 */
          staticData: null, // JSON.stringify(chartData, null, 2), //  Array or Map 序列化的字符串
          /* 自定义API */
          apiUrl: '',
          apiUrlParamList: [{ key: '', value: '' }]
        },
        chartOption: {
          // x轴的一些配置
          xAxisLabelShow: true,
          xAxisLabelColor: '#5B5D66',
          xAxisLabelFontSize: 12,
          xAxisLabelFontFamily: 'sans-serif,Microsoft YaHei',
          xAxisLineShow: true,
          xAxisLineColor: '#5B5D66',
          xAxisLineWidth: 1,
          // y轴的一些配置
          yAxisLabelShow: true,
          yAxisLabelColor: '#5B5D66',
          yAxisLabelFontSize: 12,
          yAxisLabelFontFamily: 'sans-serif,Microsoft YaHei',
          yAxisLineShow: true,
          yAxisLineColor: '#5B5D66',
          yAxisLineWidth: 1,
          // 浮框
          tooltipShow: true,
          // 柱状图的一些配置
          barItemColor: '#53E2FF',
          barBackgroundColor: '#2C547C',
          barWidth: 10
        }
      }
    };
  },
  created() {
    this.config = cloneDeep(this.componentConfig);
  },
  methods: {
    handleChange() {
      this.$emit('change', this.config);
    }
  }
};
</script>

<style scoped lang="stylus">
.select1-config {
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
