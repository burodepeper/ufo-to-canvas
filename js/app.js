var app = {

  init: function () {
    var self = this;
    this.ufo = new UFO();
    this.ufo.setSrc("https://raw.githubusercontent.com/source-foundry/Hack-dev/usability/source/ufo/Hack/Hack-Regular.ufo", function () {
      self.loadGlyphs();
    });
  },

  loadGlyphs: function () {
    this.ufo.loadGlyphData("a");

    var i, glyph, element,
        body = $("body"),
        glyphs = ["a", "A_", "ampersand", "at"];

    for (i = 0; i < glyphs.length; i++) {
      glyph = glyphs[i];
      element = $("<div class='glyph'>");
      element.appendTo(body);
      // this.ufo.loadGlyphData(glyph, element);
    }

  }

};

$(function () {
  app.init();
});
