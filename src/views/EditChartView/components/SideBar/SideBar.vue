<template>
  <div class="side-bar__container">
    <el-popover
      placement="right-start"
      width="400"
      :visible-arrow="false"
      @show="activeItem = 'bg'"
    >
      <slot name="bgPopover"></slot>
      <div class="side-item" slot="reference">
        <img
          src="../../assets/bg.png"
          :class="{ active: activeItem === 'bg' }"
          width="38"
          alt=""
        />
        <el-button type="text"> 设置背景 </el-button>
      </div>
    </el-popover>
    <el-popover
      placement="right-start"
      width="400"
      :visible-arrow="false"
      @show="activeItem = 'config'"
    >
      <div class="side-item" slot="reference">
        <img
          src="../../assets/size.png"
          :class="{ active: activeItem === 'config' }"
          width="38"
          alt=""
        />
        <el-button type="text"> 大屏配置 </el-button>
      </div>
    </el-popover>
    <el-popover
      placement="right-start"
      width="400"
      :visible-arrow="false"
      @show="activeItem = 'size'"
    >
      <div class="side-item" slot="reference">
        <img
          src="../../assets/size.png"
          :class="{ active: activeItem === 'size' }"
          width="38"
          alt=""
        />
        <el-button type="text"> 页面尺寸 </el-button>
      </div>
    </el-popover>
    <el-popover
      placement="right-start"
      width="400"
      :visible-arrow="false"
      @show="activeItem = 'component'"
      popper-class="popover"
    >
      <component-popover 
        @pie1Click="$emit('pie1Click')"
      />
      <div class="side-item" slot="reference">
        <img
          src="../../assets/component.png"
          :class="{ active: activeItem === 'component' }"
          width="38"
          alt=""
        />
        <el-button type="text"> 组件库 </el-button>
      </div>
    </el-popover>
  </div>
</template>

<script>
import { Popover } from "element-ui";
export default {
  components: {
    "el-popover": Popover,
    // "bg-popover": () => import("./BgPopover"),
    "config-popover": () => import("./ConfigPopover"),
    "size-popover": () => import("./SizePopover"),
    "component-popover": () => import("./ComponentPopover"),
    
  },
  data() {
    return {
      activeItem: "", // bg | config | size | component
    };
  },
  watch: {
    activeItem: function (newVal, oldVal) {
      console.log("old ==> ", oldVal, "ac", newVal);
    },
  },
};
</script>

<style lang="stylus">
// 因为要修改 popover 样式，所以不加 scoped
.side-bar__container {
  width: 70px;
  height: 100%;
  background: #002140;
  border: 1px solid #295278;
  border-top: none;
  padding-top: 30px;

  .side-item {
    margin-bottom: 25px;
    display: flex;
    align-items: center;
    flex-direction: column;
    cursor: pointer;

    & .active {
      border: 1px dashed white;
    }
  }
}
.popover {
  width: 436px;
  height: 494px;
  background: #031A32;
  border: 1px solid #295278;
}
</style>
