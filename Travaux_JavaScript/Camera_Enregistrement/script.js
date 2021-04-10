// Variables pour la gestion de la video
let videoElement;
let recorder;
let stream;
let mediaRecorder;
// Options d'enregistrement
let options;

let types = ["video/webm",
    "video/webm\;codecs=vp8",
    "video/webm\;codecs=daala",
    "video/webm\;codecs=h264",
    "video/mpeg",
    "video/mp4"];

for (let i in types) {
    if (MediaRecorder.isTypeSupported(types[i])) {
        options = { mimeType: types[i] };
        break;
    }
}

/**
  * Fonction de callback appelee lors d'un clic sur le bouton "Play"
  **/
function videoPlay(event) {
    let constraints = { audio: true, video: { width: 720, height: 480 } };

    navigator.mediaDevices.getUserMedia(constraints).then(function (mediaStream) {
        stream = mediaStream;
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = function (e) {
            videoElement.play();
        };
    }).catch(function (err) {
        console.log(err.name + ": " + err.message);
    });

    // Desactivation du bouton "Play"
    $(this).prop("disabled", true);

    // Reactivation des boutons "Pause" et "Stop"
    $("#pause").prop("disabled", false);
    $("#stop").prop("disabled", false);
}

/**
  * Fonction de callback appelee lors d'un clic sur le bouton "Pause"
  **/
function videoPause(event) {
    videoElement.pause();

    // Desactivation du bouton "Pause"
    $(this).prop("disabled", true);

    // Reactivation du bouton "Play"
    $("#play").prop("disabled", false);
}

/**
  * Fonction de callback appelee lors d'un clic sur le bouton "Stop"
  **/
function videoStop(event) {
    stream.getTracks().forEach(function (track) {
        track.stop();
    });

    videoElement.srcObject = null;

    // Desactivation des boutons "Pause" et Stop"
    $(this).prop("disabled", true);
    $("#pause").prop("disabled", true);

    // Reactivation du bouton "Play"
    $("#play").prop("disabled", false);
}

/**
  * Fonction de callback appelee lors d'un clic sur le bouton "Record"
  **/
function videoRecord(event) {
    let constraints = { audio: true, video: { width: 720, height: 480 } };
    navigator.mediaDevices.getUserMedia(constraints).then(function (mediaStream) {
        stream = mediaStream;
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = function (e) {
            videoElement.play();
        };

        mediaRecorder = new MediaRecorder(stream, options);
        mediaRecorder.ondataavailable = handleDataAvailable;
        mediaRecorder.start();

    }).catch(function (err) {
        console.log(err.name + ": " + err.message);
    });

    $(this).off();
    $(this).html("Stop record");
    $(this).on('click', videoRecordStop);

    function handleDataAvailable(event) {
        let recordedChunks = [];
        if (event.data.size > 0) {
            recordedChunks.push(event.data);
            var blob = new Blob(recordedChunks);
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a');
            document.body.appendChild(a);
            a.style = 'display: none';
            a.href = url;
            a.download = 'test.webm';
            a.click();
            window.URL.revokeObjectURL(url);
        }
    }
}

/**
  * Fonction de callback appelee lors d'un clic sur le bouton "StopRecord"
  **/
function videoRecordStop(event) {
    mediaRecorder.stop();
    $(this).html("Record");
    $(this).off();
    $(this).on('click', videoRecord);
}


$(document).ready(function () {
    videoElement = document.getElementById('video');
    // Desactivation des boutons "Pause" et Stop"
    $("#pause").prop("disabled", true);
    $("#stop").prop("disabled", true);

    // Ajout d'un gestionnaire sur l'evenement "click" des boutons "Play", "Pause", "Stop" et "Record"
    $('#play').on('click', videoPlay);
    $('#pause').on('click', videoPause);
    $('#stop').on('click', videoStop);
    $('#record').on('click', videoRecord);
});