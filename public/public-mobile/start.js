const PORT = 'https://a8d0-200-3-193-228.ngrok-free.app';
// eslint-disable-next-line no-undef
const socket = io(PORT);

const screenStart = document.getElementById('start');
const screenWaiting = document.getElementById('waiting');
const screenFrom = document.getElementById('from');

const cupcake = {
    name: 'Name pending...',
    flavor: '',
    icing: '',
    topping: '',
};

const nameInput = document.getElementById('name');

const nameBtn = document.getElementById('nameBtn');
nameBtn.addEventListener('click', () => {
    const userName = nameInput.value;
    cupcake.name = userName;

    socketFuntion.updateCupcake(cupcake);
    socketFuntion.nameFilled(userName);

    screenStart.style.display = 'none';
    screenWaiting.style.display = 'block';
});

socket.on('finishorder', (cup) => {
    window.location.href = './screens/coupon.html';
});
