const PORT = 'https://a8d0-200-3-193-228.ngrok-free.app';

/* eslint-disable max-len */
/* eslint-disable no-alert */
document.getElementById('signupForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const code = localStorage.getItem('couponCode');

    // Limpiar mensajes de error previos
    emailInput.setCustomValidity('');
    passwordInput.setCustomValidity('');

    let valid = true;

    // Verificar longitud de la contraseña
    if (passwordInput.value.length < 8) {
        passwordInput.setCustomValidity('Password must be at least 8 characters long.');
        valid = false;
    } else {
        passwordInput.setCustomValidity('');
    }

    if (valid) {
        try {
            // Verificar si el correo electrónico ya está en uso
            const emailCheckResponse = await fetch(`${PORT}/auth/check-email?email=${emailInput.value}`);
            const emailCheckData = await emailCheckResponse.json();

            if (emailCheckData.exists) {
                emailInput.setCustomValidity('Email is already in use.');
                emailInput.reportValidity();
                return;
            }
            emailInput.setCustomValidity('');

            // Realizar la solicitud de registro
            const response = await fetch(`${PORT}/auth/sign-up`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: emailInput.value, password: passwordInput.value, code }),
            });

            const data = await response.json();

            if (response.ok) {
                // Redirigir a main.html con el código de cupón como parámetro
                window.location.href = `main.html?couponCode=${encodeURIComponent(code)}`;
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error signing up:', error);
            alert('Error signing up. Please try again.');
        }
    } else {
        // Mostrar mensajes de error si los hay
        emailInput.reportValidity();
        passwordInput.reportValidity();
    }
});

// Limpiar el mensaje de error del correo electrónico cuando el usuario empieza a escribir
document.getElementById('email').addEventListener('input', () => {
    document.getElementById('email').setCustomValidity('');
});

// Limpiar el mensaje de error de la contraseña cuando el usuario empieza a escribir
document.getElementById('password').addEventListener('input', () => {
    document.getElementById('password').setCustomValidity('');
});
