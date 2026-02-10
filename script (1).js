document.addEventListener("DOMContentLoaded", () => {
    const inputText = document.getElementById("inputText");
    const outputText = document.getElementById("outputText");
    const sourceLang = document.getElementById("sourceLang");
    const targetLang = document.getElementById("targetLang");
    const translateBtn = document.getElementById("translateBtn");
    const copyBtn = document.getElementById("copyBtn");
    const speakBtn = document.getElementById("speakBtn");

    // Function to call MyMemory API
    async function translateText(text, source, target) {
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.responseData.translatedText;
        } catch (err) {
            console.error(err);
            return "Translation failed";
        }
    }

    // Translate Button
    translateBtn.addEventListener("click", async () => {
        const text = inputText.value.trim();
        const source = sourceLang.value;
        const target = targetLang.value;

        if (!text) {
            alert("Please enter text to translate");
            return;
        }

        outputText.value = "Translating...";

        const translated = await translateText(text, source, target);
        outputText.value = translated;
    });

    // Copy Button
    copyBtn.addEventListener("click", () => {
        const text = outputText.value.trim();
        if (!text) {
            alert("Nothing to copy");
            return;
        }
        navigator.clipboard.writeText(text)
            .then(() => alert("Copied!"))
            .catch(err => console.error(err));
    });

    // Speak Button
    speakBtn.addEventListener("click", () => {
        const text = outputText.value.trim();
        if (!text) {
            alert("No text to speak");
            return;
        }

        const speech = new SpeechSynthesisUtterance(text);

        // Set language based on target
        const lang = targetLang.value;
        if (lang === "hi") speech.lang = "hi-IN";
        else if (lang === "mr") speech.lang = "mr-IN";
        else speech.lang = "en-US";

        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(speech);
    });
});
