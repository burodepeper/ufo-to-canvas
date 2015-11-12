var app = {
  init: function () {
    this.ufo = new UFO();
    this.ufo.setSrc("https://raw.githubusercontent.com/source-foundry/Hack-dev/usability/source/ufo/Hack/Hack-Regular.ufo");
    this.ufo.loadFontInfo();

    // too lazy to create callback ;)
    setTimeout(function () {
      app.ufo.loadGlyphData("a");
    }, 250);
    
  }
};

$(function () {
  app.init();
});
