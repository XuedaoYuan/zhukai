<template>
  <div class="date-picker__container">
    <el-date-picker clearable
                    type="date"
                    class="hsa-el-date-picker"
                    v-model="date"
                    value-format="yyyy-MM-dd"
                    @change="handleChange"></el-date-picker>
  </div>
</template>

<script>
import { DatePicker } from 'element-ui';
export default {
  name: 'DatePicker',
  props: {
    i: {
      type: String | Number,
      required: true
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
  methods: {
    handleChange() {
      this.$eventBus.$emit(this.i + '', this.date);
    }
  }
};
</script>

<style scoped>
.date-picker__container {
  width: 100%;
  height: 100%;
}
</style>
