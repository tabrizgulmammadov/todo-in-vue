const state = {
  searchParams: {},
};

const getters = {
  getSearchParams: (state) => state.searchParams,
};

const actions = {
  setSearchParams({ commit }, searchParams) {
    commit("SET_SEARCH_PARAMS", searchParams);
  },
};

const mutations = {
  SET_SEARCH_PARAMS(state, searchParams) {
    state.searchParams = searchParams;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
