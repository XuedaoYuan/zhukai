import Vue from 'vue';
import Vuex from 'vuex';

import hsa from './modules/hsa';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    hsa
  }
});
