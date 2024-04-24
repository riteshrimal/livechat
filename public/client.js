document.addEventListener('DOMContentLoaded', () => {
  const socket = io(); // Connect to Socket.IO server
  const messagesList = document.getElementById('messages');
  const name = localStorage.getItem('chatUserName'); // Retrieve user's name from local storage
  const notificationSoundPath = 'public/mixkit-gaming-lock-2848.mp3'; // Replace with notification sound path (MP3)

  function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();

    if (message !== '') {
      // Send message object to server
      socket.emit('message', { name, message });
      messageInput.value = ''; // Clear message input after sending
    }
  }

  document.getElementById('sendButton').addEventListener('click', sendMessage);
  document.getElementById('messageInput').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  });

  // Update for notification sound
  socket.on('message', (data) => {
    const li = document.createElement('li');
    li.textContent = `${data.name}: ${data.message}`;
    messagesList.appendChild(li);
    messagesList.scrollTop = messagesList.scrollHeight;
  });

  // Listen for notification event and play sound
  socket.on('notification', () => {
    const audio = new Audio(notificationSoundPath);
    audio.play();
  });
});
