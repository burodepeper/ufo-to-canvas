var app = {
  init: function () {
    this.ufo = new UFO();
    this.ufo.setSrc("https://raw.githubusercontent.com/source-foundry/Hack-dev/usability/source/ufo/Hack/Hack-Regular.ufo");

    // too lazy to create callback ;)
    setTimeout(function () {
      app.ufo.loadGlyphData("a");
      // app.ufo.loadGlyphData("A_");
      // app.ufo.loadGlyphData("ampersand");
      // app.ufo.loadGlyphData("at");
    }, 250);

  }
};

$(function () {
  app.init();
});
