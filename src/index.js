const PORT = 3000;

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const cors = require('cors');

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

io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado');

    io.emit('coords', { X: 0, Y: 0, Z: 0 });

    socket.on('disconnect', () => {
        console.log('Un cliente se ha desconectado');
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
