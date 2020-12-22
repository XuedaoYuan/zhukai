/* 这部分自己布局 */
<template>
  <div class="layout-container">
    <div class="sidebar-container"></div>
    <div class="header-content-container">
      <div class="header-container">
        <h1>header</h1>
      </div>
      <div class="content-container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'layout',
  data() {
    return {};
  }
};
</script>

<style scoped lang="stylus">
.layout-container {
  display: flex;
  height: 100%;

  .sidebar-container {
    flex: 0 0 180px;
    border-right: 1px solid #ccc;
  }

  .header-content-container {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .header-container {
      flex: 0 0 60px;
      border-bottom: 1px solid #ccc;
    }

    .content-container {
      flex: 1;
      overflow: hidden;
    }
  }
}</style>
