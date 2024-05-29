const QRCode = require('qrcode');
const couponService = require('../services/couponService'); // Asegúrate de importar el servicio

const couponController = {
    generateQR: async (req, res) => {
        try {
            const url = 'http://localhost:3000/mobile/coupon.html'; // URL de la página del cupón
            const qrCodeDataURL = await QRCode.toDataURL(url);

            // Inserta el código QR en la base de datos
            const result = await couponService.saveQRCode(qrCodeDataURL);

            if (result.error) {
                throw new Error(result.error.message);
            }

            res.status(200).json({ qrCode: qrCodeDataURL });
        } catch (error) {
            console.error('Error generating QR code:', error.message);
            res.status(500).send('Error generating QR code');
        }
    },
};

module.exports = couponController;
