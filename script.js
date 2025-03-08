document.addEventListener("DOMContentLoaded", function () {
    let inputElement = document.getElementById("userInput");
    let indicator = document.getElementById("statusIndicator");
    let suggestionsBox = document.getElementById("suggestions");

    // Debugging: Check if responses are loaded
    console.log("Checking responses:", typeof responses, typeof extraResponses);

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
    console.log("Checking response for input:", userInput, "Found:", response);

    indicator.style.visibility = "visible";
    indicator.style.backgroundColor = response ? "green" : "red";
}

// Function to show Google-like suggestions
function showSuggestions(userInput) {
    let suggestionsBox = document.getElementById("suggestions");
    suggestionsBox.innerHTML = "";

    if (userInput.length === 0) {
        suggestionsBox.style.display = "none"; // Hide if input is empty
        return;
    }

    let matchedQuestions = Object.keys(responses || {})
        .concat(Object.keys(extraResponses || {}))
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

// AI-Like Matching System: Combines Word Matching & Fuzzy Matching
function findBestMatch(userInput, responseSet) {
    if (!responseSet) return null; // Prevent errors if undefined

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

    console.log("Send button clicked! Input:", userInput);

    let response = findBestMatch(userInput, responses) || 
                   findBestMatch(userInput, extraResponses) || 
                   getUnknownReply();

    chatbox.innerHTML += `<p><b>You:</b> ${userInput}</p>`;
    chatbox.innerHTML += `<p><b>Kutty:</b> ${response}</p>`;

    inputElement.value = "";
    document.getElementById("suggestions").style.display = "none"; // Hide suggestions after sending
    chatbox.scrollTop = chatbox.scrollHeight;
}

