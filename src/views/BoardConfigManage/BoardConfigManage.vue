<template>
  <div class="manage-board__container"
       v-loading="loading">
    <el-tabs v-model="activeName"
             @tab-click="handleClick">
      <el-tab-pane :label="'全部大屏('+statForm.stasCount+')'"
                   name="0"></el-tab-pane>
      <el-tab-pane :label="'使用中('+statForm.inUse+')'"
                   :name="IN_USE"></el-tab-pane>
      <el-tab-pane :label="'待审核('+statForm.toBeReviewed+')'"
                   :name="CHECK_PENDING"></el-tab-pane>
      <el-tab-pane :label="'待提交('+statForm.toBeReleased+')'"
                   :name="PUBLISH_PENDING"></el-tab-pane>
      <el-tab-pane :label="'驳回('+statForm.returnScr+')'"
                   :name="RETURN_BACK"></el-tab-pane>
      <el-tab-pane :label="'已删除('+statForm.deleted+')'"
                   :name="DELETED"></el-tab-pane>
    </el-tabs>
    <div class="search__container">
      <div class="search_form">
        <el-form :model="form"
                 label-width="90px"
                 inline>
          <el-form-item label="大屏名称：">
            <el-input clearable
                      @change="handleGetDataList"
                      :style="{width: '200px'}"
                      placeholder="请输入大屏名称"
                      v-model="form.screenName"></el-input>
          </el-form-item>
          <el-form-item label="创建日期：">
            <!-- default-time="00:00:00"  HH:mm:ss-->
            <el-date-picker :style="{width: '200px'}"
                            @change="handleGetDataList"
                            value-format="yyyy-MM-dd"
                            
                            placeholder="请选择日期"
                            type="date"
                            v-model="form.crteTime"></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div class="search_btns">
        <el-button size="mini"
                   type="default"
                   @click="handleReset">重置</el-button>
        <el-button size="mini"
                   type="primary"
                   @click="handleSearch">查询</el-button>
      </div>
    </div>
    <div class="content__container">
      <div class="item_container add_board-box"
           @click="handleAddBoard">
        <img src="../../assets/add.png"
             width="52"
             class="add-icon" />
        <p class="add-text">新增大屏</p>
      </div>
      <template v-if="boardList && boardList.length > 0">
        <div class="item_container"
             v-for="item in boardList"
             :key="item.scrId"
             @click="handleBoardClick(item)">
          <img class="bg-img"
               v-if="item.scrThum"
               :src="item.scrThum"
               alt="">
          <div class="title-date">
            <div class="title"
                 v-if="item.scrName">{{item.scrName}}</div>
            <div class="title"
                 v-else>未命名</div>
            <div class="date"
                 v-if="item.updtTime ">{{item.updtTime}}</div>
            <div class="date"
                 v-else>--</div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { DatePicker } from 'element-ui';
import {
  getScreenList,
  getScreenCount
} from '@/views/EditChartView/api/index.js';
const CHECK_PENDING = '1'; // 待审核
const PUBLISH_PENDING = '2'; // 待提交
const RETURN_BACK = '3'; // 驳回
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
        // status: false,
        screenName: '',
        crteTime: ''
      },
      statForm: {
        deleted: 0,
        inUse: 0,
        returnScr: 0,
        stasCount: 0,
        toBeReleased: 0,
        toBeReviewed: 0
      },
      boardList: [
        /* {
          crter: null,
          rejectReason: null,
          scrId: '',
          scrName: '',
          updtTime,
          scrThum: ''
        } */
      ]
    };
  },
  watch: {
    activeName: function (newVal) {
      // this.form.status = newVal;
      this.handleGetDataList();
    }
  },
  created() {
    this.handleGetDataList();
    this.handleGetCouunt();
    this.CHECK_PENDING = CHECK_PENDING;
    this.PUBLISH_PENDING = PUBLISH_PENDING;
    this.RETURN_BACK = RETURN_BACK;
    this.DELETED = DELETED;
    this.IN_USE = IN_USE;
  },
  methods: {
    handleGetCouunt() {
      getScreenCount().then((res) => {
        if (res.code === 0 && res.type === 'success') {
          this.statForm = { ...res.data };
        }
      });
    },
    handleReset() {
      for (let key in this.form) {
        this.form[key] = '';
      }
      this.handleGetDataList();
    },
    handleSearch() {
      this.handleGetCouunt();
      this.handleGetDataList();
    },
    handleClick(tab) {
      //   console.log(tab);
    },
    handleGetDataList() {
      const requestData = {};

      for (let key in this.form) {
        const val = this.form[key];
        if (val || val === 0) {
          requestData[key] = val;
        }
      }
      if (this.activeName !== '0') {
        requestData.status = this.activeName;
      } else {
      }
      this.loading = true;
      getScreenList(requestData)
        .then((res) => {
          if (res.code === 0 && res.type === 'success' && res.data) {
            this.boardList = [...res.data];
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleAddBoard() {
      this.$router.push({
        path: '/board-config-manage/add'
      });
    },
    handleBoardClick(item) {
      if (item.status === CHECK_PENDING) {
        this.$message.warning('待审核状态不可编辑');
        return;
      }

      if (item.status === IN_USE) {
        this.$message.warning('使用中状态不可编辑');
        return;
      }

      window.open(`/#/edit-chart-view?code=${item.scrId}`);
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

    .bg-img {
      width: 336px;
      height: 190px;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
    }

    .title-date {
      position: absolute;
      left: 0;
      height: 56px;
      right: 0;
      bottom: 0;
      background-color: rgba(255, 255, 255, 0.3);
      padding-top: 7px;
      z-index: 2;

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


