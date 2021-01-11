<template>
  <div class="select1__wrapper__976567dd">
    <div class="select1__container__0975qsae"
         :style="{
        transform: 'scale('+componentConfig.scale+')'
    }">
      <div class="title">选择：</div>
      <el-select clearable
                 size="medium"
                 v-model="value"
                 value-format="yyyy-MM-dd"
                 @change="handleChange">
        <el-option value="1"
                   label="1"></el-option>
        <el-option value="2"
                   label="2"></el-option>
      </el-select>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Select1',
  props: {
    i: {
      type: String | Number,
      required: true
    },
    componentConfig: {
      type: Object,
      default: () => ({
        title: '选择',
        showStatus: true,
        scale: 1
      })
    }
  },
  components: {},
  data() {
    return {
      value: ''
    };
  },
  created() {
    this.handleChange();
  },
  mounted() {},
  methods: {
    handleChange() {
      this.$eventBus.$emit(this.i + '', this.value);
    }
  }
};
</script>

<style lang="stylus">
.select1__wrapper__976567dd {
  height: 100%;
  width: 100%;
}

.select1__container__0975qsae {
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
    // flex: 0 0 80px;
    height: 36px;
    line-height: 36px;
  }

  div.el-select {
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
