<template>
  <el-collapse-item title="标题">
    <el-input v-model="config.title"
              @change="handleChange"></el-input>

    <span>font-size:</span>
    <el-input v-model="config.fontSize"
              @change="handleChange">
      <template slot="suffix">px</template>
    </el-input>
    <span>text-align</span>
    <el-radio-group v-model="config.textAlign"
                    @change="handleChange">
      <el-radio-button label="left">左</el-radio-button>
      <el-radio-button label="center">中</el-radio-button>
      <el-radio-button label="right">右</el-radio-button>
    </el-radio-group>
    <span>颜色</span>
    <el-color-picker size="mini" v-model="config.color" @change="handleChange"></el-color-picker>
  </el-collapse-item>
</template>

<script>
import { CollapseItem, RadioGroup, RadioButton, ColorPicker } from 'element-ui';
export default {
  name: 'Title1Config',
  components: {
    'el-collapse-item': CollapseItem,
    'el-radio-group': RadioGroup,
    'el-radio-button': RadioButton,
    'el-color-picker': ColorPicker
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
        fontFamily: 'Microsoft Yahei',
        showStatus: true
      })
    }
  },
  data() {
    return {
      config: {
        title: '看板标题',
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'Microsoft Yahei',
        showStatus: true
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

<style scoped>
</style>
