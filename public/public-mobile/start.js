const PORT = 'https://b143-186-168-96-243.ngrok-free.app';
// eslint-disable-next-line no-undef
const socket = io(PORT);

const nameInput = document.getElementById('name');
const name = nameInput.value;
cupcake.name = name;
socketFuntion.updateCupcake(cupcake);
renderOptions('flavor');
screenStart.style.display = 'none';
screenOptions.style.display = 'block';
