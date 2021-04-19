let socket = io.connect();
let target = document.getElementById('target').innerHTML;

document.getElementById('all').addEventListener('click',function (){
    socket.emit('sendToAll', ('message'));
});

socket.on('displayMessage', (message) => {
   target += '<br>'+ message;
});
