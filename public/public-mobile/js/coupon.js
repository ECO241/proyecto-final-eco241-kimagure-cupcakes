const PORT = 'https://a262-186-168-96-243.ngrok-free.app';
const socket = io(PORT);

/* eslint-disable no-plusplus */
// Función para generar una cadena aleatoria de 3 letras
function generateRandomLetters() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 3; i++) {
        result += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return result;
}

// Función para generar una cadena aleatoria de 3 números
function generateRandomNumbers() {
    const numbers = '0123456789';
    let result = '';
    for (let i = 0; i < 3; i++) {
        result += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    return result;
}

// Función para generar el cupón
function generateCoupon() {
    const letters = generateRandomLetters();
    const numbers = generateRandomNumbers();
    return `${letters}-${numbers}`;
}

// Mostrar el cupón en el div #discount
const couponCode = generateCoupon();
document.getElementById('discount').innerText = couponCode;

// Guardar el cupón en el almacenamiento local y redirigir al usuario al archivo sign_up.html
document.getElementById('buyNowButton').addEventListener('click', () => {
    localStorage.setItem('couponCode', couponCode);
    window.location.href = 'sign_up.html';
    socket.emit('restart');
});
