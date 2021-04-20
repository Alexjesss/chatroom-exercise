let socket = io.connect();
let target = document.getElementById('target');
let users = document.getElementById('users');
let username = prompt('What\'s your name?');


socket.emit('displayUser', (username));

document.getElementById('all').addEventListener('click', function () {
    let message = document.getElementById('input').value;
    socket.emit('sendToAll', (username + ' ' + message));
});

document.getElementById('me').addEventListener('click', function () {
    let message = document.getElementById('input').value;
    socket.emit('sendToMe', (username + ' ' + message));
});

socket.on('displayMessage', (message) => {
    target.innerHTML += '<br>' + message + '<br>';
});

socket.on('displayUser', (userArray) => {
    users.innerHTML = '';
    console.log(userArray);
    userArray.forEach(user => {
        users.innerHTML += '<br>' + user.username;

    })
});
