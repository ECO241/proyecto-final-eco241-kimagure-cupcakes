const QRCode = require('qrcode');

const couponController = {
    generateQR: async (req, res) => {
        try {
            const url = 'https://50bb-186-168-100-249.ngrok-free.app/mobile'; // URL de la página del cupón
            const qrCodeDataURL = await QRCode.toDataURL(url);

            res.status(200).json({ qrCode: qrCodeDataURL });
        } catch (error) {
            console.error('Error generating QR code:', error.message);
            res.status(500).send('Error generating QR code');
        }
    },
};

module.exports = couponController;
