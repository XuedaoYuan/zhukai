<template>
  <div class="title1__container"
       v-show="componentConfig.showStatus">
    <span :style="{
        color: componentConfig.color,
        textAlign: componentConfig.textAlign,
        fontSize: componentConfig.fontSize,
        fontFamily: componentConfig.fontFamily}">{{componentConfig.title}}</span>
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
        fontFamily: 'Microsoft Yahei, sans-serif',
        showStatus: true
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
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  span {
    font-family: Microsoft Yahei, sans-serif;
  }
}
</style>
