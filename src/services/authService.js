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
    signUp: async (email, password, code) => {
        try {
            const { data, error } = await supabase
                .from('coupons')
                .insert([{ email, password, code }]);

            return { data, error };
        } catch (error) {
            console.error('Error signing up with Supabase:', error.message);
            return { error };
        }
    },

    checkEmail: async (email) => {
        try {
            const { data, error } = await supabase
                .from('coupons')
                .select('email')
                .eq('email', email);

            return { data, error };
        } catch (error) {
            console.error('Error checking email with Supabase:', error.message);
            return { error };
        }
    },
};

module.exports = authService;
