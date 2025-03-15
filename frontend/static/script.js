let recognition;
let isListening = false;
let lastTranslationTime = 0;

const languages = [
    {name: "English", code: "en"},
    {name: "Bengali", code: "bn"},
    {name: "Spanish", code: "es"},
    {name: "French", code: "fr"},
    {name: "German", code: "de"},
    {name: "Hindi", code: "hi"},
    {name: "Arabic", code: "ar"},
    {name: "Mandarin", code: "zh"},
    {name: "Russian", code: "ru"},
    {name: "Portuguese", code: "pt"},
    {name: "Japanese", code: "ja"},
    {name: "Korean", code: "ko"},
    {name: "Turkish", code: "tr"},
    {name: "Italian", code: "it"},
    {name: "Dutch", code: "nl"},
    {name: "Polish", code: "pl"},
    {name: "Swedish", code: "sv"},
    {name: "Tamil", code: "ta"},
    {name: "Telugu", code: "te"},
    {name: "Urdu", code: "ur"},
    {name: "Gujarati", code: "gu"},
    {name: "Marathi", code: "mr"},
    {name: "Punjabi", code: "pa"},
    {name: "Malayalam", code: "ml"},
    {name: "Vietnamese", code: "vi"}
];

document.addEventListener('DOMContentLoaded', () => {
    // Initialize language dropdowns
    const inputLang = document.getElementById('inputLang');
    const outputLang = document.getElementById('outputLang');
    
    languages.forEach(lang => {
        const option1 = new Option(lang.name, lang.code);
        const option2 = new Option(lang.name, lang.code);
        inputLang.add(option1);
        outputLang.add(option2);
    });
    inputLang.value = 'en';
    outputLang.value = 'bn';

    // Speech recognition setup
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = inputLang.value;

        recognition.onresult = async (event) => {
            const transcript = Array.from(event.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('');
            
            document.getElementById('originalTranscript').textContent = transcript;
            
            if (event.results[0].isFinal) {
                await handleTranslation(transcript);
                const translatedDiv = document.getElementById('translatedTranscript');
                translatedDiv.scrollTop = translatedDiv.scrollHeight;
            }
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
        };
    } else {
        alert("Speech recognition not supported in this browser!");
    }

    // Translation handler
    const handleTranslation = async (text) => {
        const now = Date.now();
        if (!text.trim() || (now - lastTranslationTime < 1000)) return;
        lastTranslationTime = now;
        
        try {
            document.getElementById('translatedTranscript').classList.add('translating');
            document.getElementById('translatedTranscript').textContent = "Translating...";
            
            const response = await fetch('http://localhost:8000/translate', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    text: text,
                    source_lang: inputLang.value,
                    target_lang: outputLang.value
                })
            });
            
            const data = await response.json();
            const cleanTranslation = data.translation
                .replace(/\\?boxed[({]?([^})\n]*)[})]?/gi, '$1')
                .replace(/[\\{}\]\["“”]/g, '')  // Removes all types of quotes
                .replace(/^boxed/i, '')
                .trim();
                
            document.getElementById('translatedTranscript').textContent = cleanTranslation;
        } catch (error) {
            console.error('Translation error:', error);
            document.getElementById('translatedTranscript').textContent = "⚠️ Translation failed";
        } finally {
            document.getElementById('translatedTranscript').classList.remove('translating');
        }
    };

    // Playback functions
    const speakText = (text, lang) => {
        if (text) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = lang;
            window.speechSynthesis.speak(utterance);
        }
    };

    // Event handlers
    document.getElementById('startBtn').addEventListener('click', () => {
        recognition.lang = inputLang.value;
        recognition.start();
        document.getElementById('startBtn').disabled = true;
        document.getElementById('stopBtn').disabled = false;
        isListening = true;
    });

    document.getElementById('stopBtn').addEventListener('click', () => {
        recognition.stop();
        document.getElementById('startBtn').disabled = false;
        document.getElementById('stopBtn').disabled = true;
        isListening = false;
    });

    document.getElementById('speakOriginalButton').addEventListener('click', () => {
        const originalText = document.getElementById('originalTranscript').textContent;
        speakText(originalText, inputLang.value);
    });

    document.getElementById('speakTranslatedButton').addEventListener('click', () => {
        const translatedText = document.getElementById('translatedTranscript').textContent;
        speakText(translatedText, outputLang.value);
    });

    document.getElementById('inputLang').addEventListener('change', () => {
        recognition.lang = inputLang.value;
        if (isListening) {
            recognition.stop();
            recognition.start();
        }
    });

    document.getElementById('outputLang').addEventListener('change', () => {
        const originalText = document.getElementById('originalTranscript').textContent;
        if (originalText) handleTranslation(originalText);
    });
});