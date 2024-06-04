document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
        document.getElementById('discount').textContent = code;

        // Obtener el QR code desde el servidor si es necesario
        fetch(`/coupon/generateCoupon?code=${code}`)
            .then((response) => response.json())
            .then((data) => { document.getElementById('qrCodeImage').src = data.qrCode; })
            .catch((error) => console.error('Error fetching QR code:', error));
    }
});
