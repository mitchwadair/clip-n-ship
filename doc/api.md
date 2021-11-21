<a name="ClipConverter"></a>

## ClipConverter
**Kind**: global class  
**License**: Copyright (c) 2021 Mitchell AdairThis software is released under the MIT License.https://opensource.org/licenses/MIT  

* [ClipConverter](#ClipConverter)
    * [new ClipConverter(video)](#new_ClipConverter_new)
    * [.getPreview(width)](#ClipConverter+getPreview) ⇒
    * [.addLayer(name, scale, filter)](#ClipConverter+addLayer) ⇒
    * [.removeLayer(name)](#ClipConverter+removeLayer) ⇒
    * [.getLayer(name)](#ClipConverter+getLayer) ⇒
    * [.getLayers()](#ClipConverter+getLayers) ⇒
    * [.updateLayerScale(name, scale)](#ClipConverter+updateLayerScale) ⇒
    * [.updateLayerFilter(name, filter)](#ClipConverter+updateLayerFilter) ⇒
    * [.previewPlay()](#ClipConverter+previewPlay)
    * [.previewPause()](#ClipConverter+previewPause)
    * [.previewReset()](#ClipConverter+previewReset)
    * [.render(fps, onFinishCallback, onProgressCallback)](#ClipConverter+render)

<a name="new_ClipConverter_new"></a>

### new ClipConverter(video)
The ClipConverter constructor


| Param | Type | Description |
| --- | --- | --- |
| video | <code>blob</code> | the video to convert |

<a name="ClipConverter+getPreview"></a>

### clipConverter.getPreview(width) ⇒
Get the canvas element of the clip converter

**Kind**: instance method of [<code>ClipConverter</code>](#ClipConverter)  
**Returns**: the canvas of the clip converter  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| width | <code>string</code> | <code>&quot;500px&quot;</code> | the width to set the preview canvas to, can be any valid css unit value |

<a name="ClipConverter+addLayer"></a>

### clipConverter.addLayer(name, scale, filter) ⇒
Add a new layer to the clip converter

**Kind**: instance method of [<code>ClipConverter</code>](#ClipConverter)  
**Returns**: the updated list of layers  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | the name of the layer |
| scale | <code>number</code> |  | the scale to set the layer to |
| filter | <code>string</code> | <code>&quot;none&quot;</code> | (optional) the filter to apply to the layer, defaults to "none" |

<a name="ClipConverter+removeLayer"></a>

### clipConverter.removeLayer(name) ⇒
Remove a layer from the clip converter

**Kind**: instance method of [<code>ClipConverter</code>](#ClipConverter)  
**Returns**: the updated list of layers  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | the name of the layer to remove |

<a name="ClipConverter+getLayer"></a>

### clipConverter.getLayer(name) ⇒
Gets the layer with the given name

**Kind**: instance method of [<code>ClipConverter</code>](#ClipConverter)  
**Returns**: the layer or undefined if not found  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | the name of the layer to get |

<a name="ClipConverter+getLayers"></a>

### clipConverter.getLayers() ⇒
Get the current list of layers on the clip converter

**Kind**: instance method of [<code>ClipConverter</code>](#ClipConverter)  
**Returns**: the current list of layers  
<a name="ClipConverter+updateLayerScale"></a>

### clipConverter.updateLayerScale(name, scale) ⇒
Updates a layer with a new scale value

**Kind**: instance method of [<code>ClipConverter</code>](#ClipConverter)  
**Returns**: the updated list of layers  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | the name of the layer to change |
| scale | <code>number</code> | the scale to set the layer to |

<a name="ClipConverter+updateLayerFilter"></a>

### clipConverter.updateLayerFilter(name, filter) ⇒
Updates a layer with a new filter value

**Kind**: instance method of [<code>ClipConverter</code>](#ClipConverter)  
**Returns**: the updated list of layers  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | the name of the layer to change |
| filter | <code>string</code> | the filter to set the layer to |

<a name="ClipConverter+previewPlay"></a>

### clipConverter.previewPlay()
Plays the video on the preview canvas

**Kind**: instance method of [<code>ClipConverter</code>](#ClipConverter)  
<a name="ClipConverter+previewPause"></a>

### clipConverter.previewPause()
Pauses the video on the preview canvas

**Kind**: instance method of [<code>ClipConverter</code>](#ClipConverter)  
<a name="ClipConverter+previewReset"></a>

### clipConverter.previewReset()
Resets the video on the preview canvas to the beginning

**Kind**: instance method of [<code>ClipConverter</code>](#ClipConverter)  
<a name="ClipConverter+render"></a>

### clipConverter.render(fps, onFinishCallback, onProgressCallback)
**Kind**: instance method of [<code>ClipConverter</code>](#ClipConverter)  

| Param | Type | Description |
| --- | --- | --- |
| fps | <code>number</code> | the frames per second to render the clip at |
| onFinishCallback | <code>function</code> | a function taking a blob as an argument to call when done rendering |
| onProgressCallback | <code>function</code> | (optional) a function taking a number between 0 and 1, the percent complete, as an argument to call when progressing through the render |

