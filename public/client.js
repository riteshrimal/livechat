document.addEventListener('DOMContentLoaded', () => {
  const socket = io();
  const messagesList = document.getElementById('messages');
  const name = localStorage.getItem('chatUserName'); // Retrieve the user's name from local storage
  const notificationSoundPath = 'public/mixkit-gaming-lock-2848.mp3'; // Replace with notification sound path (MP3)

  function sendMessage() {
    // Existing code to send message...
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

    // Play notification sound only if current user is not the sender
    if (data.name !== name) {
      const audio = new Audio(notificationSoundPath);
      audio.play();
    }
  });
});
