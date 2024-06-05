function generateRandomCode() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';

    let randomLetters = '';
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 3; i++) {
        randomLetters += letters.charAt(Math.floor(Math.random() * letters.length));
    }

    let randomNumbers = '';
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 3; i++) {
        randomNumbers += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }

    return `${randomLetters}-${randomNumbers}`;
}

// Generar el código de descuento y mostrarlo
const discountCode = generateRandomCode();
document.getElementById('discount').innerText = discountCode;

// Guardar el código de descuento en Supabase
fetch('/coupon/save', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ discountCode }),
})
    .then((response) => response.json())
    .then((data) => {
        if (data.message) {
            console.log(data.message);
        }
    })
    .catch((error) => console.error('Error saving coupon:', error));

// Redirigir a la página de inicio de sesión al hacer clic en el botón
document.getElementById('buyNowButton').addEventListener('click', () => {
    window.location.href = '/mobile/sign_up.html';
});
