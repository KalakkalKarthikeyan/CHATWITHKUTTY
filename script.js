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

    // Mobile Fix: Send button works on tap
    document.getElementById("sendButton").addEventListener("click", sendMessage);

    // Voice button works properly
    document.getElementById("voiceInput").addEventListener("click", startVoiceRecognition);

    // Show suggestions while typing
    inputElement.addEventListener("input", function () {
        let userInput = inputElement.value.trim();
        updateStatusIndicator(userInput);
        showSuggestions(userInput);
    });
});

// Load responses from all files
const responseFiles = [responses1, responses2, responses3, responses4, responses5, responses6, responses7, responses8, responses9, responses10];

// ✅ Fix: Update Status Indicator (Green for known, Red for unknown)
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

// ✅ Fix: Working Suggestions Box
function showSuggestions(userInput) {
    let suggestionsBox = document.getElementById("suggestions");
    suggestionsBox.innerHTML = "";

    if (userInput.length === 0) {
        suggestionsBox.style.display = "none";
        return;
    }

    let matchedQuestions = [];
    for (let file of responseFiles) {
        matchedQuestions = matchedQuestions.concat(Object.keys(file));
    }

    matchedQuestions = matchedQuestions
        .filter(question => question.toLowerCase().includes(userInput.toLowerCase()))
        .slice(0, 5);

    if (matchedQuestions.length === 0) {
        suggestionsBox.style.display = "none";
        return;
    }

    matchedQuestions.forEach(question => {
        let suggestionItem = document.createElement("div");
        suggestionItem.textContent = question;
        suggestionItem.classList.add("suggestion-item");

        suggestionItem.addEventListener("click", function () {
            document.getElementById("userInput").value = question;
            sendMessage();
        });

        suggestionsBox.appendChild(suggestionItem);
    });

    suggestionsBox.style.display = "block";
}

// ✅ Fix: Send Button Works
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

        // ✅ Fix: Working voice response
        speak(response);

        saveChatHistory();
    }, 1000);

    inputElement.value = "";
    document.getElementById("suggestions").style.display = "none";
}

// ✅ Fix: Get Best Response
function getBestResponse(userInput) {
    for (let file of responseFiles) {
        let response = findBestMatch(userInput, file);
        if (response) return response;
    }
    return null;
}

// ✅ Fix: Default Unknown Reply
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

// ✅ Fix: Voice Input Works
function startVoiceRecognition() {
    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";

    recognition.onresult = function (event) {
        let spokenText = event.results[0][0].transcript;
        document.getElementById("userInput").value = spokenText;
        sendMessage();
    };

    recognition.start();
}

// ✅ Fix: Voice Output Works
function speak(text) {
    let speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.pitch = 1;
    speech.rate = 1;
    speechSynthesis.speak(speech);
}

// ✅ Fix: Chat History Works
function saveChatHistory() {
    localStorage.setItem("chatHistory", document.getElementById("chatbox").innerHTML);
}

function loadChatHistory() {
    let savedChat = localStorage.getItem("chatHistory");
    if (savedChat) document.getElementById("chatbox").innerHTML = savedChat;
}



