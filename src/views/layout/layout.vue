<template>
  <el-container>
    <el-header><span style="font-size:24px;color:#fff;"><i class="el-icon-first-aid-kit"></i>海南医保管家</span></el-header>
    <el-container>
      <el-aside width="210px">
        <el-row class="tac">
          <el-col>
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              background-color="#104895"
              text-color="#fff"
              active-text-color="#ffd04b"
            >
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>数据管理</span>
                </template>
                <el-menu-item-group>
                  <!-- <template slot="title">分组一</template> -->
                  <el-menu-item index="1-1"><router-link to="/basicDataManagement"><span style="color:#fff">基础数据管理</span></router-link></el-menu-item>
                  <el-menu-item index="1-2"><router-link to="/businessDataManagement"><span style="color:#fff">业务数据管理</span></router-link></el-menu-item>
                  <el-menu-item index="1-3"><router-link to="/externalDataManagement"><span style="color:#fff">外部数据管理</span></router-link></el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>指标管理</span>
                </template>
                <el-menu-item-group>
                  <!-- <template slot="title">分组一</template> -->
                  <el-menu-item index="2-1"><router-link to="/listOfTopics"><span style="color:#fff">主题列表</span></router-link></el-menu-item>
                  <el-menu-item index="2-2"><router-link to="/theIndexList"><span style="color:#fff">指标列表</span></router-link></el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-full-screen"></i>
                  <span>服务监测管理</span>
                </template>
                <el-menu-item-group>
                  <!-- <template slot="title">分组一</template> -->
                  <el-menu-item index="3-1"><router-link to="/serviceMonitoringManagement"><span style="color:#fff">服务监测</span></router-link></el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <!-- <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-notebook-1"></i>
                  <span>日志管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="4-1"><router-link to="/logQuery"><span style="color:#fff">日志查询</span></router-link></el-menu-item>
                </el-menu-item-group>
              </el-submenu> -->
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
import { Container, Header, Aside, Main, Menu, Submenu, MenuItem, MenuItemGroup } from "element-ui"
export default {
  name: "layout",
  components: {
    "el-container":Container,
    "el-header":Header,
    "el-aside":Aside,
    "el-main":Main,
    "el-menu":Menu,
    "el-submenu":Submenu,
    "el-menu-item":MenuItem,
    "el-menu-item-group":MenuItemGroup,
    
  },
  data() {
    return {};
  },
};
</script>

<style>
.el-header {
  background-color: #1b64bb;
  position: relative;
  width: 100%;
  height: 56px;
  display: flex;
	/* justify-content: center; */
	align-items: center;
}
.el-aside {
  background-color: #104895;
  display: block;
  position: absolute;
  left: 0;
  top: 60px;
  bottom: 0;
}
.el-main {
  position: absolute;
  left: 200px;
  right: 0;
  top: 60px;
  bottom: 0;
  overflow-y: scroll;
}
</style>