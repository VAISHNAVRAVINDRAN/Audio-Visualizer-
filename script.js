var audio = document.querySelector('.audio');
var seek = document.querySelector('.seek-bar');
var play_btn = document.querySelector('.play');
var pause_btn = document.querySelector('.pause');
var canvas = document.querySelector('.canvas');
play_btn.addEventListener('click', () => {
    audio.play();
    pause_btn.style.display = 'flex';
    play_btn.style.display = 'none';
var ctx = canvas.getContext('2d');
let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var analyser = audioCtx.createAnalyser();
let source = audioCtx.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(audioCtx.destination);
analyser.fftSize = 64;
let bufferLength = analyser.frequencyBinCount;
let dataArray = new Uint8Array(bufferLength);
analyser.getByteTimeDomainData(dataArray);
analyser.fftSize = 64;
bufferLength = analyser.frequencyBinCount;
dataArray = new Uint8Array(bufferLength);
analyser.getByteTimeDomainData(dataArray);
let barWidth = canvas.width/bufferLength;
let barHeight;
let x;
function animate() {
    x = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(dataArray);
    for(let i = 0;i < bufferLength; i++){
        barHeight = dataArray[i];
        ctx.fillStyle = "rgb(300, "+i*barHeight/4+","+i*barHeight/37+")";
        ctx.fillRect(x, canvas.height - barHeight/1.5,barWidth,barHeight);
        x += barWidth;
    }
    requestAnimationFrame(animate);
}
animate();
});
pause_btn.addEventListener('click', () => {
    audio.pause();
    play_btn.style.display = 'flex';
    pause_btn.style.display = 'none';
});
audio.addEventListener('timeupdate', (e) => {
var ct = parseInt(JSON.stringify(e.target.currentTime));
var dn = parseInt(JSON.stringify(e.target.duration));
var pro = Math.floor((ct/dn)*100); 
seek.value = pro;
});
