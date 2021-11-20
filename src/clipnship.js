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
     * @param {number} width the width in pixels to set the preview to
     * @returns the canvas of the clip converter
     */
    getPreview(width = 500) {
        this._canvas.style = `width: ${width}px`;
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

    previewPlay() {
        this._video.play();
    }

    previewPause() {
        this._video.pause();
    }

    previewReset() {
        this._video.currentTime = 0;
    }
}

// const renderClip = () => {
//     const videoStream = canvas.captureStream(60);
//     //const audioStream = video.captureStream(60);
//     const combinedStream = new MediaStream([...videoStream.getVideoTracks(), ...audioStream.getAudioTracks()]);
//     const recorder = new MediaRecorder(combinedStream, { mimeType: "video/webm;codecs=vp9" });
//     let outputChunks = [];

//     recorder.ondataavailable = (event) => {
//         outputChunks.push(event.data);
//     };

//     recorder.onstop = () => {
//         let blob = new Blob(outputChunks, { type: "video/webm;codecs=vp9" });
//         download(blob);
//     };

//     recorder.start(500);
//     /*video.play();
//     video.onended = () => {
//         clearInterval(interval);
//         recorder.stop();
//     };*/
// };

window.ClipConverter = ClipConverter;
