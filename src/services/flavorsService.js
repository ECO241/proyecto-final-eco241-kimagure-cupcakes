<<<<<<< HEAD
const {createClient} = require('@supabase/supabase-js');
const dotenv = require('dotenv');
=======
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

>>>>>>> 4474310 (QR)
dotenv.config();

const supabaseUrl = process.env.SUPABASE_TEAM;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
<<<<<<< HEAD
    console.error("Supabase URL or key is missing. Make sure to set SUPABASE_TEAM and SUPABASE_KEY environment variables.");
=======
    console.error('Supabase URL or key is missing. Make sure to set SUPABASE_TEAM and SUPABASE_KEY environment variables.');
>>>>>>> 4474310 (QR)
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
<<<<<<< HEAD
const tablename = " ";
=======

const tablename = 'flavors';
>>>>>>> 4474310 (QR)

const flavorsService = {
    getAllFlavors: async () => {
        const { data, error } = await supabase
            .from(tablename)
            .select();
        if (error) {
<<<<<<< HEAD
            throw new Error(error.message);
=======
            throw new Error(error);
>>>>>>> 4474310 (QR)
        }
        return data;
    },

    getFlavorById: async (id) => {
        const { data, error } = await supabase
            .from(tablename)
            .select()
            .eq('id', id);
        if (error) {
<<<<<<< HEAD
            throw new Error(error.message);
=======
            throw new Error(error);
>>>>>>> 4474310 (QR)
        }
        return data;
    },

    createFlavor: async (flavor) => {
        const { error } = await supabase
            .from(tablename)
            .insert(flavor);
        if (error) {
<<<<<<< HEAD
            throw new Error(error.message);
=======
            throw new Error(error);
>>>>>>> 4474310 (QR)
        }
    },

    updateFlavor: async (id, flavor) => {
        const { error } = await supabase
            .from(tablename)
            .update(flavor)
            .eq('id', id);
        if (error) {
<<<<<<< HEAD
            throw new Error(error.message);
=======
            throw new Error(error);
>>>>>>> 4474310 (QR)
        }
    },

    deleteFlavor: async (id) => {
        const { error } = await supabase
            .from(tablename)
            .delete()
            .eq('id', id);
        if (error) {
<<<<<<< HEAD
            throw new Error(error.message);
=======
            throw new Error(error);
>>>>>>> 4474310 (QR)
        }
    },
};

module.exports = flavorsService;
