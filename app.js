const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);

    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    var day = new Date();
    var hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Selamat Pagi Boss...");
    } else if (hour >= 12 && hour < 17) {
        speak("Selamat Siang Kak...");
    } else {
        speak("Selamat Malam Ang...");
    }
}

window.addEventListener('load', () => {
    speak("Initializing SARKEM...");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    content.textContent = "Mendengarkan...";
    recognition.start();
});

function takeCommand(message) {
    if (message.includes('woi') || message.includes('sarkem')) {
        speak("Apa sira kuh, bocah kari ngomong bae butuh apa");
    } else if (message.includes("buka google")) {
        window.open("https://google.com", "_blank");
        speak("Kuh Google wis dibuka...");
    } else if (message.includes("buka youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Ceg luh Aja bae deuleng sing aneh...");
    } else if (message.includes("buka facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Srog masih usum kah Facebookan...");
    } else if (message.includes('apa itu') || message.includes('siapa itu') || message.includes('apa yang')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "Wis aja protes adanya cuman kien " + message;
        speak(finalText);
    } else if (message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
        const finalText = "Aja luru sing laka, kien bae lih " + message;
        speak(finalText);
    } else if (message.includes('jam pira')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        const finalText = "bocah buta, kien luh jam " + time;
        speak(finalText);
    } else if (message.includes('tanggal pira')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        const finalText = "bocah pikun, kien lih tanggal " + date;
        speak(finalText);
    } else if (message.includes('kalkulator')) {
        window.open('Calculator:///');
        const finalText = "buka Calculator";
        speak(finalText);
    } else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "Aja kebanyakan treka, ketemunya cuman kien " + message + " ning Google";
        speak(finalText);
    }
}
