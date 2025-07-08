document.addEventListener('DOMContentLoaded', function() {
    // Select conversation to view
    const conversations = document.querySelectorAll('.conversation');
    conversations.forEach(conversation => {
        conversation.addEventListener('click', function() {
            // Remove active class from all conversations
            conversations.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked conversation
            this.classList.add('active');
            
            // In a real app, you would load the conversation messages here
            // For demo, we're just showing the existing chat area
        });
    });
    
    // Send message functionality
    const messageInput = document.querySelector('.message-input input');
    const sendBtn = document.querySelector('.send-btn');
    const messageContainer = document.querySelector('.message-container');
    
    function sendMessage() {
        const messageText = messageInput.value.trim();
        if (messageText) {
            // Create new message element
            const messageElement = document.createElement('div');


messageElement.className = 'message sent';
            
            const contentElement = document.createElement('div');
            contentElement.className = 'message-content';
            
            const messageParagraph = document.createElement('p');
            messageParagraph.textContent = messageText;
            
            const timeSpan = document.createElement('span');
            timeSpan.className = 'message-time';
            const now = new Date();
            timeSpan.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            contentElement.appendChild(messageParagraph);
            contentElement.appendChild(timeSpan);
            messageElement.appendChild(contentElement);
            
            // Add to message container
            messageContainer.appendChild(messageElement);
            
            // Clear input
            messageInput.value = '';
            
            // Scroll to bottom
            messageContainer.scrollTop = messageContainer.scrollHeight;
            
            // In a real app, you would send the message to the server here
        }
    }
    
    sendBtn.addEventListener('click', sendMessage);
    
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Mobile responsiveness
    const mobileBackBtn = document.createElement('button');
    mobileBackBtn.className = 'mobile-back-btn';
    mobileBackBtn.innerHTML = '<i class="fas fa-arrow-left"></i>';
    mobileBackBtn.style.display = 'none';
    document.querySelector('.chat-header').prepend(mobileBackBtn);
    
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            document.querySelector('.conversations-sidebar').classList.add('active');
            document.querySelector('.chat-area').classList.remove('active');
            mobileBackBtn.style.display = 'block';
        } else {
            document.querySelector('.conversations-sidebar').classList.add('active');
            document.querySelector('.chat-area').classList.add('active');
            mobileBackBtn.style.display = 'none';
        }
    }
    
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
    
    mobileBackBtn.addEventListener('click', function() {
        document.querySelector('.conversations-sidebar').classList.add('active');
        document.querySelector('.chat-area').classList.remove('active');
    });
    
    // Scroll to bottom of messages on load
    messageContainer.scrollTop = messageContainer.scrollHeight;
});