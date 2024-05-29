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
    saveQRCode: async (qrCodeDataURL) => {
        try {
            const { data, error } = await supabase
                .from('qr')
                .insert([{ qr_code: qrCodeDataURL }]);

            return { data, error };
        } catch (error) {
            console.error('Error saving QR code to Supabase:', error.message);
            return { error };
        }
    },
};

module.exports = couponService;
