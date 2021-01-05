<template>
  <div class="pie1-config">
    <el-collapse-item title="标题">
      <el-row type="flex"
              justify="space-between">
        标题
        <el-checkbox v-model="config.titleShow">显示</el-checkbox>
      </el-row>
      <el-row>
        <el-input v-model="config.title"></el-input>
      </el-row>
      <el-row type="flex"
              align="middle">
        <el-color-picker show-alpha
                         v-model="config.color"></el-color-picker>
        <el-input-number :min="10"
                         :max="30"
                         :precision="0"
                         controls-position="right"
                         v-model="fontSize"></el-input-number>
        <el-select v-model="config.fontFamily">
          <el-option v-for="item in fontFamilyOptions"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value"></el-option>
        </el-select>
      </el-row>
      <el-row type="flex"
              align="middle">
        <el-radio-group v-model="config.textAlign">
          <el-radio-button label="left">左</el-radio-button>
          <el-radio-button label="center">中</el-radio-button>
          <el-radio-button label="right">右</el-radio-button>
        </el-radio-group>
        <el-checkbox-button v-model="config.fontWeight"
                            true-label="bold"
                            false-label="normal">B</el-checkbox-button>
      </el-row>
    </el-collapse-item>
    <!-- <el-collapse-item title="指标2"> </el-collapse-item>
    <el-collapse-item title="指标3"> </el-collapse-item>
    <el-collapse-item title="指标4"> </el-collapse-item> -->
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
  CheckboxButton
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
    'el-checkbox-button': CheckboxButton
  },
  props: ['componentConfig', 'handlingIndex'],
  data() {
    return {
      fontFamilyOptions: [
        {
          value: 'Microsoft Yahei',
          label: '微软雅黑'
        },
        {
          value: '宋体',
          label: '宋体'
        }
      ],
      config: {}
    };
  },
  computed: {
    fontSize: {
      get() {
        return parseInt(this.config.fontSize);
      },
      set(val) {
        this.config.fontSize = val + 'px';
      }
    }
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
      }
    }
  },
  created() {
    this.config = { ...this.componentConfig };
  }
};
</script>
<style scoped lang="stylus">
.pie1-config {
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
