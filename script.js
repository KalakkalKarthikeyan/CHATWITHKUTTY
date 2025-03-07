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

// AI-Like Matching System
function findBestMatch(userInput, responseSet) {
    let cleanedInput = userInput.replace(/[^\w\s]/gi, "").toLowerCase(); // Remove punctuation
    let words = cleanedInput.split(" "); // Split into words

    let bestMatch = null;
    let highestMatchCount = 0;

    for (let key in responseSet) {
        let cleanedKey = key.replace(/[^\w\s]/gi, "").toLowerCase();
        let keyWords = cleanedKey.split(" ");
        
        // Count how many words match
        let matchCount = words.filter(word => keyWords.includes(word)).length;

        // If more than half of the words match, consider it a strong match
        if (matchCount > highestMatchCount) {
            highestMatchCount = matchCount;
            bestMatch = responseSet[key];
        }
    }

    // If the match is strong enough, return the response
    return highestMatchCount >= 2 ? bestMatch : null;
}

function sendMessage() {
    let userInput = document.getElementById("userInput").value.toLowerCase();
    let chatbox = document.getElementById("chatbox");

    // Try to find a response in responses1.js and responses2.js
    let response = findBestMatch(userInput, responses) || findBestMatch(userInput, extraResponses) || getUnknownReply();

    chatbox.innerHTML += `<p><b>You:</b> ${userInput}</p>`;
    chatbox.innerHTML += `<p><b>Kutty:</b> ${response}</p>`;

    document.getElementById("userInput").value = "";
    chatbox.scrollTop = chatbox.scrollHeight;
}


