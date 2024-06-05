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

const authService = {
    signUp: async (email, password) => {
        try {
            const { user, error } = await supabase.auth.signUp({
                email,
                password,
            });

            return { user, error };
        } catch (error) {
            console.error('Error signing up:', error.message);
            return { error };
        }
    },
    saveCouponCode: async (code, email, password) => {
        try {
            const { data, error } = await supabase
                .from('coupons')
                .insert([{ code, email, password }]);
            return { data, error };
        } catch (error) {
            console.error('Error saving coupon code:', error.message);
            return { error };
        }
    },
};

module.exports = authService;
