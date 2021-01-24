<template>
  <div>
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
    <el-collapse-item class="title1-config"
                      title="时间">
      <el-row type="flex"
              justify="space-between">
        时间
        <el-checkbox v-model="config.timeShowStatus"
                     @change="handleChange">显示</el-checkbox>
      </el-row>

      <el-row type="flex"
              align="middle">
        <el-color-picker show-alpha
                         v-model="config.timeColor"
                         @change="handleChange"></el-color-picker>
        <el-input-number :min="10"
                         :max="100"
                         :precision="0"
                         controls-position="right"
                         v-model="config.timefontSize"
                         @change="handleChange"></el-input-number>
        <el-select v-model="config.timeFontFamily"
                   @change="handleChange">
          <el-option v-for="item in fontFamilyOptions"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value"></el-option>
        </el-select>
      </el-row>
      <el-row type="flex"
              align="middle">
        <el-radio-group v-model="config.timeTextAlign"
                        @change="handleChange">
          <el-radio-button label="left">左</el-radio-button>
          <el-radio-button label="center">中</el-radio-button>
          <el-radio-button label="right">右</el-radio-button>
        </el-radio-group>
        <el-checkbox-button v-model="config.timeFontWeight"
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
import { fontFamilyOptions } from '../../constant';
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
        // 时间的一些设定
        timeShowStatus: true,
        timeFontFamily: 'sans-serif,Microsoft YaHei',
        timeColor: '#62D2FF',
        timefontSize: 14,
        timeTextAlign: 'right',
        timeFontWeight: 'normal'
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
        title: '看板标题',
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'sans-serif,Microsoft YaHei',
        showStatus: true,
        // 时间的一些设定
        timeShowStatus: true,
        timeFontFamily: 'sans-serif,Microsoft YaHei',
        timeColor: '#62D2FF',
        timefontSize: 14,
        timeTextAlign: 'right',
        timeFontWeight: 'normal'
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
