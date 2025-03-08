document.addEventListener("DOMContentLoaded", function () {
    let inputElement = document.getElementById("userInput");
    let sendButton = document.getElementById("sendButton");
    let voiceButton = document.getElementById("voiceInput");
    let indicator = document.getElementById("statusIndicator");
    let suggestionsBox = document.getElementById("suggestions");

    loadChatHistory();
    detectUserName();

    // ✅ Enter key to send message
    inputElement.addEventListener("keypress", function (event) {
        if (event.key === "Enter") sendMessage();
    });

    // ✅ Send button works on all devices
    sendButton.addEventListener("click", sendMessage);

    // ✅ Voice input button works
    voiceButton.addEventListener("click", startVoiceRecognition);

    // ✅ Show suggestions while typing
    inputElement.addEventListener("input", function () {
        let userInput = inputElement.value.trim();
        updateStatusIndicator(userInput);
        showSuggestions(userInput);
    });
});

// ✅ Load responses from multiple files
const responseFiles = [responses1, responses2, responses3, responses4, responses5, responses6, responses7, responses8, responses9, responses10];

// ✅ Fix: Send Message Works on Mobile & PC
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

        // ✅ Fix: Voice response works
        speak(response);

        saveChatHistory();
    }, 1000);

    inputElement.value = "";
    document.getElementById("suggestions").style.display = "none";
}

// ✅ Fix: Find Best Response
function getBestResponse(userInput) {
    for (let file of responseFiles) {
        if (file[userInput]) return file[userInput];
    }
    return null;
}

// ✅ Fix: Auto-Correct Input Matching
function getAutoCorrectedResponse(userInput) {
    let bestMatch = null;
    let minDistance = Infinity;

    for (let file of responseFiles) {
        for (let question in file) {
            let distance = getEditDistance(userInput.toLowerCase(), question.toLowerCase());
            if (distance < minDistance && distance < Math.ceil(userInput.length * 0.3)) {
                minDistance = distance;
                bestMatch = file[question];
            }
        }
    }

    return bestMatch;
}

// ✅ Fix: Unknown Reply
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

// ✅ Fix: Voice Input (Speech-to-Text)
function startVoiceRecognition() {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
        alert("Your browser does not support speech recognition.");
        return;
    }

    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";

    recognition.onresult = function (event) {
        let spokenText = event.results[0][0].transcript;
        document.getElementById("userInput").value = spokenText;
        sendMessage();
    };

    recognition.onerror = function () {
        alert("Voice recognition error. Try again.");
    };

    recognition.start();
}

// ✅ Fix: Voice Output (Text-to-Speech)
function speak(text) {
    if (!window.speechSynthesis) return;

    let speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.pitch = 1;
    speech.rate = 1;
    speechSynthesis.speak(speech);
}

// ✅ Fix: Chat History
function saveChatHistory() {
    localStorage.setItem("chatHistory", document.getElementById("chatbox").innerHTML);
}

function loadChatHistory() {
    let savedChat = localStorage.getItem("chatHistory");
    if (savedChat) document.getElementById("chatbox").innerHTML = savedChat;
}

// ✅ Fix: Update Status Indicator (Green for known, Red for unknown)
function updateStatusIndicator(userInput) {
    let indicator = document.getElementById("statusIndicator");

    if (userInput.length === 0) {
        indicator.style.visibility = "hidden";
        return;
    }

    let response = getBestResponse(userInput);
    indicator.style.visibility = "visible";
    indicator.style.backgroundColor = response ? "green" : "red";
}

// ✅ Fix: Show Suggestions
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

// ✅ Fix: Levenshtein Distance (Better Matching)
function getEditDistance(a, b) {
    let tmp;
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    if (a.length > b.length) { tmp = a; a = b; b = tmp; }

    let row = Array(a.length + 1).fill(0).map((_, i) => i);

    for (let i = 1; i <= b.length; i++) {
        let prev = i;
        for (let j = 1; j <= a.length; j++) {
            let val = row[j - 1];
            if (b[i - 1] !== a[j - 1]) {
                val = Math.min(row[j - 1] + 1, Math.min(prev + 1, row[j] + 1));
            }
            row[j - 1] = prev;
            prev = val;
        }
        row[a.length] = prev;
    }
    return row[a.length];
}

