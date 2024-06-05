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

    saveCoupon: async (req, res) => {
        try {
            const { discountCode } = req.body;
            const result = await couponService.saveCouponCode(discountCode);

            if (result.error) {
                throw new Error(result.error.message);
            }

            res.status(200).json({ message: 'Coupon saved successfully' });
        } catch (error) {
            console.error('Error saving coupon:', error.message);
            res.status(500).send('Error saving coupon');
        }
    },

    signUp: async (req, res) => {
        try {
            const { username, password, code } = req.body;
            const result = await couponService.signUpUser(username, password, code);

            if (result.error) {
                throw new Error(result.error.message);
            }

            res.status(200).json({ message: 'User signed up successfully' });
        } catch (error) {
            console.error('Error signing up user:', error.message);
            res.status(500).send('Error signing up user');
        }
    },

    getCouponCode: async (req, res) => {
        const { userId } = req.query; // Obtener el userId de la consulta

        try {
            const coupon = await couponService.getCouponByUserId(userId);
            res.json({ couponCode: coupon.code });
        } catch (error) {
            res.status(500).json({ error: 'Error fetching coupon code' });
        }
    },

    generateDiscountCode: async (req, res) => {
        try {
            const discountCode = generateRandomCode();
            res.status(200).json({ discountCode });
        } catch (error) {
            console.error('Error generating discount code:', error.message);
            res.status(500).send('Error generating discount code');
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

function generateRandomCode() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';

    let randomLetters = '';
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 3; i++) {
        randomLetters += letters.charAt(Math.floor(Math.random() * letters.length));
    }

    let randomNumbers = '';
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 3; i++) {
        randomNumbers += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }

    return `${randomLetters}-${randomNumbers}`;
}

module.exports = couponController;
