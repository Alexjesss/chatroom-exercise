const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
let userArray = [];

let counter = 0;
let counterDisconnect = 0;


port = 8080;

const clientPath = `${__dirname}/../client`;
app.use(express.static(clientPath));


server.listen(port, () => {
    console.log("server running on " + port);
});

io.on('connection', (socket) => {
    counter++;
    socket.on('sendToAll', (message) =>{
        io.emit("displayMessage", (message));

        socket.on('sendToMe', (message) =>{
            socket.emit("displayMessage", (message));});
    });

    socket.on('displayUser', (username) =>{
        userArray.push({socketId:socket.id, username:username})
        console.log(userArray);
        io.emit('displayUser', (userArray));
        console.log(username + ' connected');
        });

    
    socket.on('disconnect', function () {
        counterDisconnect++;

        userArray.forEach((username, index) => {
           if (socket.id === username.socketId){
               userArray.splice(index,1);
               console.log(username.username + ' disconnected');
           }
            io.emit('displayUser', (userArray));
        })
    });
});






