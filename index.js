const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const usersModule = require('./public-mobile/mobile.js'); 


const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const cors = require('cors')

app.use(express.urlencoded({extended :false}))
app.use(express.json()); 
app.use(cors())

app.use('/worker', express.static(__dirname + '/public-worker'));
app.use('/client', express.static(__dirname + '/public-client'));
app.use(express.static(path.join(__dirname, '/public-mobile')));

io.on('connection', (socket) => {
    console.log(`Un cliente se ha conectado`);

    socket.on('disconnect', () => {
        console.log('Un cliente se ha desconectado');
    })

    socket.on('update', (cupcake) => {
        io.emit('update', cupcake);
    })

    socket.on('finishorder', (cupcake) => {
        io.emit('finishorder', cupcake);

        //should send that info to somewhere ?
    })
})


//endpoints
app.get('/SignUp', (req, res) => {
    res.sendFile(path.join(__dirname,'public-mobile', 'SignUp.html'));
  });
app.get('/Login', (req, res) => {
    res.sendFile(path.join(__dirname,'public-mobile', 'Login.html'));
  });
app.get('/Qr', (req, res) => {
    res.sendFile(path.join(__dirname,'public-client' ,'screens', 'Qr.html'));
  });
app.get('/play', (req, res) => {
    res.sendFile(path.join(__dirname,'public-client' ,'screens', 'play.html'));
  });
app.get('/start', (req, res) => {
    res.sendFile(path.join(__dirname,'public-client' ,'screens', 'start.html'));
  });

app.post('/api/users', (req, res) => {
    const { username, email } = req.body;
    const newUser = usersModule.addUser(username, email);
    if (newUser) {
        res.status(201).json(newUser); // Usuario agregado exitosamente
    } else {
        res.status(500).json({ error: 'No se pudo agregar el usuario.' }); // Error al agregar usuario
    }
});
  
app.get('/api/users', (req, res) => {
    const allUsers = usersModule.getAllUsers();
    res.json(allUsers);
  });

  app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = usersModule.findUserByUsername(username);
  
    if (!user) {
      return res.send(`
        <script>
          alert('error 401');
          alert('El usuario no existe.');
          window.location.href = '/login';
        </script>
      `);
    }
  
    if (user.password !== password) {
      return res.send(`
        <script>
          alert('error 401');
          alert('Contraseña incorrecta.');
          window.location.href = '/login';
        </script>
      `);
    }
  
    res.redirect(`/messages/${username}`);
  });

//socket 
io.on('connection', (socket) => {
    console.log('Worker connected');
    // Escucha el evento 'update'
    socket.on('update', (cupcake) => {
        console.log('New cupcake order:', cupcake);
        io.emit('update', cupcake); // Envía la actualización a todos los clientes conectados
    });
     // Escucha el evento 'finishorder'
    socket.on('finishorder', (cupcake) => {
        console.log('Order finished:', cupcake);
        io.emit('finishorder', cupcake); // Envía la confirmación de pedido finalizado a todos los clientes conectados
    });
    //Escucha el evento disconnect
    socket.on('disconnect', () => {
        console.log('Worker disconnected');
    });
});


server.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
})
