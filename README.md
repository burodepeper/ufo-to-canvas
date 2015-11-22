# ufo-to-canvas

Draw UFO data on a JavaScript canvas

Status: active development

## Plan de campagne

Current plan-de-campagne and a small peek into what may come. I have absolutely no fixed plan, and I'll just see where this goes and/or ends up.

- [x] write a more convenient tool to parse the .glif-xml into a json-object.
- [x] create a UFOglif object, and pass the glyph-data and a reference to the UFO object as parameters
- [x] create a canvas and draw the contours of the glyph
- [ ] describe a possible API
- [ ] convert into a package sort of thing.
- [ ] create some sort of user-interface as a demo
- [ ] https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas
- [ ] https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths

## Usage (planned)

```js
var ufo = new UFO();
ufo.setSrc(url, callback);

var glyph = ufo.loadGlyph(name);
glyph.setContainer("#glyph-0020");
```

### Class UFO


### Class UFOglif
