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
                      title="tab配置">
      <el-row type="flex"
              justify="space-between">
        tab
        <el-checkbox v-model="config.tabsShow"
                     @change="handleChange">显示</el-checkbox>
      </el-row>
      <el-row type="flex"
              align="middle">
        <span>轮播间隔：</span>
        <el-input-number :style="{width: '100px'}"
                         :min="1"
                         :max="1000"
                         :precision="0"
                         controls-position="right"
                         v-model="config.tabSlidePeriod"
                         @change="handleChange"></el-input-number>
        <span>(秒)</span>
      </el-row>
      <el-row type="flex"
              align="middle">
        <span>高亮状态：</span>
        <el-input-number :style="{width: '100px'}"
                         :min="0"
                         :max="config.tabs.length - 1"
                         :precision="0"
                         controls-position="right"
                         v-model="config.tabActiveIndex"
                         @change="handletabActiveIndexChange"></el-input-number>
      </el-row>
      <el-row type="flex"
              align="middle">
        <span>key：</span>
        <el-input v-model="config.tabKey"
                  @change="handleChange"></el-input>
      </el-row>
      <div style="border-bottom: 1px solid #b0cdeb; margin: 8px 0;"></div>
      <div v-for="(tab, index) in config.tabs"
           :key="index"
           style="border-bottom: 1px solid #b0cdeb; padding-top: 8px;">
        <div class="flexrow">
          <span>Tab{{index + 1}}</span>
          <span>
            <img v-if="!(config.tabs.length === 1)"
                 src="../../assets/delete.png"
                 width="16"
                 alt=""
                 @click="handleDeleteTab(index)">
            <img v-if="index + 1 === config.tabs.length"
                 class="add-img"
                 @click="handleAddTab"
                 src="../../../../assets/add.png"
                 width="16"
                 alt="">
          </span>
        </div>
        <div class="flex">
          <span>label: </span>
          <el-input v-model="config.tabs[index]['label']"
                    @change="handleChange"></el-input>
        </div>
        <div class="flex">
          <span>value: </span>
          <el-input v-model="config.tabs[index]['value']"
                    @change="handleChange"></el-input>
        </div>
      </div>

    </el-collapse-item>
    <el-collapse-item class="select1-config"
                      title="环形图注释1">
      <el-row type="flex"
              justify="space-between">
        注释1
        <el-checkbox v-model="config.annotation1Show"
                     @change="handleChange">显示</el-checkbox>
      </el-row>
      <el-row>
        <el-input v-model="config.annotation1Label"
                  @change="handleChange"></el-input>
      </el-row>
      <el-row type="flex"
              align="middle">
        <el-color-picker show-alpha
                         v-model="config.annotation1Color"
                         @change="handleChange"></el-color-picker>
        <el-input-number :min="10"
                         :max="30"
                         :precision="0"
                         controls-position="right"
                         v-model="config.annotation1FontSize"
                         @change="handleChange"></el-input-number>
        <el-select v-model="config.annotation1Fontfamily"
                   @change="handleChange">
          <el-option v-for="item in fontFamilyOptions"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value"></el-option>
        </el-select>
      </el-row>

    </el-collapse-item>
    <el-collapse-item class="select1-config"
                      title="环形图注释2">
      <el-row type="flex"
              justify="space-between">
        注释2
        <el-checkbox v-model="config.annotation2Show"
                     @change="handleChange">显示</el-checkbox>
      </el-row>
      <el-row>
        <el-input v-model="config.annotation2Label"
                  @change="handleChange"></el-input>
      </el-row>
      <el-row type="flex"
              align="middle">
        <el-color-picker show-alpha
                         v-model="config.annotation2Color"
                         @change="handleChange"></el-color-picker>
        <el-input-number :min="10"
                         :max="30"
                         :precision="0"
                         controls-position="right"
                         v-model="config.annotation2FontSize"
                         @change="handleChange"></el-input-number>
        <el-select v-model="config.annotation2Fontfamily"
                   @change="handleChange">
          <el-option v-for="item in fontFamilyOptions"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value"></el-option>
        </el-select>
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
import { fontFamilyOptions } from '@/views/EditChartView/constant.js';
export default {
  name: 'Pie2Config',
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

        // 注释的配置
        noteLabel: '注释',
        noteColor: '#fff',
        noteFontSize: 16,
        noteFamily: 'sans-serif,Microsoft YaHei',
        noteTextAlign: 'left',
        noteFontWeight: 'normal',
        noteShowStatus: false,

        // 标签栏配置
        tabsShow: false,
        tabSlidePeriod: 60, // 轮播间隔 单位秒
        tabActiveIndex: 0, // 当前高亮的标签
        tabKey: 'test', // 用于查询的key
        tabs: [
          { label: '标签1', value: '1' },
          { label: '标签2', value: '2' },
          { label: '标签3', value: '3' }
        ],
        // 环形图注释1
        annotation1Show: true,
        annotation1Label: '环形图注释1',
        annotation1Color: '#5ab3fe',
        annotation1FontSize: 14,
        annotation1Fontfamily: 'sans-serif,Microsoft YaHei',

        // 环形图注释2
        annotation2Show: true,
        annotation2Label: '环形图注释2',
        annotation2Color: '#5ab3fe',
        annotation2FontSize: 14,
        annotation2Fontfamily: 'sans-serif,Microsoft YaHei'
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
      config: {
        // 标题的配置
        titleLabel: '标题',
        titleColor: 'rgb(83, 226, 255)',
        titleFontSize: 18,
        titleFamily: 'sans-serif,Microsoft YaHei',
        titleTextAlign: 'left',
        titleFontWeight: 'normal',
        titleShowStatus: true,

        // 注释的配置
        noteLabel: '注释',
        noteColor: '#fff',
        noteFontSize: 16,
        noteFamily: 'sans-serif,Microsoft YaHei',
        noteTextAlign: 'left',
        noteFontWeight: 'normal',
        noteShowStatus: false,

        // 标签栏配置
        tabsShow: false,
        tabSlidePeriod: 60, // 轮播间隔 单位秒
        tabActiveIndex: 0, // 当前高亮的标签
        tabKey: 'test', // 用于查询的key
        tabs: [
          { label: '标签1', value: '1' },
          { label: '标签2', value: '2' },
          { label: '标签3', value: '3' }
        ],
        // 环形图注释1
        annotation1Show: true,
        annotation1Label: '环形图注释1',
        annotation1Color: '#5ab3fe',
        annotation1FontSize: 14,
        annotation1Fontfamily: 'sans-serif,Microsoft YaHei',

        // 环形图注释2
        annotation2Show: true,
        annotation2Label: '环形图注释2',
        annotation2Color: '#5ab3fe',
        annotation2FontSize: 14,
        annotation2Fontfamily: 'sans-serif,Microsoft YaHei'
      },
      fontFamilyOptions: fontFamilyOptions
    };
  },
  created() {
    this.config = cloneDeep(this.componentConfig);
  },
  methods: {
    handletabActiveIndexChange(val) {
      //   this.config.tabActiveIndex = val % this.config.tabs.length;
      this.$emit('change', this.config);
    },
    handleChange() {
      this.$emit('change', this.config);
    },
    handleDeleteTab(index) {
      this.config.tabs.splice(index, 1);
      this.$emit('change', this.config);
    },
    handleAddTab() {
      this.config.tabs.push({
        label: '标签',
        value: ''
      });
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

.flexrow {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;

  .add-img {
    margin-left: 8px;
  }

  img {
    cursor: pointer;
  }
}

.flex {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;

  > span {
    flex: 0 0 42px;
  }
}
</style>
