
<template>
  <!-- 测试联动的组件 -->
  <div class="test-link_container">
    <h3>{{componentConfig.title}}</h3>
    <span>{{componentConfig.linkedListKey}}{{date}}</span>
  </div>
</template>

<script>
export default {
  name: 'TestLink',
  props: {
    componentConfig: {
      type: Object,
      required: true,
      default: () => ({
        title: '联动组件',
        linkedListKey: []
      })
    }
  },
  data() {
    return {
      date: ''
    };
  },
 /*  watch: {
    'componentConfig.linkedListKey': function (oldVal, newVal) {
      console.log(oldVal, newVal);
      this.removeEventListener(oldVal);
      this.initEventListener();
    }
  }, */
  created() {
    this.initEventListener();
  },
  methods: {
   /*  removeEventListener(oldKeyList) {
      const linkedListKey = this.componentConfig.linkedListKey;
      if (linkedListKey && linkedListKey.length > 0) {
        for (let j = 0; j < linkedListKey.length; j++) {
          const id = linkedListKey[j];
          this.$eventBus.$off(id + '', this.onChange);
        }
      }
    }, */
    initEventListener() {
      const linkedListKey = this.componentConfig.linkedListKey;
      if (linkedListKey && linkedListKey.length > 0) {
        for (let j = 0; j < linkedListKey.length; j++) {
          const id = linkedListKey[j];
          this.$eventBus.$on(id + '', this.onChange);
        }
      }
    },
    onChange(val) {
      console.log(val);
      this.date = val;
    }
  }
};
</script>

<style scoped>
.test-link_container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
