const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config();

const supabaseUrl = process.env.SUPABASE_TEAM;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase URL or key is missing. Make sure to set SUPABASE_TEAM and SUPABASE_KEY environment variables.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const couponService = {
    saveQRCode: async (qrCode) => {
        try {
            const { data, error } = await supabase
                .from('qr')
                .insert([{ qr_code: qrCode }]);

            return { data, error };
        } catch (error) {
            console.error('Error saving QR code in Supabase:', error.message);
            return { error };
        }
    },

    saveCouponCode: async (discountCode) => {
        try {
            const { data, error } = await supabase
                .from('coupons')
                .insert([{ code: discountCode }]);

            return { data, error };
        } catch (error) {
            console.error('Error saving coupon code in Supabase:', error.message);
            return { error };
        }
    },

    signUpUser: async (username, password, code) => {
        try {
            const { data, error } = await supabase
                .from('coupons')
                .insert([{ username, password, code }]);

            return { data, error };
        } catch (error) {
            console.error('Error signing up user in Supabase:', error.message);
            return { error };
        }
    },
};

module.exports = couponService;
