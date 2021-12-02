console.log('Hello World');

document.addEventListener('DOMContentLoaded', function() { 
    

    const phraseDiv = document.getElementById('phraseDiv');
    const startRecognizeOnceAsyncButton = document.getElementById('startRecognizeOnceAsyncButton');
    const languageSourceOptions = document.getElementById('languageSourceOptions');
    const languageTargetOptions = document.getElementById('languageTargetOptions');

    startRecognizeOnceAsyncButton.addEventListener('click', function() { 
        console.log('i was clicked');
        startRecognizeOnceAsyncButton.disabled = true;

        const speechConfig = SpeechSDK.SpeechTranslationConfig.fromSubscription('your azure subscription key', 'westeurope');        speechConfig.speechRecognitionLanguage = languageSourceOptions.value;

        speechConfig.speechRecognitionLanguage = languageSourceOptions.value;
        let language = languageTargetOptions.value;
        speechConfig.addTargetLanguage(language);

        const audioConfig =  SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
        recognizer = new SpeechSDK.TranslationRecognizer(speechConfig, audioConfig);
        recognizer.recognizeOnceAsync( (result) => {
            startRecognizeOnceAsyncButton.disabled = false;
            if(result.reason === SpeechSDK.ResultReason.TranslatedSpeech) {
                let translation = result.translations.get(language);
                window.console.log(translation);
                phraseDiv.innerHTML = translation;
            }
        }, (err) => { 
            console.log(err);
            phraseDiv.innerHTML += err;
        } )




    })



});