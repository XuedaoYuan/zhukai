<template>
  <div class="title1__container"
       v-show="componentConfig.showStatus"
       :style="{justifyContent: justifyContent}">
    <span :style="{
        color: componentConfig.color,
        fontSize: componentConfig.fontSize + 'px',
        fontFamily: componentConfig.fontFamily}">{{componentConfig.title}}{{componentConfig.fontSize}}</span>
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
        fontSize: 16,
        fontFamily: 'Microsoft Yahei, sans-serif',
        showStatus: true
      })
    }
  },
  computed: {
    justifyContent: function () {
      switch (this.componentConfig.textAlign) {
        case 'left':
          return 'flex-start';
        case 'center':
          return 'center';
        case 'right':
          return 'flex-end';

        default:
          return 'center';
      }
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
  justify-content: center;

  span {
    font-family: Microsoft Yahei, sans-serif;
  }
}
</style>
