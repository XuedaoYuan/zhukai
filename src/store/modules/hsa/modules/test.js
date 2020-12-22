export default {
  namespaced: true,
  /* 
  // 如果需要重用不污染，写成function
  state() {
    return {
      count: 0
    };
  }, */
  state: {
    count: 0
  },
  getters: {
    doubleCount: (state) => {
      return state.count * 2;
    }
  },
  mutations: {
    addCount(state, n) {
      state.count += n;
    }
  },
  actions: {
    addCountAsync({ state, commit, dispatch }, { n }) {
      commit('addCount', n);
    },
    addCountAsync2({ state, commit, dispatch }, { n }) {
      dispatch('addCountAsync', { n });
      //   if action from other modules, use param { root: true }
      //   dispatch('hsa/test/addCountAsync', { n }, { root: true });
    }
  }
};
