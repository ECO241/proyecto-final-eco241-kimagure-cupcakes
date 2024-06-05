document.getElementById('signUpForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const discountCode = localStorage.getItem('discountCode');

    fetch('/coupon/sign-up', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, code: discountCode }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('User signed up:', data);
            // eslint-disable-next-line no-alert
            alert('Sign up successful!');
        })
        .catch((error) => console.error('Error signing up:', error));
});

// Fetch and store discount code if available
fetch('/coupon/generate-discount-code')
    .then((response) => response.json())
    .then((data) => {
        localStorage.setItem('discountCode', data.discountCode);
    })
    .catch((error) => console.error('Error fetching discount code:', error));
