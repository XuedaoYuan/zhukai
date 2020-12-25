<template>
  <div class="title1__container">
    <span>{{componentConfig.title}}</span>
  </div>
</template>

<script>
export default {
  name: 'Title1',
  props: {
    componentConfig: {
      type: Object,
      required: true,
      default: () => ({
        title: '看板标题',
        color: '#fff',
        textAlign: 'center',
        fontSize: '16px',
        fontFamily: 'Microsoft Yahei, sans-serif'
      })
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped lang="stylus">
.title1__container {
  span {
    font-family: Microsoft Yahei, sans-serif;
  }
}
</style>
