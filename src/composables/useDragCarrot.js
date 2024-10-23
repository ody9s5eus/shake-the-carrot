import { ref } from 'vue';

export function useDragCarrot(carrotPosition) {
  const isDragging = ref(false);
  const initialPosition = ref({ x: 0, y: 0 });

  const centerCarrot = () => {
    const { innerWidth, innerHeight } = window;
    const carrotDiameter = 100;
    initialPosition.value.x = (innerWidth - carrotDiameter) / 2;
    initialPosition.value.y = (innerHeight - carrotDiameter) / 2;
    carrotPosition.value = { ...initialPosition.value };
  };

  const startDrag = (event) => {
    event.preventDefault();
    isDragging.value = true;
  };

  const onDrag = (event) => {
    if (isDragging.value) {
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      const clientY = event.touches ? event.touches[0].clientY : event.clientY;
      carrotPosition.value.x = clientX - 50;
      carrotPosition.value.y = clientY - 50;
    }
  };

  const stopDrag = () => {
    if (isDragging.value) {
      isDragging.value = false;
      carrotPosition.value = { ...initialPosition.value };
    }
  };

  return {
    centerCarrot,
    startDrag,
    onDrag,
    stopDrag,
  };
}
