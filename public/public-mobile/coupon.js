/* eslint-disable no-plusplus */
/* eslint-disable no-alert */
// Función para generar un cupón aleatorio en el formato ABC-123
function generateCoupon() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';

    // Generar 3 letras aleatorias
    let randomLetters = '';
    for (let i = 0; i < 3; i++) {
        randomLetters += letters.charAt(Math.floor(Math.random() * letters.length));
    }

    // Generar 3 números aleatorios
    let randomNumbers = '';
    for (let i = 0; i < 3; i++) {
        randomNumbers += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }

    // Formato final del cupón
    return `${randomLetters}-${randomNumbers}`;
}

// Asignar el cupón generado al elemento con id "discount"
document.addEventListener('DOMContentLoaded', (event) => {
    const discountElement = document.getElementById('discount');
    const couponCode = generateCoupon();
    discountElement.textContent = couponCode;

    // Agregar evento de clic al botón "Buying now"
    const buyNowButton = document.getElementById('buyNowButton');
    buyNowButton.addEventListener('click', () => {
        saveCoupon(couponCode);
    });
});

// Función para guardar el cupón en Supabase
async function saveCoupon(couponCode) {
    try {
        const response = await fetch('/coupon/save-coupon', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ couponCode }),
        });

        if (response.ok) {
            window.location.href = 'sign_up.html'; // Redirigir a sing_up.html después de guardar el cupón
        } else {
            alert('Failed to save coupon.');
        }
    } catch (error) {
        console.error('Error saving coupon:', error);
    }
}
