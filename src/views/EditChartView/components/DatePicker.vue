<template>
  <div class="date-picker__container">
    <el-date-picker clearable
                    class="hsa-el-date-picker"
                    v-model="date"></el-date-picker>
  </div>
</template>

<script>
import { DatePicker } from 'element-ui';
export default {
  name: 'DatePicker',
  components: {
    'el-date-picker': DatePicker
  },
  data() {
    return {
      date: ''
    };
  }
};
</script>

<style scoped>
.date-picker__container {
  width: 100%;
  height: 100%;
}
</style>
