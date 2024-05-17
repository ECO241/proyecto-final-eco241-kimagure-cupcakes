const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const cors = require('cors');
const orderRoutes = require('./routes/orderRoute');
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const supabaseUrl = process.env.SUPABASE_TEAM;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase URL or key is missing. Make sure to set SUPABASE_TEAM and SUPABASE_KEY environment variables.");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
const tablename = "orders";

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/worker', express.static(__dirname + '/../public/public-worker'));
app.use('/client', express.static(__dirname + '/../public/public-client'));
app.use(express.static(path.join(__dirname, '/public-mobile')));

io.on('connection', (socket) => {
    console.log(`Un cliente se ha conectado`);

    socket.on('disconnect', () => {
        console.log('Un cliente se ha desconectado');
    });

    socket.on('update', (cupcake) => {
        io.emit('update', cupcake);
    })

    socket.on('finishorder', (cupcake) => {
        io.emit('finishorder', cupcake);
    })
    
   socket.on('newOrder', (order) => {
        io.emit('newOrder', order); // Emitir el evento al worker
        // Almacena los detalles del pedido en la tabla de Supabase
        supabase
            .from(tablename)
            .insert(order)
            .then(() => console.log('Order details inserted into Supabase table'))
            .catch(error => console.error('Error inserting order details into Supabase:', error.message));
    });
});


const orders = require('./routes/orderRoute')
app.use('/orders', orders)

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
