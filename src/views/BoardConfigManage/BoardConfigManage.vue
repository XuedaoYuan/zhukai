<template>
  <div class="manage-board__container" v-loading="loading">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部大屏" name="0"></el-tab-pane>
      <el-tab-pane label="使用中" name="1"></el-tab-pane>
      <el-tab-pane label="待审核" name="2"></el-tab-pane>
      <el-tab-pane label="待发布" name="3"></el-tab-pane>
      <el-tab-pane label="退回" name="4"></el-tab-pane>
      <el-tab-pane label="已删除" name="5"></el-tab-pane>
    </el-tabs>
    <div class="search__container">
      <div class="search_form">
        <el-form :model="form" label-width="90px" inline>
          <el-form-item label="大屏名称：">
            <el-input clearable @change="handleGetDataList" :style="{width: '200px'}" placeholder="请输入大屏名称" v-model="form.boardName"></el-input>
          </el-form-item>
          <el-form-item label="创建日期：">
            <el-date-picker :style="{width: '200px'}" @change="handleGetDataList" value-format="yyyy-MM-dd" placeholder="请选择日期" type="date" v-model="form.createDate"></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div class="search_btns">
        <el-button size="mini" type="default" @click="handleReset">重置</el-button>
        <el-button size="mini" type="primary" @click="handleSearch">查询</el-button>
      </div>
    </div>
    <div class="content__container">
      <div class="item_container">
        <div class="title-date">
          <div class="title">阿斯达是的阿达</div>
          <div class="date">2020-09-09</div>
        </div>
      </div>
      <div class="item_container">
        <div class="title-date">
          <div class="title">阿斯达是的阿达</div>
          <div class="date">2020-09-09</div>
        </div>
      </div>
      <div class="item_container">
        <div class="title-date">
          <div class="title">阿斯达是的阿达</div>
          <div class="date">2020-09-09</div>
        </div>
      </div>
      <div class="item_container">
        <div class="title-date">
          <div class="title">阿斯达是的阿达</div>
          <div class="date">2020-09-09</div>
        </div>
      </div>
      <div class="item_container add_board-box" @click="handleAddBoard">
        <img src="../../assets/add.png" width="52" class="add-icon" />
        <p class="add-text">新增大屏</p>
      </div>
    </div>
  </div>
</template>

<script>
import { DatePicker } from 'element-ui';
const CHECK_PENDING = '1'; // 待审核
const PUBLISH_PENDING = '2'; // 待发布
const RETURN_BACK = '3'; // 退回
const DELETED = '4'; // 已删除
const IN_USE = '5'; //  使用中
export default {
  name: 'BoardConfigManage',
  components: {
    'el-date-picker': DatePicker
  },
  data() {
    return {
      loading: false,
      activeName: '0',
      form: {
        boardName: '',
        createDate: ''
      }
    };
  },
  watch: {
    activeName: function (newVal) {
      console.log(newVal);
    }
  },
  created() {
    this.handleGetDataList();
    this.CHECK_PENDING = CHECK_PENDING;
    this.PUBLISH_PENDING = PUBLISH_PENDING;
    this.RETURN_BACK = RETURN_BACK;
    this.DELETED = DELETED;
    this.IN_USE = IN_USE;
  },
  methods: {
    handleReset() {
      for (let key in this.form) {
        this.form[key] = '';
      }
      this.handleGetDataList();
    },
    handleSearch() {
      this.handleGetDataList();
    },
    handleClick(tab) {
      //   console.log(tab);
    },
    handleGetDataList() {
      this.loading = true;
      Promise.resolve()
        .then(() => {})
        .finally(() => {
          this.loading = false;
        });
    },
    handleAddBoard() {
      this.$router.push({
        path: '/board-config-manage/add'
      });
    }
  }
};
</script>

<style scoped lang="stylus">
.manage-board__container {
  background-color: #fff;
  padding: 0 16px;
  height: 100%;
  overflow-y: auto;
}

.search__container {
  display: flex;
  align-items: flex-start;
  position: relative;

  &::after {
    content: ' ';
    position: absolute;
    height: 1px;
    background-color: #F0F0F0;
    left: -16px;
    right: -16px;
    bottom: 0;
  }

  .search_form {
    flex: 1;
  }

  .search_btns {
  }
}

.content__container {
  padding: 16px 0;
  display: flex;
  flex-wrap: wrap;

  .item_container {
    width: 336px;
    height: 190px;
    background-color: #ccc;
    margin: 0 16px 16px 0;
    position: relative;
    cursor: pointer;

    .title-date {
      position: absolute;
      left: 0;
      height: 56px;
      right: 0;
      bottom: 0;
      background-color: rgba(255, 255, 255, 0.3);
      padding-top: 7px;

      .title {
        font-size: 20px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        line-height: 1;
        margin-bottom: 6px;
        text-align: center;
      }

      .date {
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 1;
        text-align: center;
      }
    }
  }

  .add_board-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #EFF2F4;

    &:focus, &:active {
      background-color: rgba(239, 242, 244, 0.8);
    }

    .add-icon {
    }

    .add-text {
      margin-top: 14px;
      font-size: 18px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #CECECE;
      line-height: 1;
      text-align: center;
    }
  }
}
</style>


