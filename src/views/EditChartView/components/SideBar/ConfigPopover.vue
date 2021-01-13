<template>
  <div class="config__container">
    <div class="refresh__container">
      <div class="title">定时刷新配置</div>
      <el-select class="refresh-time-select"
                 :popper-append-to-body="false"
                 v-model="period"
                 @change="handleChange">
        <el-option v-for="item in options"
                   :key="item.value"
                   :value="item.value"
                   :label="item.label"></el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfigPopover',
  props: {
    configRefreshPeriod: {
      type: String,
      required: false,
      default: '300000'
    }
  },
  data() {
    return {
      period: '1200000',
      options: [
        { label: '5分钟', value: '300000' },
        { label: '10分钟', value: '600000' },
        { label: '20分钟', value: '1200000' },
        { label: '30分钟', value: '1800000' },
        { label: '1小时', value: '3600000' }
      ]
    };
  },
  created() {
    this.period = this.configRefreshPeriod;
  },
  methods: {
    handleChange() {
      this.$emit('change', this.period);
    }
  }
};
</script>

<style scoped lang="stylus">
.config__container {
  width: 100%;
  background-color: #031A32;
  border: 1px solid #295278;
  padding: 20px 12px;
  height: 314px;
  overflow-y: auto;

  .refresh__container {
    display: flex;
    align-items: center;

    .title {
      margin-right: 10px;
      font-size: 12px;
      flex: 0 0 76px;
      font-weight: 500;
      color: #CDE6FF;
    }
  }
}
</style>
