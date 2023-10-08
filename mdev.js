// script.js
let leftAudio, rightAudio;

document.getElementById('leftSong').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioContext.decodeAudioData(e.target.result, function(buffer) {
            leftAudio = buffer;
        });
    };
    reader.readAsArrayBuffer(file);
});

document.getElementById('rightSong').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioContext.decodeAudioData(e.target.result, function(buffer) {
            rightAudio = buffer;
        });
    };
    reader.readAsArrayBuffer(file);
});

document.getElementById('playButton').addEventListener('click', function() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const leftSource = audioContext.createBufferSource();
    const rightSource = audioContext.createBufferSource();

    leftSource.buffer = leftAudio;
    rightSource.buffer = rightAudio;

    leftSource.connect(audioContext.destination);
    rightSource.connect(audioContext.destination);

    leftSource.start(0);
    rightSource.start(0);
});
