// public/client.js
document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
    const messagesList = document.getElementById('messages');
    const name = localStorage.getItem('chatUserName'); // Retrieve the user's name from local storage

    function sendMessage() {
        const messageInput = document.getElementById('messageInput');
        const message = messageInput.value.trim();

        if (message !== '') {
            socket.emit('message', { name, message }); // Send the message along with the user's name
            messageInput.value = '';
        }
    }

    document.getElementById('sendButton').addEventListener('click', sendMessage);
    document.getElementById('messageInput').addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    socket.on('message', (data) => {
        const li = document.createElement('li');
        li.textContent = `${data.name}: ${data.message}`;
        messagesList.appendChild(li);
        messagesList.scrollTop = messagesList.scrollHeight;
    });
});
