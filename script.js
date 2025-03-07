function getUnknownReply() {
    let replies = [
        "Hmm... I'm not sure about that, but I can learn!",
        "That’s interesting! Tell me more.",
        "I don’t know that yet, but Karthikeyan can teach me!",
        "Good question! I’ll find out soon.",
        "Haha, I need to learn that!"
    ];
    return replies[Math.floor(Math.random() * replies.length)];
}

function sendMessage() {
    let userInput = document.getElementById("userInput").value.toLowerCase();
    let chatbox = document.getElementById("chatbox");

    // Search for response in responses1.js and responses2.js
    let response = responses[userInput] || extraResponses[userInput] || getUnknownReply();

    chatbox.innerHTML += `<p><b>You:</b> ${userInput}</p>`;
    chatbox.innerHTML += `<p><b>Kutty:</b> ${response}</p>`;

    document.getElementById("userInput").value = "";
    chatbox.scrollTop = chatbox.scrollHeight;
}
