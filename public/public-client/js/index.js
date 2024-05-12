console.log('hpta');

const { randomFunction } = require('./screens/default');

const startButton = document.getElementById('startButton');

startButton.addEventListener('click', () => {
    console.log('button index');
    randomFunction();
});
