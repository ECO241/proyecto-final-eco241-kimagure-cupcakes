const QRCode = require('qrcode');

const couponController = {
    generateQR: async (req, res) => {
        try {
            const url = 'http://localhost:3000/mobile/coupon.html'; // URL de la página del cupón
            const qrCodeDataURL = await QRCode.toDataURL(url);

            res.status(200).json({ qrCode: qrCodeDataURL });
        } catch (error) {
            console.error('Error generating QR code:', error.message);
            res.status(500).send('Error generating QR code');
        }
    },
};

module.exports = couponController;
