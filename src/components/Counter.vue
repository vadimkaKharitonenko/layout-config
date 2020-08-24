<template>
  <div class="counter">
    <h2>some vue fragment</h2>

    <span>{{value}}</span>
    
    <button 
      class="counter__increase"
      @click="increase(value)"
      >increase</button>
  </div>
</template>

<script>
import {store} from '../store';

export default {
  name: "Counter",
  methods: {
    increase(value) {
      return store.dispatch('increaseCounter', value + 1);
    },
  },
  computed: {
    value() {
      return store.getters.getValue;
    }
  }
};
</script>

<style scoped>
.counter {
  padding: 16px;
}

.counter__increase {
  padding: 8px;
  color: green;
  cursor: pointer;
}
</style>