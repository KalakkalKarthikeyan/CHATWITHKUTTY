document.addEventListener("DOMContentLoaded", function () {
    loadChatHistory(); // Load previous chat
    detectUserName();  // Greet the user
});

// Store all response files in an array
const responseFiles = [responses1, responses2, responses3, responses4, responses5, responses6, responses7, responses8, responses9, responses10];

// Send Message Function
function sendMessage() {
    let inputElement = document.getElementById("userInput");
    let userInput = inputElement.value.trim();

    if (userInput === "") return; // Prevent empty messages

    let chatbox = document.getElementById("chatbox");
    chatbox.innerHTML += `<p><b>You:</b> ${userInput}</p>`;
    
    inputElement.value = ""; // Clear input
    chatbox.scrollTop = chatbox.scrollHeight; // Auto-scroll

    // Show Typing Indicator for 1 second before responding
    let typingIndicator = document.getElementById("typingIndicator");
    typingIndicator.style.display = "block";

    setTimeout(() => {
        typingIndicator.style.display = "none";
        
        // Try finding a match in all response files
        let response = getBestResponse(userInput) || getAutoCorrectedResponse(userInput) || getUnknownReply();

        chatbox.innerHTML += `<p><b>Kutty:</b> ${response}</p>`;
        chatbox.scrollTop = chatbox.scrollHeight; // Auto-scroll

        // Kutty's Voice Reply
        speak(response);

        saveChatHistory(); // Save chat to localStorage
    }, 1000);
}

// Find Best Response from responses1 to responses10
function getBestResponse(userInput) {
    for (let file of responseFiles) {
        let response = findBestMatch(userInput, file);
        if (response) return response;
    }
    return null;
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

// Auto-Correct for Small Typos
function getAutoCorrectedResponse(userInput) {
    let correctedInput = autoCorrect(userInput);
    return getBestResponse(correctedInput);
}

function autoCorrect(text) {
    let commonTypos = { "helo": "hello", "wht": "what", "hw": "how", "u": "you", "thnks": "thanks", "plz": "please" };
    return commonTypos[text.toLowerCase()] || text;
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

// 💾 Chat History (Persists Messages After Refresh)
function saveChatHistory() {
    localStorage.setItem("chatHistory", document.getElementById("chatbox").innerHTML);
}

function loadChatHistory() {
    let savedChat = localStorage.getItem("chatHistory");
    if (savedChat) document.getElementById("chatbox").innerHTML = savedChat;
}



