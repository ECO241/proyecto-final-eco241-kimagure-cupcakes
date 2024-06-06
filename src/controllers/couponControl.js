const QRCode = require('qrcode');
const couponService = require('../services/couponService');

const couponController = {
    generateQR: async (req, res) => {
        try {
            const couponUrl = `${req.protocol}://${req.get('host')}/mobile/coupon.html`;
            const qrCode = await QRCode.toDataURL(couponUrl);

            // Guardar el QR code en Supabase
            const result = await couponService.saveQRCode(qrCode);

            if (result.error) {
                throw new Error(result.error.message);
            }

            res.status(200).json({ qrCode });
        } catch (error) {
            console.error('Error generating QR code:', error.message);
            res.status(500).send('Error generating QR code');
        }
    },

    getCarouselData: async (req, res) => {
        try {
            const { data, error } = await couponService.getCarouselData();
            if (error) {
                throw new Error(error.message);
            }
            res.status(200).json(data);
        } catch (error) {
            console.error('Error fetching carousel data:', error.message);
            res.status(500).send('Error fetching carousel data');
        }
    },
    getCarouselData2: async (req, res) => {
        try {
            const { data, error } = await couponService.getCarouselData2();
            if (error) {
                throw new Error(error.message);
            }
            res.status(200).json(data);
        } catch (error) {
            console.error('Error fetching carousel data:', error.message);
            res.status(500).send('Error fetching carousel data');
        }
    },
    getCarouselData3: async (req, res) => {
        try {
            const { data, error } = await couponService.getCarouselData3();
            if (error) {
                throw new Error(error.message);
            }
            res.status(200).json(data);
        } catch (error) {
            console.error('Error fetching carousel data:', error.message);
            res.status(500).send('Error fetching carousel data');
        }
    },
};

module.exports = couponController;
