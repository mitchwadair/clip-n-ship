# ClipNShip Documentation

Here you can find more information on how to use ClipNShip to build your awesome app!

## Install

Install through npm for use in ES modules

```sh
npm install clip-n-ship
```

```js
import ClipConverter from "clip-n-ship";
const converter = new ClipConverter(videoURL);
```

Or through CDN

```html
<script src="https://cdn.jsdelivr.net/gh/mitchwadair/clip-n-ship@v1.1.1/dist/clipnship.min.js"></script>
```

Having that tag will expose the `ClipConverter` class to the global scope for your use:

```js
const converter = new ClipConverter(videoURL);
```

## API

More information on the ClipNShip API can be found [here](api.md).
