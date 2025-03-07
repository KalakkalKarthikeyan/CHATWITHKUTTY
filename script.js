function sendMessage() {
    let userInput = document.getElementById("userInput").value.toLowerCase();
    let chatbox = document.getElementById("chatbox");

    let response = responses[userInput] || "I don’t know that yet! Ask something else.";

    chatbox.innerHTML += `<p><b>You:</b> ${userInput}</p>`;
    chatbox.innerHTML += `<p><b>Kutty:</b> ${response}</p>`;

    document.getElementById("userInput").value = "";
    chatbox.scrollTop = chatbox.scrollHeight;
}
