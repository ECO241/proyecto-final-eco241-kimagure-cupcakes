const createClient = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config();

const supabaseUrl = process.env.SUPABASE_TEAM;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase URL or key is missing. Make sure to set SUPABASE_TEAM and SUPABASE_KEY environment variables.");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const tablename = " ";

const flavorsService = {
    getAllFlavors: async () => {
        const { data, error } = await supabase
            .from(tablename)
            .select();
        if (error) {
            throw new Error(error.message);
        }
        return data;
    },

    getFlavorById: async (id) => {
        const { data, error } = await supabase
            .from(tablename)
            .select()
            .eq('id', id);
        if (error) {
            throw new Error(error.message);
        }
        return data;
    },

    createFlavor: async (flavor) => {
        const { error } = await supabase
            .from(tablename)
            .insert(flavor);
        if (error) {
            throw new Error(error.message);
        }
    },

    updateFlavor: async (id, flavor) => {
        const { error } = await supabase
            .from(tablename)
            .update(flavor)
            .eq('id', id);
        if (error) {
            throw new Error(error.message);
        }
    },

    deleteFlavor: async (id) => {
        const { error } = await supabase
            .from(tablename)
            .delete()
            .eq('id', id);
        if (error) {
            throw new Error(error.message);
        }
    },
};

module.exports = flavorsService;
