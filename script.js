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

// Function to calculate Levenshtein Distance (edit distance)
function getEditDistance(a, b) {
    let tmp;
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    if (a.length > b.length) tmp = a, a = b, b = tmp;

    let row = Array(a.length + 1).fill().map((_, i) => i);

    for (let i = 1; i <= b.length; i++) {
        let prev = i;
        for (let j = 1; j <= a.length; j++) {
            let val = (b[i - 1] === a[j - 1]) ? row[j - 1] : Math.min(row[j - 1] + 1, prev + 1, row[j] + 1);
            row[j - 1] = prev;
            prev = val;
        }
        row[a.length] = prev;
    }
    return row[a.length];
}

// AI-Like Matching System: Combines Word Matching & Fuzzy Matching
function findBestMatch(userInput, responseSet) {
    let cleanedInput = userInput.replace(/[^\w\s]/gi, "").toLowerCase(); // Remove punctuation
    let words = cleanedInput.split(" "); // Split into words

    let bestMatch = null;
    let highestMatchCount = 0;
    let lowestDistance = Infinity;

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

        // Fuzzy Matching: Find the closest match even with spelling mistakes
        let distance = getEditDistance(cleanedInput, cleanedKey);
        if (distance < Math.ceil(cleanedInput.length * 0.3) && distance < lowestDistance) {
            lowestDistance = distance;
            bestMatch = responseSet[key];
        }
    }

    // If strong match found, return it
    return bestMatch || null;
}

function sendMessage() {
    let userInput = document.getElementById("userInput").value.toLowerCase();
    let chatbox = document.getElementById("chatbox");

    // Try finding a match in multiple response sets
    let response = findBestMatch(userInput, responses) || 
                   findBestMatch(userInput, extraResponses) || 
                   getUnknownReply();

    chatbox.innerHTML += `<p><b>You:</b> ${userInput}</p>`;
    chatbox.innerHTML += `<p><b>Kutty:</b> ${response}</p>`;

    document.getElementById("userInput").value = "";
    chatbox.scrollTop = chatbox.scrollHeight;
}

