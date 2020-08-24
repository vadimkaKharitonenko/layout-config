import Vue from 'vue';
import { store } from '../store/index';
import Counter from './Counter.vue';

export default new Vue({
  el: '#app',
  store,
  render: (h) => h(Counter)
});
