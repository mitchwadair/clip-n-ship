const canvas = document.getElementById("render-canvas");
const video = document.getElementById("src-video");
const ctx = canvas.getContext("2d");
let interval;
let mainScale = 0.8;

const playVideo = () => document.getElementById("src-video").play();
const stopVideo = () => document.getElementById("src-video").pause();
const resetVideo = () => {
    video.currentTime = 0;
};
const toggleCenterLines = () => {
    const horizontal = document.getElementById("horiz-center");
    const vertical = document.getElementById("vert-center");
    horizontal.hidden = !horizontal.hidden;
    vertical.hidden = !vertical.hidden;
};

const updateScale = () => {
    const value = document.getElementById("scale-input").value;
    document.getElementById("current-scale").textContent = `Scale ${value}%`;
    mainScale = value / 100;
    video.paused && draw(ctx, video);
};

const download = (blob) => {
    const url = URL.createObjectURL(blob);
    const dl = document.createElement("a");
    document.body.appendChild(dl);
    dl.style = "display: none";
    dl.href = url;
    dl.download = "clipnship.webm";
    dl.click();
    document.body.removeChild(dl);
    URL.revokeObjectURL(url);
    video.onended = () => clearInterval(interval);
};

const renderClip = () => {
    const videoStream = canvas.captureStream(60);
    const audioStream = video.captureStream(60);
    const combinedStream = new MediaStream([...videoStream.getVideoTracks(), ...audioStream.getAudioTracks()]);
    const recorder = new MediaRecorder(combinedStream, { mimeType: "video/webm;codecs=vp9" });
    let outputChunks = [];

    recorder.ondataavailable = (event) => {
        outputChunks.push(event.data);
    };

    recorder.onstop = () => {
        let blob = new Blob(outputChunks, { type: "video/webm;codecs=vp9" });
        download(blob);
    };

    recorder.start(500);
    video.play();
    video.onended = () => {
        clearInterval(interval);
        recorder.stop();
    };
};

const calculateRenderValues = (video, scale = 1) => {
    const vWidth = video.videoWidth;
    const vHeight = video.videoHeight;
    const oX = (vHeight - vWidth * scale) / 2;
    const oY = (vWidth - vHeight * scale) / 2;
    return {
        offsetX: oX,
        offsetY: oY,
        videoWidth: vWidth * scale,
        videoHeight: vHeight * scale,
    };
};

// makes the main video content smaller and centers it horizontally/vertically
const drawMain = (ctx, video) => {
    const { offsetX, offsetY, videoWidth, videoHeight } = calculateRenderValues(video, mainScale);

    ctx.filter = "none";
    ctx.drawImage(video, offsetX, offsetY, videoWidth, videoHeight);
};

// fits the video vertically to the canvas and applies a blur filter to it
const drawBackground = (ctx, video) => {
    const scale = video.videoWidth / video.videoHeight;
    const { offsetX, offsetY, videoWidth, videoHeight } = calculateRenderValues(video, scale);

    ctx.filter = "blur(20px)";
    ctx.drawImage(video, offsetX, offsetY, videoWidth, videoHeight);
};

const draw = (ctx, video) => {
    drawBackground(ctx, video);
    drawMain(ctx, video);
};

video.onpause = () => clearInterval(interval);
video.onended = () => clearInterval(interval);
video.onplay = () => {
    clearInterval(interval);
    interval = setInterval(() => {
        draw(ctx, video);
    }, 1000 / 60);
};
video.onloadedmetadata = () => (video.currentTime = 0);
video.onseeked = () => window.requestAnimationFrame(() => draw(ctx, video));
