/* eslint-disable max-len */
const authService = require('../services/authService');

const authController = {
    signUp: async (req, res) => {
        try {
            const { email, password, discountCode } = req.body;

            if (!email || !password) {
                throw new Error('Email and password are required.');
            }

            // Registramos al usuario en el autenticador de Supabase
            const userResult = await authService.signUp(email, password);

            if (userResult.error) {
                throw new Error(userResult.error.message);
            }

            // Guardar el código de descuento en la tabla coupons
            if (discountCode) {
                const couponResult = await authService.saveCouponCode(discountCode, email, password);
                if (couponResult.error) {
                    throw new Error(couponResult.error.message);
                }
            }

            res.status(200).json({ message: 'Sign up successful! Please check your email to confirm your account.' });
        } catch (error) {
            console.error('Error signing up:', error.message);
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = authController;
