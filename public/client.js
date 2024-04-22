document.addEventListener('DOMContentLoaded', () => {
  const socket = io();
  const messagesList = document.getElementById('messages');
  const name = localStorage.getItem('chatUserName'); // Retrieve the user's name from local storage
  const soundPath = 'public/mixkit-gaming-lock-2848.wav'; // Replace with your sound file path (WAV)

  // Include Howler.js in your HTML before this script

  function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();

    if (message !== '') {
      socket.emit('message', { name, message }); // Send message and user name
      messageInput.value = '';

      // Play pop-up sound on sending message using Howler.js
      const sound = new Howl({
        src: soundPath,
        format: 'wav' // Specify WAV format
      });
      sound.play();
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
