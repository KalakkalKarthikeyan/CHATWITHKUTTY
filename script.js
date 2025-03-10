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

    let response = findBestMatch(userInput, responses) || 
                   findBestMatch(userInput, extraResponses) ||
                   findBestMatch(userInput, extraResponses4) || 
                   findBestMatch(userInput, extraResponses5);

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
        .concat(Object.keys(extraResponses), Object.keys(extraResponses4), Object.keys(extraResponses5))
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

// Function to check if input is a valid math expression
function isMathExpression(input) {
    return /^[0-9+\-*/().\s]+$/.test(input) && /\d/.test(input) && /[\+\-\*\/]/.test(input);
}

// Function to safely evaluate math expressions
function evaluateMathExpression(expression) {
    try {
        let result = new Function(`return (${expression})`)();
        return `The answer is: ${result}`;
    } catch {
        return "Invalid math expression!";
    }
}

// Function to find best chatbot response using fuzzy matching
function findBestMatch(userInput, responseSet) {
    let cleanedInput = userInput.toLowerCase().trim();
    if (cleanedInput.length === 0) return null;

    for (let key in responseSet) {
        if (key.toLowerCase() === cleanedInput) {
            return responseSet[key]; // Exact match
        }
    }
    return null;
}

// Function to get a random unknown reply
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

// Function to send a message
function sendMessage() {
    let inputElement = document.getElementById("userInput");
    let userInput = inputElement.value.trim();
    let chatbox = document.getElementById("chatbox");

    if (userInput === "") return;

    let response = findBestMatch(userInput, responses) || 
                   findBestMatch(userInput, extraResponses) ||
                   findBestMatch(userInput, extraResponses4) || 
                   findBestMatch(userInput, extraResponses5);

    // If no chatbot response is found, check if it's a math question
    if (!response && isMathExpression(userInput)) {
        response = evaluateMathExpression(userInput);
    }

    // If still no response, give a default unknown reply
    if (!response) {
        response = getUnknownReply();
    }

    chatbox.innerHTML += `<p><b>You:</b> ${userInput}</p>`;
    chatbox.innerHTML += `<p><b>Kutty:</b> ${response}</p>`;

    inputElement.value = "";
    document.getElementById("suggestions").style.display = "none"; // Hide suggestions after sending
    chatbox.scrollTop = chatbox.scrollHeight;
}
