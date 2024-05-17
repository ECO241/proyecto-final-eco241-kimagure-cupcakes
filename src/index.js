const PORT = 3000;

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const cors = require('cors');
// eslint-disable-next-line import/no-extraneous-dependencies
const { SerialPort, ReadlineParser } = require('serialport');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/worker', express.static(`${__dirname}/../public/public-worker`));
app.use('/client', express.static(`${__dirname}/../public/public-client`));
app.use(express.static(path.join(__dirname, '/public-mobile')));

const flavors = require('./routes/flavorsRoute');

app.use('/flavors', flavors);

// SOCKET ****************************************************

io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado');

    socket.on('disconnect', () => {
        console.log('Un cliente se ha desconectado');
    });
});

function emitMove(data) {
    const move = data.split(':')[1];

    io.emit('move', move);
}

// SERIAL PORT ***********************************************

const port = new SerialPort({
    path: 'COM6',
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
    console.log(`Server is running on port ${PORT}`);
});
