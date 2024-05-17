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

const tableName = 'orders';

const orderService = {
    createOrder: async (orderData) => {
        try {
            console.log('Datos del pedido a insertar:', orderData); // Verifica que los datos del pedido se pasan correctamente al servicio
            const { data, error } = await supabase
                .from(tableName)
                .insert(orderData);

            console.log('Resultado de la inserción en Supabase:', data);
            console.error('Error al insertar en Supabase:', error);

            if (error) {
                throw new Error(error.message);
            }

            return data;
        } catch (error) {
            console.error('Error al insertar en Supabase:', error.message);
            throw error;
        }
    },
};

module.exports = orderService;
