import { ref } from 'vue';

export function useDragCarrot(carrotPosition) {
  const isDragging = ref(false);
  const initialPosition = ref({ x: 0, y: 0 });
  const velocity = ref({ x: 0, y: 0 });
  const lastMousePosition = ref({ x: 0, y: 0 });
  const momentumFrame = ref(null);

  const springStrength = 0.05;
  const damping = 0.9;

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

    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const clientY = event.touches ? event.touches[0].clientY : event.clientY;

    lastMousePosition.value = { x: clientX, y: clientY };

    if (momentumFrame.value) {
      cancelAnimationFrame(momentumFrame.value);
      momentumFrame.value = null;
    }
  };

  const onDrag = (event) => {
    if (isDragging.value) {
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      const clientY = event.touches ? event.touches[0].clientY : event.clientY;

      carrotPosition.value.x = clientX - 50;
      carrotPosition.value.y = clientY - 50;

      velocity.value.x = (clientX - lastMousePosition.value.x);
      velocity.value.y = (clientY - lastMousePosition.value.y);

      lastMousePosition.value = { x: clientX, y: clientY };
    }
  };

  const applySpringPhysics = () => {
    const forceX = (initialPosition.value.x - carrotPosition.value.x) * springStrength;
    const forceY = (initialPosition.value.y - carrotPosition.value.y) * springStrength;

    velocity.value.x += forceX;
    velocity.value.y += forceY;

    velocity.value.x *= damping;
    velocity.value.y *= damping;

    carrotPosition.value.x += velocity.value.x;
    carrotPosition.value.y += velocity.value.y;

    if (Math.abs(velocity.value.x) > 0.5 || Math.abs(velocity.value.y) > 0.5) {
      momentumFrame.value = requestAnimationFrame(applySpringPhysics);
    } else {
      carrotPosition.value = { ...initialPosition.value };
    }
  };

  const stopDrag = () => {
    if (isDragging.value) {
      isDragging.value = false;
      momentumFrame.value = requestAnimationFrame(applySpringPhysics);
    }
  };

  return {
    centerCarrot,
    startDrag,
    onDrag,
    stopDrag,
  };
}
