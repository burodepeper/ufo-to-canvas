var app = {
  init: function () {
    this.ufo = new UFO();
    this.ufo.setSrc("https://raw.githubusercontent.com/source-foundry/Hack-dev/usability/source/ufo/Hack/Hack-Regular.ufo");
    this.ufo.loadFontInfo();
  }
};

$(function () {
  app.init();
});