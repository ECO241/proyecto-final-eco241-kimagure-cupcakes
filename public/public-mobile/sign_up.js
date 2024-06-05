document.getElementById('signupForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Obtener el código de descuento generado previamente de la página anterior
    const discountCode = localStorage.getItem('discountCode');

    fetch('/coupon/sign-up', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, discountCode }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.message) {
                console.log(data.message);
                window.location.href = '/mobile/main.html';
            }
        })
        .catch((error) => console.error('Error signing up user:', error));
});
