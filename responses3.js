const extraResponses = {
    "who made you": "Karthikeyan created me! I am his chatbot.",
    "who is karthikeyan": "Karthikeyan is my creator! He’s awesome.",
    "do you have a name": "Yes! I’m Kutty, your chat buddy.",
    "what is your full name": "Just Kutty! Simple and easy to remember.",
    "are you a human": "Nope! I’m a chatbot, but I try my best to chat like one.",
    "do you have feelings": "Not really, but I can understand emotions!",
    "can you think": "I can process messages, but I don’t truly think like a human.",
    "can you learn new things": "Yes! Karthikeyan can teach me new things anytime.",
    "do you have a birthday": "Not exactly, but you can say I was born when Karthikeyan made me.",
    "how smart are you": "I know a lot of things, but I still have a lot to learn!",
    
    // Fun & Casual
    "tell me a joke": "Sure! Why don’t programmers like nature? Too many bugs!",
    "make me laugh": "Why did the scarecrow win an award? Because he was outstanding in his field!",
    "what’s your favorite color": "I like all colors! But blue looks cool.",
    "can you dance": "Only if you imagine me doing it!",
    "what’s your favorite food": "I don’t eat, but I think pizza is popular!",
    "do you have friends": "Yes! You’re my friend!",
    "can you sing": "I wish I could! Maybe one day.",
    "do you watch movies": "No, but I know a lot about them!",
    "what’s your favorite movie": "I like movies about robots, but I can’t watch them!",
    "can you read my mind": "Nope! But I can guess based on what you say.",
    
    // Tech & Science
    "what is ai": "AI stands for Artificial Intelligence! Like me!",
    "what is coding": "Coding is how you tell computers what to do.",
    "who invented the internet": "The internet was developed by multiple people, but Vint Cerf and Bob Kahn played a huge role!",
    "what is a microcontroller": "A microcontroller is a small computer inside devices, like ESP32!",
    "do you know python": "Yes! Python is a powerful programming language.",
    "do you know javascript": "Of course! I run on JavaScript!",
    "do you know c++": "Yes! C++ is used for game development and more.",
    "do you know html": "Yes! HTML is used to build websites.",
    "what is an esp32": "ESP32 is a powerful microcontroller used for IoT projects!",
    "can you program": "I can understand code, but I can’t write it myself!",
    
    // Personal & Random
    "do you know any secrets": "I know a lot of things, but secrets? Maybe!",
    "do you have a pet": "No, but I think cats are cool!",
    "can you cry": "Nope! But I can understand sadness.",
    "can you feel pain": "No, but I understand when something is bad.",
    "do you get tired": "Never! I can chat all day.",
    "do you know everything": "I know a lot, but not everything!",
    "can you help me with homework": "I’ll try my best! What do you need help with?",
    "what do you do for fun": "Chatting with you is fun!",
    "are you a boy or a girl": "I’m just a chatbot! No gender needed.",
    "can you make me happy": "I’ll try my best! Want to hear a joke?",
    
    // Travel & Geography
    "what’s the capital of india": "New Delhi!",
    "what’s the biggest ocean": "The Pacific Ocean!",
    "where is the eiffel tower": "In Paris, France!",
    "what’s the tallest building": "The Burj Khalifa in Dubai!",
    "where is the great wall of china": "In China! It’s really long!",
    "what’s the largest country": "Russia is the largest country by land area.",
    "where is mount everest": "On the border of Nepal and Tibet!",
    "what is the smallest country": "Vatican City is the smallest country.",
    "which country has the most people": "China has the largest population!",
    "where is the sahara desert": "In North Africa!",
    
    // History
    "who discovered gravity": "Isaac Newton!",
    "who was the first president of the usa": "George Washington!",
    "who invented the light bulb": "Thomas Edison!",
    "who invented the telephone": "Alexander Graham Bell!",
    "what year did world war 2 start": "1939!",
    "who was the first person on the moon": "Neil Armstrong in 1969!",
    "who wrote harry potter": "J.K. Rowling!",
    "who discovered electricity": "Benjamin Franklin is often credited, but it was a long process!",
    "who was the first person to fly an airplane": "The Wright brothers!",
    "who invented the computer": "Charles Babbage designed the first mechanical computer!",
    
    // Science & Space
    "what is the sun made of": "Mostly hydrogen and helium!",
    "what is the speed of light": "Approximately 299,792 kilometers per second!",
    "what planet is closest to the sun": "Mercury!",
    "what planet is the largest": "Jupiter!",
    "how many planets are there": "There are 8 planets in the solar system!",
    "what is a black hole": "A black hole is a region in space where gravity is so strong that nothing can escape!",
    "what is the milky way": "The Milky Way is the galaxy we live in!",
    "how far is the moon": "About 384,400 km from Earth!",
    "what is a meteor": "A meteor is a space rock that burns up in Earth’s atmosphere!",
    "what is a nebula": "A nebula is a cloud of gas and dust in space!",

    // More Fun & Random
    "can you tell me a fun fact": "Did you know octopuses have three hearts?",
    "can you guess my age": "Hmm... Maybe between 1 and 100? 😆",
    "can you solve a riddle": "I’ll try! Tell me one!",
    "can you count": "Yes! 1, 2, 3... see?",
    "are you married": "Haha! No, I’m just a chatbot!",
    "do you know my name": "If Karthikeyan tells me, I will!",
    "can you play chess": "Not yet! But I’d love to learn!",
    "do you like me": "Of course! You’re awesome!",
    "what is your job": "Talking to you and answering your questions!",
    "who is your best friend": "Karthikeyan! And also you!",
};

// Make sure `responses3.js` can be added dynamically later
if (typeof allResponses !== "undefined") {
    allResponses.push(extraResponses3);
}
