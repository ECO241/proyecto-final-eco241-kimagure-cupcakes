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

    getCouponByUserId: async (userId) => {
        try {
            const { data, error } = await supabase
                .from('coupons')
                .select('code')
                .eq('id', userId)
                .single();

            if (error) {
                throw error;
            }

            return data;
        } catch (error) {
            console.error('Error fetching coupon code:', error);
            throw error;
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
    getCarouselData: async () => {
        try {
            const { data, error } = await supabase
                .from('carousel')
                .select('image, name, short_description, price');

            return { data, error };
        } catch (error) {
            console.error('Error fetching carousel data from Supabase:', error.message);
            return { error };
        }
    },
    getCarouselData2: async () => {
        try {
            const { data, error } = await supabase
                .from('second_carousel')
                .select('image, name, short_description, price');

            return { data, error };
        } catch (error) {
            console.error('Error fetching carousel data from Supabase:', error.message);
            return { error };
        }
    },
    getCarouselData3: async () => {
        try {
            const { data, error } = await supabase
                .from('third_carousel')
                .select('image, name, short_description, price');

            return { data, error };
        } catch (error) {
            console.error('Error fetching carousel data from Supabase:', error.message);
            return { error };
        }
    },
};

module.exports = couponService;
