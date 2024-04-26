const PORT = 3000;

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const cors = require('cors');


const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.urlencoded({extended :false}))
app.use(express.json()); 
app.use(cors())

app.use('/worker', express.static(__dirname + '/public-worker'));
app.use('/client', express.static(__dirname + '/public-client'));
app.use(express.static(path.join(__dirname, '/public-mobile')));


const flavors = require('./routes/flavorsRoute');
app.use('/flavors', flavors);

const users = require('./routes/usersRoute');
app.use('/users', users);


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
