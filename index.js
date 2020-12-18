const express = require('express')
const bodyParser = require('body-parser')
// const mongoose = require('mongoose')
// var shortid = require('shortid');
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
let joueur1 = null
let joueur2 = null

// établissement de la connexion
io.on('connection', (socket) => {
    console.log(`Connecté au client ${socket.id}`)
    if (!joueur1 && !joueur2) {
        joueur1 = true  
        // émission d'un évènement du serveur vers le client     
        io.emit('news', 'Le joueur 1 est connecté')
        console.log(`Connecté au joueur 1 ${socket.id}`)    }
    else if (joueur1 && !joueur2) {
        joueur2 = true
        io.emit('news', 'Le joueur 1 est connecté')
        io.emit('news', 'Le joueur 2 est connecté')
        console.log(`Connecté au joueur 2 ${socket.id}`)
    } else
        io.emit('news', 'Un invité est connecté')
    socket.on('test', function (data) {
        // faire ce qu'il y a à faire
        console.log("message :" + data.value);
        // BROADCAST vers tous les clients
        socket.broadcast.emit("player", data);
    });

})

// écoute du serveur sur le port 3000
server.listen(3000, function () {
    console.log('L`\'application puissance 4 est disponible sur localhost:3000 !')
})


// DDB connection
// mongoose.connect('mongodb://localhost:27017/realtimeProject',{useNewUrlParser:true},
//     function(err){
//         if(err){
//             throw err
//         }
//         console.log('Database connected')

// })
