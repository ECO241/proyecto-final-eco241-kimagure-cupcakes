function getQR() {
    const qr = fetch(`${PORT}/coupon/generate-QR`)
        .then((response) => response.json())
        .then((data) => data.qrCode)
        .catch((error) => console.error('Error fetching QR code:', error));
    return qr;
}

async function renderQR() {
    const qrImg = await getQR();
    document.querySelector('#qrImg').src = qrImg;
}
