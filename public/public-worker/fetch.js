const fetchFunctions = {
    // Fetch flavors
    getFlavors: async () => {
        try {
            const response = await fetch(`${PORT}/flavors`);
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
            const response = await fetch(`${PORT}/orders/createOrder`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });
        } catch (err) {
            console.error('Error creating order:', err);
            throw err;
        }
    },

    // Generate QR code
    generateQR: async () => {
        const qr = fetch(`${PORT}/coupon/generate-QR`)
            .then((response) => response.json())
            .then((data) => data.qrCode)
            .catch((error) => console.error('Error fetching QR code:', error));
        return qr;
    },
};
