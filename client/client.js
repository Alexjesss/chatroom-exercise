let socket = io.connect();
let target = document.getElementById('target');
let message = document.getElementById('input').value;
let username = name;

document.getElementById('all').addEventListener('click',function (){
    let message = document.getElementById('input').value;
    socket.emit('sendToAll', (message));
});

document.getElementById('me').addEventListener('click',function (){
    let message = document.getElementById('input').value;
    socket.emit('sendToMe', (message));
});

socket.on('displayMessage', (message) => {
    target.innerHTML += '<br>'+ message;
});
