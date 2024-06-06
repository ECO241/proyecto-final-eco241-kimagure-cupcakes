/* eslint-disable consistent-return */
const authService = require('../services/authService');

const authController = {
    signUp: async (req, res) => {
        const { email, password, code } = req.body;

        if (!email || !password || !code) {
            return res.status(400).json({ message: 'Email, password, and code are required.' });
        }

        if (email.length > 255) {
            return res.status(400).json({ message: 'Email is too long.' });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
        }

        try {
            const { data, error } = await authService.signUp(email, password, code);
            if (error) {
                throw new Error(error.message);
            }
            res.status(200).json(data);
        } catch (error) {
            console.error('Error signing up:', error.message);
            res.status(500).json({ message: 'Error signing up' });
        }
    },

    checkEmail: async (req, res) => {
        const { email } = req.query;

        try {
            const { data, error } = await authService.checkEmail(email);
            if (error) {
                throw new Error(error.message);
            }

            if (data.length > 0) {
                return res.status(200).json({ exists: true });
            }
            return res.status(200).json({ exists: false });
        } catch (error) {
            console.error('Error checking email:', error.message);
            res.status(500).json({ message: 'Error checking email' });
        }
    },
};

module.exports = authController;
