let typingTimer;
const doneTypingInterval = 10000; // 10 seconds

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
});


