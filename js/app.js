var app = {

  init: function () {
    var self = this;
    this.ufo = new UFO({
      url: "https://raw.githubusercontent.com/source-foundry/Hack-dev/usability/source/ufo/Hack/Hack-Regular.ufo",
      onLoad: function () {
        self.loadGlyphs();
      }
    });
  },

  loadGlyphs: function () {
    var self = this;
    // this.ufo.loadGlyphs(["a", "A_", "ampersand", "at"], function () {
    //   self.drawGlyphs();
    // });
    this.ufo.loadGlyphs(["a", "A_", "ampersand", "at"]);
    setTimeout(function () {
      self.drawGlyphs();
    }, 1000);
  },

  drawGlyphs: function () {

    this.ufo.setCanvas("tiny", 24);
    this.ufo.drawGlyphs(["a", "A_", "ampersand", "at"]);

    this.ufo.setCanvas("small", 48);
    this.ufo.drawGlyphs(["a", "A_", "ampersand", "at"]);

    this.ufo.setCanvas("medium", 96);
    this.ufo.drawGlyphs(["a", "A_", "ampersand", "at"]);

    this.ufo.setCanvas("large", 192);
    this.ufo.drawGlyphs(["a", "A_", "ampersand", "at"]);

    this.ufo.setCanvas("huge", 384);
    this.ufo.drawGlyphs(["a", "A_", "ampersand", "at"]);

  }

};

$(function () {
  app.init();
});
