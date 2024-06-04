function renderQR() {
    fetch(`${PORT}/coupon/generate-QR`)
        .then((response) => response.json())
        .then((data) => {
            document.getElementById('qr').src = data.qrCode;
        })
        .catch((error) => console.error('Error fetching QR code:', error));
}
