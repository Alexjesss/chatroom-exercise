let socket = io.connect();
let target = document.getElementById('target');
let users = document.getElementById('users');
let username = prompt('What\'s your name?');
let typeBox = document.getElementById('typingBox');

function fontSize() {
    target.style.fontSize = "35px";
}

socket.emit('displayUser', (username));

document.getElementById('font').addEventListener('click', function () {
    console.log(socket.id)
    socket.emit('fontSize');
});

document.getElementById('all').addEventListener('click', function () {
    let message = document.getElementById('input').value;
    socket.emit('sendToAll', (username + ': ' + message));
});

document.getElementById('me').addEventListener('click', function () {
    let message = document.getElementById('input').value;
    socket.emit('sendToMe', (username + ': ' + message));
});

document.getElementById('input').addEventListener('keypress', function () {
    socket.emit('typing', username);
})

socket.on('displayMessage', (message) => {
    target.innerHTML += '<br>' + message + '<br>';
});

socket.on('typing', (username) => {
    console.log(typeBox);
    typeBox.innerHTML = '<p><em>' + username + ' ' + 'is typing a message....</em></p>';
});

socket.on('displayUser', (userArray) => {
    users.innerHTML = '';
    console.log(userArray);
    userArray.forEach(user => {
        users.innerHTML += '<br>' + user.username;
    })
});

socket.on('funny', () => {
    fontSize();
});
