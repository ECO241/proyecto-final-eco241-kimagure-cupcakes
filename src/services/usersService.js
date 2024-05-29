const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
<<<<<<< HEAD
=======

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
const tableName = "users";
=======
const tableName = 'users';
>>>>>>> 4474310 (QR)

const usersService = {
    createUser: async (userData) => {
        try {
            const { data, error } = await supabase
                .from(tableName)
                .insert(userData);
<<<<<<< HEAD
            
            console.log("Resultado de la inserción en Supabase:", data);
            console.error("Error al crear usuario en Supabase:", error);
=======

            console.log('Resultado de la inserción en Supabase:', data);
            console.error('Error al crear usuario en Supabase:', error);
>>>>>>> 4474310 (QR)

            if (error) {
                throw new Error(error.message);
            }
<<<<<<< HEAD
            
            return data;
        } catch (error) {
            console.error("Error al crear usuario en Supabase:", error.message);
            throw error;
        }
    }
};

module.exports = usersService;

=======

            return data;
        } catch (error) {
            console.error('Error al crear usuario en Supabase:', error.message);
            throw error;
        }
    },
};

module.exports = usersService;
>>>>>>> 4474310 (QR)
