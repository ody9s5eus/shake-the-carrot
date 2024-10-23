<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { useDragCarrot } from '../composables/useDragCarrot';
import carrotImage from '../assets/carrot.png';

const carrotPosition = ref({ x: 0, y: 0 });
const { centerCarrot, startDrag, onDrag, stopDrag } = useDragCarrot(carrotPosition);

onMounted(() => {
  centerCarrot();
  window.addEventListener('mouseup', stopDrag);
  window.addEventListener('mousemove', onDrag);
  window.addEventListener('touchmove', onDrag);
  window.addEventListener('touchend', stopDrag);
});

onBeforeUnmount(() => {
  window.removeEventListener('mouseup', stopDrag);
  window.removeEventListener('mousemove', onDrag);
  window.removeEventListener('touchmove', onDrag);
  window.removeEventListener('touchend', stopDrag);
});

const carrotStyle = computed(() => ({
  transform: `translate(${carrotPosition.value.x}px, ${carrotPosition.value.y}px)`,
}));
</script>

<template>
  <div class="carrot" 
      :style="carrotStyle" 
      @mousedown="startDrag" 
      @touchstart="startDrag">
    <img :src="carrotImage"/>
  </div>
</template>

<style scoped>
.carrot {
  width: 100px;
  height: 100px;
  position: absolute;
  cursor: pointer;
  user-select: none;
  touch-action: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
</style>
