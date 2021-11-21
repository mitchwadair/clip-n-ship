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
     * @typicalname converter
     * @param {URL} video the video to convert
     * @example
     * ```js
     * const video = new Blob(["file:///path/to/your/video/file.mp4"], { type: "video/mp4"});
     * const videoURL = URL.createObjectURL(video);
     *
     * const converter = new ClipConverter(videoURL);
     * ```
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
     * @param {string} width (optional) the width to set the preview canvas to, can be any valid css unit value
     * @returns the canvas of the clip converter
     * @example
     * ```js
     * // get the preview and add it to a container on your page
     * const preview = converter.getPreview();
     * document.getElementById("preview-container").prepend(preview);
     * ```
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
     * @param {string} filter (optional) the filter to apply to the layer. Valid values can be found [here](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/filter)
     * @returns the updated list of layers
     * @example
     * ```js
     * converter.addLayer("my-layer", 0.8, "blur(20px)");
     * ```
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
     * Gets the layer with the given name
     *
     * @param {string} name the name of the layer to get
     * @returns the layer object or undefined if not found
     * @example
     * ```js
     * const layer = converter.getLayer("my-layer");
     * // if using example above, should return:
     * // {
     * //    name: "my-layer",
     * //    scale: 0.8,
     * //    filter: "blur(20px)",
     * //    video: <video src="someblobdata" hidden/>
     * // }
     * ```
     */
    getLayer(name) {
        return this._layers.find((layer) => layer.name === name);
    }

    /**
     * Remove a layer from the clip converter
     *
     * @param {string} name the name of the layer to remove
     * @returns the updated list of layers
     * @example
     * ```js
     * converter.removeLayer("my-layer");
     * ```
     */
    removeLayer(name) {
        this._layers = this._layers.filter((layer) => layer.name !== name);
        this._drawLayers();
        return this._layers;
    }

    /**
     * Get the current list of layers on the clip converter
     *
     * @returns the current list of layers
     * @example
     * ```js
     * const layers = converter.getLayers();
     * ```
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
     * @example
     * ```js
     * converter.updateLayerScale("my-layer", 1.2);
     * ```
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
     * @param {string} filter the filter to set the layer to.  Valid values can be found [here](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/filter)
     * @returns the updated list of layers
     * @example
     * ```js
     * converter.updateLayerFilter("my-layer", "none");
     * ```
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
     * @example
     * ```js
     * converter.previewPlay();
     * ```
     */
    previewPlay() {
        this._video.play();
    }

    /**
     * Pauses the video on the preview canvas
     * @example
     * ```js
     * converter.previewPause();
     * ```
     */
    previewPause() {
        this._video.pause();
    }

    /**
     * Resets the video on the preview canvas to the beginning
     * @example
     * ```js
     * converter.previewReset();
     * ```
     */
    previewReset() {
        this.previewPause();
        this._video.currentTime = 0;
    }

    /**
     * The callback function for when the renderer completes rendering a clip
     *
     * @callback ClipConverter~onFinishCallback
     * @param {blob} data the data blob for the video, this is of type "video/webm;codecs=vp9"
     * @example
     * ```js
     * const onFinish = (data) => {
     *     // we'll assume a "download" function like the one here: https://stackoverflow.com/a/54626214
     *     const url = URL.createObjectURL(data);
     *     const downloadBtn = document.getElementById("download-btn");
     *     downloadBtn.onclick = () => download(url, "my_clip.webm");
     * }
     * ```
     */

    /**
     * The callback function for when the renderer updates with progress made
     *
     * @callback ClipConverter~onProgressCallback
     * @param {number} percent the percentage (between 0 and 1) complete the renderer currently is
     * @example
     * ```js
     * const onProgress = (percent) => {
     *     console.log(`Render is ${Math.round(percent * 100)}% done rendering`);
     * }
     * ```
     */

    /**
     * Render your clip with the given FPS value
     *
     * @param {number} fps the frames per second to render the clip at
     * @param {ClipConverter~onFinishCallback} onFinishCallback a function taking a blob as an argument to call when done rendering
     * @param {ClipConverter~onProgressCallback} onProgressCallback (optional) a function taking a number between 0 and 1, the percent complete, as an argument to call when progressing through the render
     * @example
     * ```js
     * // the function we'll call when rendering is complete
     * const onFinish = (data) => {
     *     // we'll assume a "download" function like the one here: https://stackoverflow.com/a/54626214
     *     const url = URL.createObjectURL(data);
     *     const downloadBtn = document.getElementById("download-btn");
     *     downloadBtn.onclick = () => download(url, "my_clip.webm");
     * }
     *
     * // the function we'll call when we get a progress update from the renderer
     * const onProgress = (percent) => {
     *     console.log(`Render is ${Math.round(percent * 100)}% done rendering`);
     * }
     *
     * converter.render(60, onFinish, onProgress);
     * ```
     */
    render(fps, onFinishCallback, onProgressCallback = () => {}) {
        const videoStream = this._canvas.captureStream(fps);
        const audioStream = this._video.captureStream(fps);
        const combinedStreams = new MediaStream([...videoStream.getVideoTracks(), ...audioStream.getAudioTracks()]);
        const recorder = new MediaRecorder(combinedStreams, { mimeType: "video/webm;codecs=vp9" });
        let outputChunks = [];

        recorder.ondataavailable = (event) => {
            outputChunks.push(event.data);
            onProgressCallback(this._video.currentTime / this._video.duration);
        };

        recorder.onstop = () => {
            this._video.volume = 1;
            onFinishCallback(new Blob(outputChunks, { type: "video/webm;codecs=vp9" }));
        };

        this.previewReset();
        this._video.volume = 0.001; // mute for render
        recorder.start(500);
        this._video.play();
        this._video.onended = () => {
            clearInterval(this._playInterval);
            recorder.stop();
        };
    }
}

window.ClipConverter = ClipConverter;
