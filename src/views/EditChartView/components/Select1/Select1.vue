<template>
  <div class="select1__wrapper__976567dd"
       ref="Select1WrapperRef">
    <div class="select1__container__0975qsae"
         :style="{
            transform: 'scale('+scale+')'
         }">
      <div class="title"
           v-if="componentConfig.showStatus"
           :style="{
              color: componentConfig.color,
              fontWeight: componentConfig.fontWeight,
              fontSize: componentConfig.fontSize + 'px',
              fontFamily: componentConfig.fontFamily
            }">{{componentConfig.title}}：</div>
      <el-select clearable
                 size="medium"
                 v-model="value"
                 value-format="yyyy-MM-dd"
                 @change="handleChange">
        <el-option v-for="item in options"
                   :key="item.value"
                   :value="item.value"
                   :label="item.label"></el-option>
      </el-select>

    </div>
  </div>
</template>

<script>
import throttle from 'lodash/throttle';
import { fetch } from '../../axios/index';
export default {
  name: 'Select1',
  props: {
    i: {
      type: String | Number,
      required: true
    },
    componentConfig: {
      type: Object,
      default: () => ({
        title: '选择',
        color: '#fff',
        fontSize: 14,
        fontFamily: 'sans-serif,Microsoft YaHei',
        fontWeight: 'normal',
        showStatus: true,
        data: null
      })
    }
  },
  components: {},
  data() {
    return {
      value: '',
      options: [],
      scale: 1
    };
  },
  created() {
    this.initData();
    this.handleChange();
    this._resizehandlerThrottle = throttle(this.resizehandler, 100);
  },
  mounted() {
    this._resizeObserver = new ResizeObserver(this._resizehandlerThrottle);
    this._resizeObserver.observe(this.$refs['Select1WrapperRef']);
  },
  beforeDestroy() {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }
  },
  methods: {
    /* 初始化下拉框的数据 */
    initData() {
      if (this.componentConfig && this.componentConfig.data) {
        const data = this.componentConfig.data;
        switch (data.businessType) {
          case '指标库导入': {
            // ...
            break;
          }

          case '静态数据': {
            try {
              this.options = JSON.parse(data.staticData);
            } catch (error) {
              this.options = [];
            }
            break;
          }

          case '自定义API': {
            const params = {};
            if (data.apiUrlParamList && data.apiUrlParamList.length > 0) {
              for (let item of data.apiUrlParamList) {
                if (item.key && item.value) {
                  params[item.key] = item.value;
                }
              }
            }
            fetch({
              url: data.apiUrl,
              method: 'GET',
              params: params
            }).then((res) => {
              this.options = [];
            });
            break;
          }

          default:
            break;
        }
      }
    },
    resizehandler(entries) {
      const dOMRectReadOnly = entries[0];
      const contentRect = dOMRectReadOnly.contentRect;
      const width = contentRect.width;
      const scale = width / 248;
      this.scale = scale;
      this.$emit('resize', {
        contentRect,
        i: this.i,
        initialW: 248,
        initialH: 36,
        scaleNew: scale,
        componentName: 'Select1'
      });
    },
    handleChange() {
      this.$eventBus.$emit(this.i + '', this.value);
    }
  }
};
</script>

<style lang="stylus">
.select1__wrapper__976567dd {
  height: 100%;
  width: 100%;
}

.select1__container__0975qsae {
  width: 248px;
  display: flex;
  align-items: center;
  padding: 0 4px;
  height: 36px;
  transform-origin: left top;

  .title {
    font-size: 14px;
    line-height: 1;
    color: #e2f8ff;
    // margin-right: 20px;
    // flex: 0 0 80px;
    height: 36px;
    line-height: 36px;
  }

  div.el-select {
    flex: 1;
    height: 36px;

    .el-input__inner {
      background-color: rgba(69, 123, 212, 0.24);
      border: 1px solid #158dd7;
      border-radius: 4px;
      color: #1ec9e4;
    }

    .el-input__prefix .el-input__icon {
      color: #1ec9e4;
    }
  }
}
</style>
