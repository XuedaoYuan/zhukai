<template>
  <el-container>
    <el-header class="hsa-header_container"
               v-show="false"><span style="font-size:24px;color:#fff;"><i class="el-icon-first-aid-kit"></i>海南医保管家</span></el-header>
    <el-container>
      <el-aside class="hsa-aside_container"
                width="200px">
        <el-row class="tac">
          <el-col>
            <el-menu router
                     :default-active="defaultActive"
                     class="el-menu-vertical-demo"
                     background-color="#104895"
                     text-color="#fff"
                     active-text-color="#ffd04b">
              <el-submenu index="/">
                <template v-slot:title>
                  <i class="el-icon-location"></i>
                  <span>数据管理</span>
                </template>
                <el-menu-item index="/basicDataManagement">
                  <template v-slot:title>
                    <span>基础数据管理</span>
                  </template>
                </el-menu-item>
                <el-menu-item index="/businessDataManagement">
                  <template v-slot:title>
                    <span>业务数据管理</span>
                  </template>
                </el-menu-item>
                <el-menu-item index="/externalDataManagement">
                  <template v-slot:title>
                    <span>外部数据管理</span>
                  </template>
                </el-menu-item>
              </el-submenu>
              <el-submenu index="/board-config-manage">
                <!-- 大屏编辑测试菜单 -->
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>大屏控制模块</span>
                </template>
                <!-- <el-menu-item index="">
                  <template v-slot:title>
                    <router-link class="TestVueGridLayout-link"
                                 to="/TestVueGridLayout"
                                 target="_blank">大屏编辑</router-link>
                  </template>
                </el-menu-item> -->
                <el-menu-item index="/board-config-manage/add">
                  <template v-slot:title>
                    <span>大屏配置管理</span>
                  </template>
                </el-menu-item>

              </el-submenu>
              <!-- <el-submenu index="5">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>指标管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="5-1"><router-link to="/screeningOfMonitoringIndicators"><span style="color:#fff">指标筛选</span></router-link></el-menu-item>
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
                  <el-menu-item index="3-1"><router-link to="/serviceMonitoringManagement"><span style="color:#fff">服务监测</span></router-link></el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="4">
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
      <div class="hsa-tabs__container">预留标签栏</div>
      <el-main class="hsa-main_container">
        <!-- <div class="content-box"
             :class="{'content-collapse':collapse}">
          <v-tags></v-tags>
          <div class="content">
            
            <el-backtop target=".content"></el-backtop>
          </div>
        </div> -->

        <transition name="transitionRouter">
          <keep-alive :include="tagsList">
            <router-view></router-view>
          </keep-alive>
        </transition>
      </el-main>
      <!-- <el-main><router-view></router-view></el-main> -->
      <!-- <main-content /> -->
    </el-container>
  </el-container>
</template>

<script>
import {
  Container,
  Header,
  Aside,
  Main,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Backtop
} from 'element-ui';
// import MainContent from './main-content'
// import bus from './bus';
// import vTags from './Tags.vue';

export default {
  name: 'layout',
  components: {
    'el-container': Container,
    'el-header': Header,
    'el-aside': Aside,
    'el-main': Main,
    'el-menu': Menu,
    'el-submenu': Submenu,
    'el-menu-item': MenuItem,
    'el-menu-item-group': MenuItemGroup,
    'el-backtop': Backtop
    // MainContent,
    // vTags,
  },
  data() {
    return {
      tagsList: [],
      collapse: false,
      defaultActive: '/'
    };
  },
  created() {
    /*  bus.$on('collapse-content', msg => {
            this.collapse = msg;
        });

        // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
        bus.$on('tags', msg => {
            let arr = [];
            for (let i = 0, len = msg.length; i < len; i++) {
                msg[i].name && arr.push(msg[i].name);
            }
            console.log(arr,"arr")
            this.tagsList = arr;
        }); */
    this.handleSetDefaultActive();
  },
  watch: {
    $route(from, to) {
      this.handleSetDefaultActive();
    }
  },
  methods: {
    handleSetDefaultActive() {
      const routePath = this.$route.path;
      this.defaultActive = routePath;
    }
  }
};
</script>
<style lang="stylus" scoped>
.TestVueGridLayout-link {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  text-align: left;
  padding-left: 40px;
  color: #fff;
}
</style>

<style lang="stylus">
.transitionRouter-enter-active, .transitionRouter-leave-active {
  transition: all 0.4s ease-in;
}

.transitionRouter-enter, .transitionRouter-leave {
  transform: translate3d(100%, 0, 0);
}

.el-header.hsa-header_container {
  background-color: #1b64bb;
  position: relative;
  width: 100%;
  height: 56px;
  display: flex;
  /* justify-content: center; */
  align-items: center;
}

.el-aside.hsa-aside_container {
  /* background-color: #104895; */
  display: block;
  position: absolute;
  left: 0;
  top: 60px;
  bottom: 0;
}

.hsa-tabs__container {
  position: absolute;
  left: 200px;
  right: 0;
  top: 60px;
  height: 50px;
  background-color: #fff;
  width: 100%;
}

.el-main.hsa-main_container {
  position: absolute;
  left: 200px;
  right: 0;
  top: 110px;
  bottom: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 16px;
  background-color: #f1f2f6;
}
</style>
