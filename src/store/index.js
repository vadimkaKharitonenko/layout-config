import Vue from 'vue';
import Vuex from 'vuex';
import counter from './modules/counter';

Vue.use(Vuex);

const vuexLogger = store => {
  store.subscribe((mutation, state) => {
    console.log(mutation, state);
  });
};

export const store = new Vuex.Store({
  modules: {
    counter
  },
  plugins: [vuexLogger] // TODO: remove logger for production version
});