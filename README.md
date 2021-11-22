# clip-n-ship

Convert video clips to TikTok format easily

## About

ClipNShip is a simple library for use in converting videos into a format that is TikTok compatible. Entirely client-side, ClipNShip ensures there is no need to transfer any data between users and a server.

ClipNShip works in a system called "layers". The consumer uses the input media as a base and stacks layers on top of each other to create different effects and media sizes. This allows full control over how the result looks.

## Install

ClipNShip is a library built for browser use. You can add the module to your page by inserting the following tag in your header:

```html
<script src="https://cdn.jsdelivr.net/gh/mitchwadair/clip-n-ship@1.0.0/dist/clipnship.min.js"></script>
```

Having that tag will expose the `ClipConverter` class to the global scope for your use:

```js
const converter = new ClipConverter(videoURL);
```

## Documentation

For more info on how to use ClipNShip, check out the [docs](/doc) in this repo.

## Contribute

Want to contribute to ClipNShip?  Check out the [contribution guidelines](/CONTRIBUTING.md) to see how.

# Support

If you would like to help support maintaining ClipNShip, consider sponsoring me on [GitHub Sponsors](https://github.com/sponsors/mitchwadair). You can also give a one-time donation through [PayPal](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=9WS3KJPAV8JDJ&currency_code=USD).

<p align="center">
    <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=9WS3KJPAV8JDJ&currency_code=USD">
        <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg" height="75px" alt="PayPal Logo">
    </a>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <a href="https://github.com/sponsors/mitchwadair">
        <img src="https://github.githubassets.com/images/modules/site/sponsors/logo-mona-2.svg" height="75px" alt="GH Sponsors">
    </a>
</p>
