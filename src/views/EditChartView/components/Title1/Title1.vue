<template>
  <div class="title1__container"
       :style="{justifyContent: justifyContent}">
    <div class="bg"></div>
    <span v-show="componentConfig.showStatus"
          :style="{
        fontWeight: componentConfig.fontWeight,
        color: componentConfig.color,
        fontSize: componentConfig.fontSize + 'px',
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
        fontSize: 16,
        fontWeight: 'normal',
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
  position: relative;

  .bg {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 10%;
    right: 10%;
    background-image: url('../../assets/title1_bg.png');
    background-size: 100% 100%;
    background-origin: center center;
    background-repeat: no-repeat;
    z-index: 1;
  }

  span {
    font-family: Microsoft Yahei, sans-serif;
    position: relative;
    z-index: 2;
  }
}
</style>
