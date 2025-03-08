document.addEventListener("DOMContentLoaded", function () {
    let inputElement = document.getElementById("userInput");
    let indicator = document.getElementById("statusIndicator");
    let suggestionsBox = document.getElementById("suggestions");

    // Enter key to send message
    inputElement.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    // Check answer availability & show suggestions while typing
    inputElement.addEventListener("input", function () {
        let userInput = inputElement.value.trim();
        updateStatusIndicator(userInput);
        showSuggestions(userInput);
    });
});

// Function to check answer availability & update dot color
function updateStatusIndicator(userInput) {
    let indicator = document.getElementById("statusIndicator");

    if (userInput.length === 0) {
        indicator.style.visibility = "hidden"; // Hide if empty
        return;
    }

    let response = findBestMatch(userInput, responses) || findBestMatch(userInput, extraResponses);
    indicator.style.visibility = "visible";
    indicator.style.backgroundColor = response ? "green" : "red";
}

// Function to show Google-like suggestions
function showSuggestions(userInput) {
    let suggestionsBox = document.getElementById("suggestions");
    suggestionsBox.innerHTML = "";

    if (userInput.length === 0) {
        suggestionsBox.style.display = "none"; // Hide suggestions if input is empty
        return;
    }

    let matchedQuestions = Object.keys(responses)
        .concat(Object.keys(extraResponses))
        .filter(question => question.toLowerCase().includes(userInput.toLowerCase()))
        .slice(0, 5); // Limit to 5 suggestions

    if (matchedQuestions.length === 0) {
        suggestionsBox.style.display = "none";
        return;
    }

    matchedQuestions.forEach(question => {
        let boldedPart = question.replace(new RegExp(`^(${userInput})`, "i"), "<b>$1</b>");
        let suggestionItem = document.createElement("div");
        suggestionItem.innerHTML = boldedPart;
        suggestionItem.classList.add("suggestion-item");

        suggestionItem.addEventListener("click", function () {
            document.getElementById("userInput").value = question; // Autofill input box
            sendMessage(); // Send immediately
        });

        suggestionsBox.appendChild(suggestionItem);
    });

    suggestionsBox.style.display = "block";
}

// Function to get a default unknown reply
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

// Function to calculate Levenshtein Distance (edit distance for fuzzy matching)
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
    let cleanedInput = userInput.replace(/[^\w\s]/gi, "").toLowerCase().trim();
    if (cleanedInput.length === 0) return null;

    let words = cleanedInput.split(" ");
    let bestMatch = null;
    let highestMatchCount = 0;
    let lowestDistance = Infinity;

    for (let key in responseSet) {
        let cleanedKey = key.replace(/[^\w\s]/gi, "").toLowerCase();
        let keyWords = cleanedKey.split(" ");

        let matchCount = words.filter(word => keyWords.includes(word)).length;

        if (matchCount > highestMatchCount) {
            highestMatchCount = matchCount;
            bestMatch = responseSet[key];
        }

        let distance = getEditDistance(cleanedInput, cleanedKey);
        if (distance < Math.ceil(cleanedInput.length * 0.3) && distance < lowestDistance) {
            lowestDistance = distance;
            bestMatch = responseSet[key];
        }
    }

    return bestMatch || null;
}

// Function to send a message
function sendMessage() {
    let inputElement = document.getElementById("userInput");
    let userInput = inputElement.value.trim();
    let chatbox = document.getElementById("chatbox");

    if (userInput === "") return;

    let response = findBestMatch(userInput, responses) || 
                   findBestMatch(userInput, extraResponses) || 
                   getUnknownReply();

    chatbox.innerHTML += `<p><b>You:</b> ${userInput}</p>`;
    chatbox.innerHTML += `<p><b>Kutty:</b> ${response}</p>`;

    inputElement.value = "";
    document.getElementById("suggestions").style.display = "none"; // Hide suggestions after sending
    chatbox.scrollTop = chatbox.scrollHeight;
}



