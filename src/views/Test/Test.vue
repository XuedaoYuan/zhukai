<template>
  <div>
    <h1 class="h1_title">test</h1>
    <div>
      <el-divider content-position="left">测试全局el注册组件</el-divider>

      <el-button>button</el-button>
      <el-button type="primary">button</el-button>
      <el-input v-model="value" placeholder="please input"></el-input>
      <div>{{value}}</div>
      <el-divider content-position="left">Vuex Demo</el-divider>
      <h2>count: {{count}}-----doubleCount:{{doubleCount}}</h2>
      <div>
        <el-button @click="hadnleAdd_1_Sync">add 1 sync</el-button>
        <el-button @click="hadnleAdd_10_Async">add 10 async</el-button>
        <el-button @click="hadnleAdd_20_AsyncByDispatch">add 20 async by dispatch</el-button>
      </div>
      <div>
        <el-button @click="$eventBus.$emit('testmsg')">$emit</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// lodash 推荐用法
import concat from 'lodash/concat';
import { testApi } from '@/api/Test/index.js';
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex';
import { Divider } from 'element-ui';
export default {
  name: 'Test',
  components: {
    // 局部注册组件
    'el-divider': Divider
  },
  data() {
    return {
      value: ''
    };
  },
  computed: {
    ...mapState('hsa/test', ['count']),
    ...mapGetters('hsa/test', ['doubleCount'])
  },
  created() {
    console.log(concat(1, 2, [3]));
    testApi();

    this.$eventBus.$on('testmsg', (event) => {
      console.log(1);
    });
    this.$eventBus.$on('testmsg', (event) => {
      console.log(2);
    });
  },
  methods: {
    ...mapMutations('hsa/test', ['addCount']),
    ...mapActions('hsa/test', ['addCountAsync', 'addCountAsync2']),
    hadnleAdd_1_Sync() {
      this.addCount(1);
    },
    hadnleAdd_10_Async() {
      this.addCountAsync({ n: 10 });
    },
    hadnleAdd_20_AsyncByDispatch() {
      this.addCountAsync2({ n: 20 });
    }
  }
};
</script>

<style scoped lang="stylus">
.h1_title {
  color: $main-color;
}
</style>
