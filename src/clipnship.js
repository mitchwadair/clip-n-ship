/**
 * @license
 * Copyright (c) 2021 Mitchell Adair
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

class ClipConverter {
    /**
     * The ClipConverter constructor
     *
     * @param {blob} video the video to convert
     */
    constructor(video) {
        if (!video) {
            throw new Error("Must include video data when instantiating a ClipConverter");
        }

        this._layers = [];
        this._canvas = this._createCanvas();
        this._video = this._createVideo(video);
        this._playInterval;
    }

    _createCanvas() {
        const canvas = document.createElement("canvas");
        canvas.setAttribute("id", "clipnship-canvas");
        canvas.setAttribute("width", "1080");
        canvas.setAttribute("height", "1920");
        return canvas;
    }

    _createVideo(video) {
        const videoElement = document.createElement("video");
        videoElement.setAttribute("hidden", "");
        videoElement.setAttribute("src", video);

        videoElement.onplay = () => {
            clearInterval(this._playInterval);
            this._playInterval = setInterval(() => this._drawLayers(), 1000 / 60);
        };
        videoElement.onpause = () => clearInterval(this._playInterval);
        videoElement.onended = () => clearInterval(this._playInterval);
        videoElement.onloadedmetadata = () => (videoElement.currentTime = 0);
        videoElement.onseeked = () => window.requestAnimationFrame(() => this._drawLayers());

        document.body.appendChild(videoElement);
        return videoElement;
    }

    _calculateRenderValues(video, scale = 1) {
        const vWidth = video.videoWidth;
        const vHeight = video.videoHeight;
        const oX = (vHeight - vWidth * scale) / 2;
        const oY = (vWidth - vHeight * scale) / 2;
        return {
            offsetX: oX,
            offsetY: oY,
            width: vWidth * scale,
            height: vHeight * scale,
        };
    }

    _drawLayers() {
        const ctx = this._canvas.getContext("2d");
        // doing a regular for loop for performance
        for (let i = 0; i < this._layers.length; i++) {
            const layer = this._layers[i];
            const { offsetX, offsetY, width, height } = this._calculateRenderValues(layer.source, layer.scale);
            ctx.filter = layer.filter;
            ctx.drawImage(layer.source, offsetX, offsetY, width, height);
        }
    }

    /**
     * Get the canvas element of the clip converter
     *
     * @param {string} width the width to set the preview canvas to, can be any valid css unit value
     * @returns the canvas of the clip converter
     */
    getPreview(width = "500px") {
        this._canvas.style = `width: ${width}`;
        return this._canvas;
    }

    /**
     * Add a new layer to the clip converter
     *
     * @param {string} name the name of the layer
     * @param {number} scale the scale to set the layer to
     * @param {string} filter (optional) the filter to apply to the layer, defaults to "none"
     * @returns the updated list of layers
     */
    addLayer(name, scale, filter = "none") {
        const existing = this.getLayer(name);
        if (existing) {
            throw new Error(`Layer with name "${name}" already exists`);
        } else {
            this._layers.push({ name, scale, filter, source: this._video });
            this._drawLayers();
        }
        return this._layers;
    }

    /**
     * Remove a layer from the clip converter
     *
     * @param {string} name the name of the layer to remove
     * @returns the updated list of layers
     */
    removeLayer(name) {
        this._layers = this._layers.filter((layer) => layer.name !== name);
        this._drawLayers();
        return this._layers;
    }

    /**
     * Gets the layer with the given name
     *
     * @param {string} name the name of the layer to get
     * @returns the layer or undefined if not found
     */
    getLayer(name) {
        return this._layers.find((layer) => layer.name === name);
    }

    /**
     * Get the current list of layers on the clip converter
     *
     * @returns the current list of layers
     */
    getLayers() {
        return this._layers;
    }

    /**
     * Updates a layer with a new scale value
     *
     * @param {string} name the name of the layer to change
     * @param {number} scale the scale to set the layer to
     * @returns the updated list of layers
     */
    updateLayerScale(name, scale) {
        const layer = this.getLayer(name);
        if (layer) {
            layer.scale = scale;
            this._drawLayers();
        } else {
            throw new Error(`Layer with name "${name}" not found`);
        }
        return this._layers;
    }

    /**
     * Updates a layer with a new filter value
     *
     * @param {string} name the name of the layer to change
     * @param {string} filter the filter to set the layer to
     * @returns the updated list of layers
     */
    updateLayerFilter(name, filter) {
        const layer = this.getLayer(name);
        if (layer) {
            layer.filter = filter;
            this._drawLayers();
        } else {
            throw new Error(`Layer with name "${name}" not found`);
        }
        return this._layers;
    }

    /**
     * Plays the video on the preview canvas
     */
    previewPlay() {
        this._video.play();
    }

    /**
     * Pauses the video on the preview canvas
     */
    previewPause() {
        this._video.pause();
    }

    /**
     * Resets the video on the preview canvas to the beginning
     */
    previewReset() {
        this._video.currentTime = 0;
    }

    /**
     *
     * @param {number} fps the frames per second to render the clip at
     * @param {function} onFinishCallback a function taking a blob as an argument to call when done rendering
     * @param {function} onProgressCallback (optional) a function taking a number between 0 and 1, the percent complete, as an argument to call when progressing through the render
     */
    render(fps, onFinishCallback, onProgressCallback = () => {}) {
        const videoStream = this._canvas.captureStream(fps);
        const audioStream = this._video.captureStream(fps);
        const combinedStreams = new MediaStream([...videoStream.getVideoTracks(), ...audioStream.getAudioTracks()]);
        const recorder = new MediaRecorder(combinedStreams, { mimeType: "video/webm;codecs=vp9" });
        let outputChunks = [];
        let blob;

        recorder.ondataavailable = (event) => {
            outputChunks.push(event.data);
            onProgressCallback(this._video.currentTime / this._video.duration);
        };

        recorder.onstop = () => {
            this._video.volume = 1;
            onFinishCallback(new Blob(outputChunks, { type: "video/webm;codecs=vp9" }));
        };

        recorder.start(500);
        this._video.volume = 0.001; // mute for render
        this._video.currentTime = 0; // make sure the video is at its start
        this._video.play();
        this._video.onended = () => {
            clearInterval(this._playInterval);
            recorder.stop();
        };
    }
}

window.ClipConverter = ClipConverter;
