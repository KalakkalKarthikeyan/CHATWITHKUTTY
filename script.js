document.addEventListener("DOMContentLoaded", function () {
    let inputElement = document.getElementById("userInput");
    let indicator = document.getElementById("statusIndicator");
    let suggestionsBox = document.getElementById("suggestions");

    loadChatHistory();
    detectUserName();

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

// Responses from multiple files
const responseFiles = [responses1, responses2, responses3, responses4, responses5, responses6, responses7, responses8, responses9, responses10];

// Function to check answer availability & update dot color
function updateStatusIndicator(userInput) {
    let indicator = document.getElementById("statusIndicator");

    if (userInput.length === 0) {
        indicator.style.visibility = "hidden"; // Hide if empty
        return;
    }

    let response = getBestResponse(userInput);
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

    let matchedQuestions = [];
    for (let file of responseFiles) {
        matchedQuestions = matchedQuestions.concat(Object.keys(file));
    }

    matchedQuestions = matchedQuestions
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

// Function to send a message
function sendMessage() {
    let inputElement = document.getElementById("userInput");
    let userInput = inputElement.value.trim();
    let chatbox = document.getElementById("chatbox");

    if (userInput === "") return;

    let response = getBestResponse(userInput) || getAutoCorrectedResponse(userInput) || getUnknownReply();

    chatbox.innerHTML += `<p><b>You:</b> ${userInput}</p>`;

    // Show typing indicator for 1 sec
    let typingIndicator = document.getElementById("typingIndicator");
    typingIndicator.style.display = "block";

    setTimeout(() => {
        typingIndicator.style.display = "none";
        chatbox.innerHTML += `<p><b>Kutty:</b> ${response}</p>`;
        chatbox.scrollTop = chatbox.scrollHeight;

        // Kutty's Voice Reply
        speak(response);

        saveChatHistory();
    }, 1000);

    inputElement.value = "";
    document.getElementById("suggestions").style.display = "none"; // Hide suggestions after sending
}

// Find Best Response from all response files
function getBestResponse(userInput) {
    for (let file of responseFiles) {
        let response = findBestMatch(userInput, file);
        if (response) return response;
    }
    return null;
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

// Auto-Correct for Small Typos
function getAutoCorrectedResponse(userInput) {
    let correctedInput = autoCorrect(userInput);
    return getBestResponse(correctedInput);
}

function autoCorrect(text) {
    let commonTypos = { "helo": "hello", "wht": "what", "hw": "how", "u": "you", "thnks": "thanks", "plz": "please" };
    return commonTypos[text.toLowerCase()] || text;
}

// 🎤 Voice Input (Speech-to-Text)
document.getElementById("voiceInput").addEventListener("click", function () {
    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";

    recognition.onresult = function (event) {
        let spokenText = event.results[0][0].transcript;
        document.getElementById("userInput").value = spokenText;
        sendMessage(); // Send voice input as text
    };

    recognition.start();
});

// 🔊 Kutty’s Voice Reply (Text-to-Speech)
function speak(text) {
    let speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.pitch = 1;
    speech.rate = 1;
    speechSynthesis.speak(speech);
}

// 🌗 Dark & Light Mode Toggle
document.getElementById("themeToggle").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    let currentMode = document.body.classList.contains("dark-mode") ? "dark" : "light";
    localStorage.setItem("theme", currentMode);
});

// Load Theme Preference
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
}

// 👤 User Name Recognition (Remembers Users)
function detectUserName() {
    let userName = localStorage.getItem("userName");

    if (!userName) {
        userName = prompt("Hey! What's your name?");
        if (userName) localStorage.setItem("userName", userName);
    }

    if (userName) {
        document.getElementById("chatbox").innerHTML += `<p><b>Kutty:</b> Hi ${userName}! Nice to chat with you again.</p>`;
    }
}

// 💾 Chat History (Persists Messages After Refresh)
function saveChatHistory() {
    localStorage.setItem("chatHistory", document.getElementById("chatbox").innerHTML);
}

function loadChatHistory() {
    let savedChat = localStorage.getItem("chatHistory");
    if (savedChat) document.getElementById("chatbox").innerHTML = savedChat;
}



