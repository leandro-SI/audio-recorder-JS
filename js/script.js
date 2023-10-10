AtivarMicrofone();

let mediaRecorder;

function AtivarMicrofone() {
    navigator.
        mediaDevices.
        getUserMedia({ audio: true })
        .then(stream => {

            mediaRecorder = new MediaRecorder(stream);

            let chunks = [];

            mediaRecorder.ondataavailable = data => {
                console.log(data);
                chunks.push(data.data);
            }

            mediaRecorder.onstop = () => {
                console.log('stop');
                const blob = new Blob(chunks, { type: 'audio/ogg; code=opus' })
                const reader = new window.FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = () => {
                    console.log(reader.result)

                    const audio = document.createElement('audio');
                    audio.src = reader.result;
                    audio.controls = true;
                    $('body').append(audio)

                }
            }
            mediaRecorder.start();
            setTimeout(() => mediaRecorder.stop(), 3000);

        }, err => {
            alert("Você deve permitir o audio.")
        })
}