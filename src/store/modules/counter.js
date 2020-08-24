const state = {
  value: 0
};

const getters = {
  getValue: state => state.value
};

const mutations = {
  SET_COUNTER: (state, payload) => state.value = payload
};

const actions = {
  increaseCounter: (context, payload) => {
    return context.commit('SET_COUNTER', payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};