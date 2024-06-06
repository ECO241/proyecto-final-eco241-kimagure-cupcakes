const PORT = 3000;

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const cors = require('cors');
// eslint-disable-next-line import/no-extraneous-dependencies
const { SerialPort, ReadlineParser } = require('serialport');
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const orderService = require('./services/orderService');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
dotenv.config();

const supabaseUrl = process.env.SUPABASE_TEAM;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase URL or key is missing. Make sure to set SUPABASE_TEAM and SUPABASE_KEY environment variables.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/worker', express.static(`${__dirname}/../public/public-worker`));
app.use('/client', express.static(`${__dirname}/../public/public-client`));
app.use('/mobile', express.static(`${__dirname}/../public/public-mobile`));

const orderRoute = require('./routes/orderRoute');
const flavors = require('./routes/flavorsRoute');
const orders = require('./routes/orderRoute');
const couponRoute = require('./routes/couponRoute');

app.use('/api', orderRoute);
app.use('/flavors', flavors);
app.use('/orders', orders);
app.use('/coupon', couponRoute);

// SOCKET ****************************************************

const tablename = 'orders';

io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado');

    socket.on('disconnect', () => {
        console.log('Un cliente se ha desconectado');
    });

    socket.on('update', (cupcake) => {
        io.emit('update', cupcake);
    });

    socket.on('namefilled', (name) => {
        io.emit('namefilled', name);
    });

    socket.on('finishorder', (order) => {
        io.emit('finishorder', order);
    });

    socket.on('restart', () => {
        io.emit('restart');
    });
});

function emitMove(data) {
    const move = data.split(':')[1];

    io.emit('move', move);
}

// SERIAL PORT ***********************************************

const port = new SerialPort({
    path: 'COM5',
    baudRate: 9600,
});

const parser = new ReadlineParser({ delimiter: '\r\n' });
port.pipe(parser);

parser.write('START\n');

parser.on('data', (data) => {
    if (String(data).includes('MOVE')) {
        emitMove(data);
    }
});
port.on('error', (err) => {
    console.log('Error: ', err.message);
});

// SERVER LISTEN ********************************************

server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
