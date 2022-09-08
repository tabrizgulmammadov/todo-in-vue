const state = {
  navigationDrawer: true,
};

const getters = {
  getNavigationDrawer: (state) => state.navigationDrawer,
};

const actions = {
  setNavigationDrawer({ commit }) {
    commit("SET_NAVIGATION_DRAWER");
  },
};

const mutations = {
  SET_NAVIGATION_DRAWER(state) {
    state.navigationDrawer = !state.navigationDrawer;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
