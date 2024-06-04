const fetchFunctions = {
    // Fetch flavors
    getFlavors: async () => {
        try {
            const response = await fetch('http://localhost:3000/flavors');
            const flavors = await response.json();
            return flavors;
        } catch (err) {
            console.error('Error fetching flavors:', err);
            throw err;
        }
    },

    // Create order
    createOrder: async (orderData) => {
        try {
            const response = await fetch('http://localhost:3000/orders/createOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });
            const result = await response.json();
            return result;
        } catch (err) {
            console.error('Error creating order:', err);
            throw err;
        }
    },

    // Generate QR code
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

module.exports = fetchFunctions;
