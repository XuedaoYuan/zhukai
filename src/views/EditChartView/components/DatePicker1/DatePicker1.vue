<template>
  <div class="date-picker1__wrapper__976567dd"
       ref="DatePicker1WrapperRef">
    <div class="date-picker__container__0975qsae"
         :style="{
        transform: 'scale('+componentConfig.scaleX+', '+componentConfig.scaleY+')'
    }">
      <div class="title">选择日期：</div>
      <el-date-picker clearable
                      size="medium"
                      type="date"
                      class="hsa-el-date-picker"
                      v-model="date"
                      value-format="yyyy-MM-dd"
                      @change="handleChange"></el-date-picker>
    </div>
  </div>
</template>

<script>
import { DatePicker } from 'element-ui';
export default {
  name: 'DatePicker1',
  props: {
    i: {
      type: String | Number,
      required: true
    },
    componentConfig: {
      type: Object,
      default: () => ({
        title: '选择日期',
        showStatus: true,
        scaleX: 1,
        scaleY: 1
      })
    }
  },
  components: {
    'el-date-picker': DatePicker
  },
  data() {
    return {
      date: new Date()
    };
  },
  created() {
    this.handleChange();
  },
  mounted() {},
  methods: {
    handleChange() {
      this.$eventBus.$emit(this.i + '', this.date);
    }
  }
};
</script>

<style lang="stylus">
.date-picker1__wrapper__976567dd {
  height: 100%;
  width: 100%;
}

.date-picker__container__0975qsae {
  width: 248px;
  display: flex;
  align-items: center;
  padding: 0 4px;
  height: 36px;
  transform-origin: left top;

  .title {
    font-size: 14px;
    line-height: 1;
    color: #e2f8ff;
    // margin-right: 20px;
    flex: 0 0 80px;
    height: 36px;
    line-height: 36px;
  }

  div.el-date-editor {
    flex: 1;
    height: 36px;

    .el-input__inner {
      background-color: rgba(69, 123, 212, 0.24);
      border: 1px solid #158dd7;
      border-radius: 4px;
      color: #1ec9e4;
    }

    .el-input__prefix .el-input__icon {
      color: #1ec9e4;
    }
  }
}
</style>
