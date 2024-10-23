<script setup>
import Carrot from './components/CarrotComponent.vue';
</script>

<template>
  <div id="app">
    <Carrot />
  </div>
</template>

<style scoped>
#app {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  background: linear-gradient(135deg, #ff0099, #493240, #1e5799, #66ffcc);
  background-size: 400% 400%;
  animation: gradientAnimation 10s ease infinite; /* Smooth transition */
}

@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
