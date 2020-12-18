const express = require('express')
const bodyParser = require('body-parser')
// const mongoose = require('mongoose')
var shortid = require('shortid');
const app = express()

// ajout de socket.io
const server = require('http').Server(app)
const io = require('socket.io')(server)

// const scores = require('./ScoreModel')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.get('/', function (req, res) {
    res.sendFile('index.html', { root: __dirname })
})

app.get('/json', function (req, res) {
    res.status(200).json({ "message": "ok" })
})

// établissement de la connexion
io.on('connection', (socket) => {
    var clientName = shortid.generate();
    console.log("Connecté au client " + clientName + ", socket.id" + socket.id);
    // console.log(`Connecté au client ${socket.id}`)
    // émission d'un évènement
    // io.emit('news', clientName)
    io.emit('news', 'Voici élément envoyé par le serveur, clientName' + clientName)
    socket.on('test', function (data) {
        // faire ce qu'il y a à faire
        console.log("message :" + data.value);
        // BROADCAST vers tous les clients
        socket.broadcast.emit("player", data);
        console.log(clientName);
      });
   
})

// écoute du serveur sur le port 3000
server.listen(3000, function () {
    console.log('Votre app est disponible sur localhost:3000 !')
})


// DDB connection
// mongoose.connect('mongodb://localhost:27017/realtimeProject',{useNewUrlParser:true},
//     function(err){
//         if(err){
//             throw err
//         }
//         console.log('Database connected')
       
// })
