<template>
  <el-collapse-item class="title1-config"
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
export default {
  name: 'Title1Config',
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
        title: '看板标题',
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'sans-serif,Microsoft YaHei',
        fontWeight: 'normal',
        showStatus: true,
        scale: 1
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
        title: '看板标题',
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'sans-serif,Microsoft YaHei',
        showStatus: true,
        scale: 1
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
