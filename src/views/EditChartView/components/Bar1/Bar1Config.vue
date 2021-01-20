<template>
  <div>
    <el-collapse-item class="select1-config" title="标题">
      <el-row type="flex" justify="space-between">
        标题
        <el-checkbox v-model="config.titleShowStatus" @change="handleChange">显示</el-checkbox>
      </el-row>
      <el-row>
        <el-input v-model="config.titleLabel" @change="handleChange"></el-input>
      </el-row>
      <el-row type="flex" align="middle">
        <el-color-picker show-alpha v-model="config.titleColor" @change="handleChange"></el-color-picker>
        <el-input-number :min="10" :max="30" :precision="0" controls-position="right" v-model="config.titleFontSize" @change="handleChange"></el-input-number>
        <el-select v-model="config.titleFamily" @change="handleChange">
          <el-option v-for="item in fontFamilyOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-row>
      <el-row type="flex" align="middle">
        <el-radio-group v-model="config.titleTextAlign" @change="handleChange">
          <el-radio-button label="left">左</el-radio-button>
          <el-radio-button label="center">中</el-radio-button>
          <el-radio-button label="right">右</el-radio-button>
        </el-radio-group>
        <el-checkbox-button v-model="config.titleFontWeight" @change="handleChange" true-label="bold" false-label="normal">B</el-checkbox-button>
      </el-row>
    </el-collapse-item>
    <el-collapse-item class="select1-config" title="副标题">
      <el-row type="flex" justify="space-between">
        副标题
        <el-checkbox v-model="config.subTitleShowStatus" @change="handleChange">显示</el-checkbox>
      </el-row>
      <el-row>
        <el-input v-model="config.subTitleLabel" @change="handleChange"></el-input>
      </el-row>
      <el-row type="flex" align="middle">
        <el-color-picker show-alpha v-model="config.subTitleColor" @change="handleChange"></el-color-picker>
        <el-input-number :min="10" :max="30" :precision="0" controls-position="right" v-model="config.subTitleFontSize" @change="handleChange"></el-input-number>
        <el-select v-model="config.subTitleFamily" @change="handleChange">
          <el-option v-for="item in fontFamilyOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-row>
      <el-row type="flex" align="middle">
        <el-radio-group v-model="config.subTitleTextAlign" @change="handleChange">
          <el-radio-button label="left">左</el-radio-button>
          <el-radio-button label="center">中</el-radio-button>
          <el-radio-button label="right">右</el-radio-button>
        </el-radio-group>
        <el-checkbox-button v-model="config.subTitleFontWeight" @change="handleChange" true-label="bold" false-label="normal">B</el-checkbox-button>
      </el-row>
    </el-collapse-item>
    <el-collapse-item class="select1-config" title="注释">
      <el-row type="flex" justify="space-between">
        注释
        <el-checkbox v-model="config.noteShowStatus" @change="handleChange">显示</el-checkbox>
      </el-row>
      <el-row>
        <el-input v-model="config.noteLabel" @change="handleChange"></el-input>
      </el-row>
      <el-row type="flex" align="middle">
        <el-color-picker show-alpha v-model="config.noteColor" @change="handleChange"></el-color-picker>
        <el-input-number :min="10" :max="30" :precision="0" controls-position="right" v-model="config.noteFontSize" @change="handleChange"></el-input-number>
        <el-select v-model="config.noteFamily" @change="handleChange">
          <el-option v-for="item in fontFamilyOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-row>
      <el-row type="flex" align="middle">
        <el-radio-group v-model="config.noteTextAlign" @change="handleChange">
          <el-radio-button label="left">左</el-radio-button>
          <el-radio-button label="center">中</el-radio-button>
          <el-radio-button label="right">右</el-radio-button>
        </el-radio-group>
        <el-checkbox-button v-model="config.noteFontWeight" @change="handleChange" true-label="bold" false-label="normal">B</el-checkbox-button>
      </el-row>
    </el-collapse-item>
    <el-collapse-item class="select1-config" title="折线样式配置">
      <el-row type="flex" align="middle">
        <el-radio-group v-model="config.chartOption.lineSmooth" @change="handleChange">
          <el-radio-button class="radio-button-plr10" :label="true">曲线</el-radio-button>
          <el-radio-button class="radio-button-plr10" :label="false">折线</el-radio-button>
        </el-radio-group>
        <el-radio-group v-model="config.chartOption.lineStyleType" @change="handleChange">
          <el-radio-button class="radio-button-plr10" label="solid">实线</el-radio-button>
          <el-radio-button class="radio-button-plr10" label="dashed">虚线</el-radio-button>
        </el-radio-group>
      </el-row>
      <div class="line-color-label">折线颜色</div>
      <div>
        <el-radio-group v-model="config.chartOption.lineStyleColorType" @change="handlelineStyleColorTypeChange">
          <el-radio label="single">单色</el-radio>
          <el-radio label="gradient">渐变色</el-radio>
        </el-radio-group>
      </div>
      <div class="color-select" v-if="config.chartOption.lineStyleColorType === 'single'">
        <el-color-picker show-alpha v-model="config.chartOption.lineStyleColor" @change="handleChange"></el-color-picker>

        <div v-for="(color) in singleList" :key="color" :class="['single-color-span',config.chartOption.lineStyleColor === color ? 'active' : '']">
          <span @click="handleSingleColorClick(color)" :style="{backgroundColor: color}"></span>
        </div>
      </div>
      <div class="color-select" v-if="config.chartOption.lineStyleColorType === 'gradient'">

        <div v-for="(item, index) in gradientList" :key="index" :class="['color-img_con', index === currentGradientIndex ? 'active' : '']" @click="handleGradientColorClick(item, index)">
          <img :src="item.url" alt="" class="color-img">
        </div>

      </div>
    </el-collapse-item>
    <el-collapse-item class="select1-config" title="柱状样式配置">
      <div class="flex">
        <label>显示数：</label>
        <el-input-number :min="1" :max="30" :precision="0" style="width: 90px" controls-position="right" v-model="config.chartOption.barNum" @change="handleChange"></el-input-number>
      </div>
      <div class="line-color-label">柱状颜色</div>
      <div>
        <el-radio-group v-model="config.chartOption.barStyleColorType" @change="handleBarStyleColorTypeChange">
          <el-radio label="single">单色</el-radio>
          <el-radio label="gradient">渐变色</el-radio>
        </el-radio-group>
      </div>
      <div class="select-bar-color">
        <div v-for="(url, index) in singleBarBgcImgs" :key="index" :class="['choose-bar-color', currentBarColorIndex === index ? 'active' : '']" @click="handleSelecSingletBarColor(url, index)">
          <p>单色组{{index + 1}}</p>
          <img :src="url" width="94" height="20" alt="">
        </div>
      </div>
    </el-collapse-item>
    <el-collapse-item class="select1-config" title="图例">
      <el-row type="flex" justify="space-between">
        图例
        <el-checkbox v-model="config.chartOption.legendShow" @change="handleChange">显示</el-checkbox>
      </el-row>
      <el-row type="flex" align="middle">
        <el-color-picker show-alpha v-model="config.chartOption.legendColor" @change="handleChange"></el-color-picker>
        <el-input-number :min="10" :max="30" :precision="0" controls-position="right" v-model="config.chartOption.legendFontSize" @change="handleChange"></el-input-number>
        <el-select v-model="config.chartOption.legendFontFamily" @change="handleChange">
          <el-option label="微软雅黑" value="sans-serif,Microsoft YaHei"></el-option>
          <el-option label="宋体" value="serif,Simsun"></el-option>
        </el-select>
      </el-row>
      <el-row type="flex" align="middle">
        <label>位置：</label>
        <el-radio-group v-model="config.chartOption.legendPosition" @change="handleChange">
          <el-radio-button label="top">上</el-radio-button>
          <el-radio-button label="bottom">下</el-radio-button>
        </el-radio-group>
        <el-checkbox-button v-model="config.chartOption.legendFontWeight" @change="handleChange" true-label="bold" false-label="normal">B</el-checkbox-button>
      </el-row>
    </el-collapse-item>
    <el-collapse-item class="select1-config" title="x轴">
      <el-row type="flex" justify="space-between">
        轴文字
        <el-checkbox v-model="config.chartOption.xAxisLabelShow" @change="handleChange">显示</el-checkbox>
      </el-row>
      <el-row type="flex" align="middle">
        <el-color-picker show-alpha v-model="config.chartOption.xAxisLabelColor" @change="handleChange"></el-color-picker>
        <el-input-number :min="10" :max="30" :precision="0" controls-position="right" v-model="config.chartOption.xAxisLabelFontSize" @change="handleChange"></el-input-number>
        <el-select v-model="config.chartOption.xAxisLabelFontFamily" @change="handleChange">
          <el-option label="微软雅黑" value="sans-serif,Microsoft YaHei"></el-option>
          <el-option label="宋体" value="serif,Simsun"></el-option>
        </el-select>
      </el-row>
      <el-row type="flex" justify="space-between">
        轴线
        <el-checkbox v-model="config.chartOption.xAxisLineShow" @change="handleChange">显示</el-checkbox>
      </el-row>
      <el-row type="flex" align="middle">
        <el-color-picker show-alpha v-model="config.chartOption.xAxisLineColor" @change="handleChange"></el-color-picker>
        <span>粗细：</span>
        <el-input-number :min="1" :precision="0" controls-position="right" :style="{width: '80px'}" v-model="config.chartOption.xAxisLineWidth" @change="handleChange"></el-input-number>
      </el-row>
    </el-collapse-item>
    <el-collapse-item class="select1-config" title="y轴">
      <el-row type="flex" justify="space-between">
        轴文字
        <el-checkbox v-model="config.chartOption.yAxisLabelShow" @change="handleChange">显示</el-checkbox>
      </el-row>
      <el-row type="flex" align="middle">
        <el-color-picker show-alpha v-model="config.chartOption.yAxisLabelColor" @change="handleChange"></el-color-picker>
        <el-input-number :min="10" :max="30" :precision="0" controls-position="right" v-model="config.chartOption.yAxisLabelFontSize" @change="handleChange"></el-input-number>
        <el-select v-model="config.chartOption.yAxisLabelFontFamily" @change="handleChange">
          <el-option label="微软雅黑" value="sans-serif,Microsoft YaHei"></el-option>
          <el-option label="宋体" value="serif,Simsun"></el-option>
        </el-select>
      </el-row>
      <el-row type="flex" justify="space-between">
        轴线
        <el-checkbox v-model="config.chartOption.yAxisLineShow" @change="handleChange">显示</el-checkbox>
      </el-row>
      <el-row type="flex" align="middle">
        <el-color-picker show-alpha v-model="config.chartOption.yAxisLineColor" @change="handleChange"></el-color-picker>
        <span>粗细：</span>
        <el-input-number :min="1" :precision="0" controls-position="right" :style="{width: '80px'}" v-model="config.chartOption.yAxisLineWidth" @change="handleChange"></el-input-number>
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
import gradient1 from './imgs/1.png';
import gradient2 from './imgs/2.png';
import gradient3 from './imgs/3.png';
import gradient4 from './imgs/4.png';
import gradient5 from './imgs/5.png';
import g1 from './imgs/g1.png';
import g2 from './imgs/g2.png';
import g3 from './imgs/g3.png';
import g4 from './imgs/g4.png';

// bar背景色单色组
const barSingleBgcGroupList = [
  [
    'rgb(239, 187, 76)',
    'rgb(121, 212, 255)',
    'rgb(186, 144, 255)',
    'rgb(239, 155, 149)',
    'rgb(246, 239, 118)',
    'rgb(243, 132, 245)',
    'rgb(123, 229, 199)',
    'rgb(121, 212, 255)'
  ],
  [
    'rgb(186, 144, 255)',
    'rgb(121, 212, 255)',
    'rgb(239, 155, 149)',
    'rgb(123, 229, 199)',
    'rgb(239, 187, 76)',
    'rgb(147, 213, 69)',
    'rgb(246, 239, 118)',
    'rgb(243, 132, 245)'
  ],
  [
    'rgb(239, 187, 76)',
    'rgb(186, 144, 255)',
    'rgb(121, 212, 255)',
    'rgb(239, 155, 149)',
    'rgb(147, 213, 69)',
    'rgb(246, 239, 118)',
    'rgb(243, 132, 245)',
    'rgb(123, 229, 199)'
  ],
  [
    'rgb(239, 155, 149)',
    'rgb(123, 229, 199)',
    'rgb(121, 212, 255)',
    'rgb(147, 213, 69)',
    'rgb(239, 187, 76)',
    'rgb(243, 132, 245)',
    'rgb(186, 144, 255)',
    'rgb(246, 239, 118)'
  ]
];
export default {
  name: 'Bar1Config',
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
        //   标题
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
        // 图表的一些配置
        chartOption: {
          lineSmooth: true, // 曲线 折线
          lineStyleType: 'solid', // 实线solid、虚线dashed
          // 折线的颜色
          lineStyleColorType: 'single', // 单色single、渐变 gradient
          lineStyleColor: '#F0AB4C',
          lineWidth: 2, // 线粗细
          barNum: 12,
          barStyleColorType: 'single',
          barBackgroundColorList: [
            'rgb(239, 187, 76)',
            'rgb(121, 212, 255)',
            'rgb(186, 144, 255)',
            'rgb(239, 155, 149)'
          ],
          // 图例的配置
          legendShow: true,
          legendColor: '#ffffff',
          legendPosition: 'top', // top bottom
          legendFontSize: 12,
          legendFontWeight: 'normal',
          legendFontFamily: 'sans-serif,Microsoft YaHei',
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
          yAxisLineWidth: 1
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
      currentBarColorIndex: -1,
      currentGradientIndex: -1,
      singleList: [
        '#F0AB4C',
        'rgb(186, 144, 255)',
        'rgb(123, 229, 199)',
        'rgb(208, 85, 255)'
      ],
      singleBarBgcImgs: [g1, g2, g3, g4],
      gradientList: [
        { url: gradient1, color1: '#F0AB4C', color2: 'rgb(121, 212, 255)' },
        {
          url: gradient2,
          color1: 'rgb(186, 144, 255)',
          color2: 'rgb(253, 155, 180)'
        },
        {
          url: gradient3,
          color1: 'rgb(123, 229, 199)',
          color2: 'rgb(252, 133, 245)'
        },
        {
          url: gradient4,
          color1: 'rgb(208, 85, 255)',
          color2: 'rgb(71, 153, 255)'
        },
        {
          url: gradient5,
          color1: 'rgb(115, 239, 212)',
          color2: 'rgb(69, 150, 255)'
        }
      ],
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
        //   标题
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
        // 图表的一些配置
        chartOption: {
          lineSmooth: true, // 曲线 折线
          lineStyleType: 'solid', // 实线solid、虚线dashed
          // 折线的颜色
          lineStyleColorType: 'single', // 单色single、渐变 gradient
          lineStyleColor: '#F0AB4C',
          lineWidth: 2, // 线粗细
          barNum: 12,
          barStyleColorType: 'single',
          barBackgroundColorList: [
            'rgb(239, 187, 76)',
            'rgb(121, 212, 255)',
            'rgb(186, 144, 255)',
            'rgb(239, 155, 149)'
          ],
          // 图例的配置
          legendShow: true,
          legendColor: '#fff',
          legendPosition: 'top', // top bottom
          legendFontSize: 12,
          legendFontWeight: 'normal',
          legendFontFamily: 'sans-serif,Microsoft YaHei',
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
          yAxisLineWidth: 1
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
    },
    handlelineStyleColorTypeChange() {},

    handleSingleColorClick(color) {
      this.config.chartOption.lineStyleColor = color;
      this.currentGradientIndex = -1;
      this.handleChange();
    },
    handleGradientColorClick(item, index) {
      this.config.chartOption.lineStyleColor = {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: item.color1 // 0% 处的颜色
          },
          {
            offset: 1,
            color: item.color2 // 100% 处的颜色
          }
        ],
        global: false // 缺省为 false
      };
      this.currentGradientIndex = index;
      this.handleChange();
    },
    handleBarStyleColorTypeChange() {
      this.currentBarColorIndex = -1;
    },
    handleSelecSingletBarColor(item, index) {
      // this.config.chartOption.bar1StyleColor = item.color1;
      // this.config.chartOption.bar2StyleColor = item.color2;
      const colorList = barSingleBgcGroupList[index];

      this.config.chartOption.barBackgroundColorList = [...colorList];

      this.currentBarColorIndex = index;
      this.handleChange();
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

.line-color-label {
  color: #b0cdeb;
  font-size: 14px;
  margin: 8px 0;
}

.color-select {
  margin: 8px 0;
  display: flex;
  align-items: center;

  .single-color-span {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-left: 8px;
    cursor: pointer;
    padding: 2px;
    box-sizing: content-box;
    border-radius: 2px;

    &.active {
      border: 1px solid #74b9ff;
    }

    span {
      display: inline-block;
      width: 20px;
      height: 20px;
      border-radius: 2px;
    }
  }

  .color-img_con {
    box-sizing: content-box;
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 8px;
    cursor: pointer;
    padding: 2px;
    box-sizing: content-box;
    border-radius: 2px;

    &.active {
      border: 1px solid #74b9ff;
    }

    .color-img {
      width: 20px;
      height: 20px;
    }
  }
}

.flex {
  display: flex;
  align-items: center;
}

.select-bar-color {
  margin: 8px 0;
}

.choose-bar-color {
  box-sizing: content-box;
  display: inline-block;
  width: 94px;
  height: 38px;
  margin-right: 8px;
  cursor: pointer;
  padding: 4px;
  box-sizing: content-box;
  border-radius: 2px;
  border: 1px solid transparent;

  p {
    font-size: 12px;
    color: #b0cdeb;
    line-height: 1;
    margin-bottom: 6px;
  }

  &.active {
    border-color: #74b9ff;
  }
}
</style>
