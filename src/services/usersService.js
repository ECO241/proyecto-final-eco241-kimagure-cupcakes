const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config();

const supabaseUrl = process.env.SUPABASE_TEAM;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase URL or key is missing. Make sure to set SUPABASE_TEAM and SUPABASE_KEY environment variables.");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const tableName = "users";

const usersService = {
    createUser: async (userData) => {
        try {
            const { data, error } = await supabase
                .from(tableName)
                .insert(userData);
            
            console.log("Resultado de la inserción en Supabase:", data);
            console.error("Error al crear usuario en Supabase:", error);

            if (error) {
                throw new Error(error.message);
            }
            
            return data;
        } catch (error) {
            console.error("Error al crear usuario en Supabase:", error.message);
            throw error;
        }
    }
};

module.exports = usersService;

