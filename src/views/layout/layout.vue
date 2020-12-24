/* 这部分自己布局 */
<template>
  <div class="layout-container">
    <div class="sidebar-container">
      <!-- 使用el-menu渲染即可 -->
      <div class="nav">
        <router-link to="/test">test</router-link>
      </div>
      <div class="nav">
        <router-link to="/edit-chart-view">edit-chart-view</router-link>
      </div>
      <div class="nav">
        <router-link to="/basicDataManagement">基础数据管理</router-link>
      </div>
      <div class="nav">
        <router-link to="/businessDataManagement">业务数据管理</router-link>
      </div>
      <div class="nav">
        <router-link to="/externalDataManagement">外部数据管理</router-link>
      </div>
      <div class="nav">
        <router-link to="/listOfTopics">主题列表</router-link>
      </div>
      <div class="nav">
        <router-link to="/theIndexList">指标列表</router-link>
      </div>
      <div class="nav">
        <router-link to="/serviceMonitoringManagement">服务监测</router-link>
      </div>
      <div class="nav">
        <router-link to="/logQuery">日志管理</router-link>
      </div>
    </div>
    <div class="header-content-container">
      <div class="header-container">
        <h1>header</h1>
        <el-button>asdas</el-button>
        <el-button>asdas</el-button>
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

    > .nav {
      margin: 10px 10px 0;
      padding: 10px;
      border: 1px solid #ccc;
    }

    a {
      color: #000;
    }
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
