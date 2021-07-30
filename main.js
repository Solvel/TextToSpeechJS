var synth = window.speechSynthesis;                                         // Capture the reference to the SpeechSynthesis API

var inputForm = document.querySelector('form');                             // Capture references to all the DOM elements
var inputTxt = document.querySelector('.txt');
var voiceSelect = document.querySelector('select');

var pitch = document.querySelector('#pitch');
var pitchValue = document.querySelector('.pitch-value');
var rate = document.querySelector('#rate');
var rateValue = document.querySelector('.rate-value');

document.getElementById("play").onclick = function() {play()};              // Adds the play function to the play button

var voices = [];                                                            // Create list for the voices

function populateVoiceList() {                                              // Populate the list with the Invoke SpeechSynthesis.getVoices()
    voices = synth.getVoices();
  
    for(i = 0; i < voices.length ; i++) {                                   // Create an option element for each available voice
      var option = document.createElement('option');
      option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
  
      if(voices[i].default) {
        option.textContent += ' -- DEFAULT';
      }
  
      option.setAttribute('data-lang', voices[i].lang);                     // Create data attributes and append the options as children of the select
      option.setAttribute('data-name', voices[i].name);
      voiceSelect.appendChild(option);
    }
  }

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {                        // Chrome wait workaround
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

function play() {                                     
    event.preventDefault();
    var utterThis = new SpeechSynthesisUtterance(inputTxt.value);           // Creating a SpeechSynthesisUtterance() instance with its constructor, passing in the text as a param
    var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');  // Gets the selected voice
    for(i = 0; i < voices.length ; i++) {                                           // Find the object whose name matches the attributes value
      if(voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
      }
    }
    utterThis.pitch = pitch.value;                                          // Setting the chosen params
    utterThis.rate = rate.value;
    synth.speak(utterThis);                                                 // Invoking speak() whilst passing the Utterance instance as a param
    /*
    utterThis.onpause = function(event) {                                   // Gets the char the speach gets paused at
        var char = event.utterance.text.charAt(event.charIndex);
        console.log('Speech paused at character ' + event.charIndex + ' of "' +
        event.utterance.text + '", which is "' + char + '".');
      }
      inputTxt.blur();                                                      // Firefox OS hide keyboard
      */                                                  
    }

    pitch.onchange = function () {                                          // Live pitch and rate change
      pitchValue.textContent = pitch.value;
    };

    rate.onchange = function () {
      rateValue.textContent = rate.value;
    };