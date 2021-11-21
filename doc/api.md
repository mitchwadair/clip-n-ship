<a name="ClipConverter"></a>

## ClipConverter
**Kind**: global class  
**License**: Copyright (c) 2021 Mitchell Adair

* [ClipConverter](#ClipConverter)
    * [new ClipConverter(video)](#new_ClipConverter_new)
    * _instance_
        * [.getPreview(width)](#ClipConverter+getPreview) ⇒
        * [.addLayer(name, scale, filter)](#ClipConverter+addLayer) ⇒
        * [.getLayer(name)](#ClipConverter+getLayer) ⇒
        * [.removeLayer(name)](#ClipConverter+removeLayer) ⇒
        * [.getLayers()](#ClipConverter+getLayers) ⇒
        * [.updateLayerScale(name, scale)](#ClipConverter+updateLayerScale) ⇒
        * [.updateLayerFilter(name, filter)](#ClipConverter+updateLayerFilter) ⇒
        * [.previewPlay()](#ClipConverter+previewPlay)
        * [.previewPause()](#ClipConverter+previewPause)
        * [.previewReset()](#ClipConverter+previewReset)
        * [.render(fps, onFinishCallback, onProgressCallback)](#ClipConverter+render)
    * _inner_
        * [~onFinishCallback](#ClipConverter..onFinishCallback) : <code>function</code>
        * [~onProgressCallback](#ClipConverter..onProgressCallback) : <code>function</code>

<a name="new_ClipConverter_new"></a>

### new ClipConverter(video)
The ClipConverter constructor


| Param | Type | Description |
| --- | --- | --- |
| video | <code>URL</code> | the video to convert |

**Example**  
```js
<a name="ClipConverter+getPreview"></a>

### converter.getPreview(width) ⇒
Get the canvas element of the clip converter

**Kind**: instance method of [<code>ClipConverter</code>](#ClipConverter)  
**Returns**: the canvas of the clip converter  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| width | <code>string</code> | <code>&quot;500px&quot;</code> | (optional) the width to set the preview canvas to, can be any valid css unit value |

**Example**  
```js
<a name="ClipConverter+addLayer"></a>

### converter.addLayer(name, scale, filter) ⇒
Add a new layer to the clip converter

**Kind**: instance method of [<code>ClipConverter</code>](#ClipConverter)  
**Returns**: the updated list of layers  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | the name of the layer |
| scale | <code>number</code> |  | the scale to set the layer to |
| filter | <code>string</code> | <code>&quot;none&quot;</code> | (optional) the filter to apply to the layer. Valid values can be found [here](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/filter) |

**Example**  
```js
<a name="ClipConverter+getLayer"></a>

### converter.getLayer(name) ⇒
Gets the layer with the given name

**Kind**: instance method of [<code>ClipConverter</code>](#ClipConverter)  
**Returns**: the layer object or undefined if not found  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | the name of the layer to get |

**Example**  
```js
<a name="ClipConverter+removeLayer"></a>

### converter.removeLayer(name) ⇒
Remove a layer from the clip converter

**Kind**: instance method of [<code>ClipConverter</code>](#ClipConverter)  
**Returns**: the updated list of layers  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | the name of the layer to remove |

**Example**  
```js
<a name="ClipConverter+getLayers"></a>

### converter.getLayers() ⇒
Get the current list of layers on the clip converter

**Kind**: instance method of [<code>ClipConverter</code>](#ClipConverter)  
**Returns**: the current list of layers  
**Example**  
```js
<a name="ClipConverter+updateLayerScale"></a>

### converter.updateLayerScale(name, scale) ⇒
Updates a layer with a new scale value

**Kind**: instance method of [<code>ClipConverter</code>](#ClipConverter)  
**Returns**: the updated list of layers  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | the name of the layer to change |
| scale | <code>number</code> | the scale to set the layer to |

**Example**  
```js
<a name="ClipConverter+updateLayerFilter"></a>

### converter.updateLayerFilter(name, filter) ⇒
Updates a layer with a new filter value

**Kind**: instance method of [<code>ClipConverter</code>](#ClipConverter)  
**Returns**: the updated list of layers  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | the name of the layer to change |
| filter | <code>string</code> | the filter to set the layer to.  Valid values can be found [here](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/filter) |

**Example**  
```js
<a name="ClipConverter+previewPlay"></a>

### converter.previewPlay()
Plays the video on the preview canvas

**Kind**: instance method of [<code>ClipConverter</code>](#ClipConverter)  
**Example**  
```js
<a name="ClipConverter+previewPause"></a>

### converter.previewPause()
Pauses the video on the preview canvas

**Kind**: instance method of [<code>ClipConverter</code>](#ClipConverter)  
**Example**  
```js
<a name="ClipConverter+previewReset"></a>

### converter.previewReset()
Resets the video on the preview canvas to the beginning

**Kind**: instance method of [<code>ClipConverter</code>](#ClipConverter)  
**Example**  
```js
<a name="ClipConverter+render"></a>

### converter.render(fps, onFinishCallback, onProgressCallback)
Render your clip with the given FPS value

**Kind**: instance method of [<code>ClipConverter</code>](#ClipConverter)  

| Param | Type | Description |
| --- | --- | --- |
| fps | <code>number</code> | the frames per second to render the clip at |
| onFinishCallback | [<code>onFinishCallback</code>](#ClipConverter..onFinishCallback) | a function taking a blob as an argument to call when done rendering |
| onProgressCallback | [<code>onProgressCallback</code>](#ClipConverter..onProgressCallback) | (optional) a function taking a number between 0 and 1, the percent complete, as an argument to call when progressing through the render |

**Example**  
```js
<a name="ClipConverter..onFinishCallback"></a>

### ClipConverter~onFinishCallback : <code>function</code>
The callback function for when the renderer completes rendering a clip

**Kind**: inner typedef of [<code>ClipConverter</code>](#ClipConverter)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>blob</code> | the data blob for the video, this is of type "video/webm;codecs=vp9" |

**Example**  
```js
<a name="ClipConverter..onProgressCallback"></a>

### ClipConverter~onProgressCallback : <code>function</code>
The callback function for when the renderer updates with progress made

**Kind**: inner typedef of [<code>ClipConverter</code>](#ClipConverter)  

| Param | Type | Description |
| --- | --- | --- |
| percent | <code>number</code> | the percentage (between 0 and 1) complete the renderer currently is |

**Example**  
```js