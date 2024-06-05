document.getElementById('signupForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Obtener el código de descuento almacenado localmente
    const discountCode = localStorage.getItem('discountCode');

    fetch('/auth/sign-up', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, discountCode }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.message) {
                window.location.href = '/mobile/main.html';
            } else if (data.error) {
                throw new Error(data.error);
            }
        })
        .catch((error) => console.error('Error signing up user:', error));
});
