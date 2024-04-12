
document.addEventListener('DOMContentLoaded', function() {
    var socket = io();

    // Event handler for receiving updates
    socket.on('update', function(data) {
        // Update UI to display the new message
        var messages = document.getElementById('messages');
        var message = document.createElement('p');
        message.innerHTML = '<strong>' + data.sender + ':</strong> ' + data.message;
        messages.appendChild(message);
    });

    // Event handler for receiving notifications
    socket.on('notification', function(data) {
        // Display browser notification
        if (Notification.permission === "granted") {
            new Notification('New Message', { body: data.message });
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(function (permission) {
                if (permission === "granted") {
                    new Notification('New Message', { body: data.message });
                }
            });
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    var socket = io();

    // Event handler for sending messages
    document.querySelector('form[action="/"]').addEventListener('submit', function(e) {
        e.preventDefault();
        var messageInput = document.querySelector('input[name="message"]');
        var message = messageInput.value;
        socket.emit('send_message', { message: message });
        messageInput.value = ''; // Clear the input field after sending
    });

    // Event handler for receiving messages
    socket.on('receive_message', function(data) {
        // Update UI to display the received message
        var messageContainer = document.getElementById('messages');
        var messageElement = document.createElement('div');
        messageElement.innerText = data.sender + ': ' + data.message;
        messageContainer.appendChild(messageElement);
    });
});

let typingTimer;
const doneTypingInterval = 10000; // 30 seconds

document.addEventListener('DOMContentLoaded', function() {
    var socket = io();

    // Event handler for receiving updates
    socket.on('update', function(data) {
        // Update UI to display the new message
        var messageContainer = document.getElementById('message-container');
        var messageElement = document.createElement('div');
        messageElement.innerText = data.sender + ': ' + data.message;
        messageContainer.appendChild(messageElement);
    });

    // Event handler for when user starts typing
    document.querySelector('input[name="message"]').addEventListener('input', function() {
        clearTimeout(typingTimer);
    });

    // Event handler for when user stops typing
    document.querySelector('input[name="message"]').addEventListener('keyup', function() {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(refreshPage, doneTypingInterval);
    });

    // Function to refresh the page
    function refreshPage() {
        window.location.reload();
    }
});
