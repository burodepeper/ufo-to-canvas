
// https://raw.githubusercontent.com/source-foundry/Hack-dev/usability/source/ufo/Hack/Hack-Regular.ufo
// https://raw.githubusercontent.com/source-foundry/Hack-dev/usability/source/ufo/Hack/Hack-Regular.ufo/fontinfo.plist
// https://raw.githubusercontent.com/source-foundry/Hack-dev/usability/source/ufo/Hack/Hack-Regular.ufo/glyphs/a.glif

function UFO (options) {
  this.glyphs = [];
  this.options = options;
  this.loadFontInfo();
}

UFO.prototype.loadFontInfo = function () {

  var self = this,
      url = this.options.url+"/fontinfo.plist";

  $.ajax(url, {
    "cache": false,
    "crossDomain": true,
    success: function (data, status, xhr) {
      self.fontInfo = PlistParser.parse(data);
      self.getMetrics();
      if (self.options.onLoad) {
        self.options.onLoad();
      }
    }
  });

};

UFO.prototype.getMetrics = function () {
  this.ascender = this.fontInfo.ascender;
  this.capHeight = this.fontInfo.capHeight;
  this.descender = this.fontInfo.descender;
  this.unitsPerEm = this.fontInfo.unitsPerEm;
  this.xHeight = this.fontInfo.xHeight;
};

UFO.prototype.loadGlyphs = function (names, callback) {
  for (var i = 0; i < names.length; i++) {
    this.loadGlyph(names[i]);
  }
};

UFO.prototype.loadGlyph = function (name) {

  var self = this,
      url = this.options.url+"/glyphs/"+name+".glif";

  $.ajax(url, {
    "cache": false,
    "crossDomain": true,
    "dataType": "xml",
    success: function (data, status, xhr) {
      self.glyphs[name] = new UFOglif(data, self);
    }
  });

};

UFO.prototype.setCanvas = function (id, size) {
  this.canvas = document.getElementById(id);
  this.context = this.canvas.getContext('2d');
  this.setSize(size);
};

UFO.prototype.setSize = function (size) {
  this.size = size;
  for (var i in this.glyphs) {
    this.glyphs[i].setSize(size);
  }
};

UFO.prototype.drawGlyphs = function (names) {
  var i, name, left = 0;

  // set size of canvas _before_ drawing glyphs.
  // <canvas> gets distorted when changing dimensions after drawing
  this.canvas.setAttribute("height", this.size);
  this.canvas.setAttribute("width", this.getWidthFor(names));

  for (i = 0; i < names.length; i++) {
    name = names[i];
    this.loadGlyph(name);
    left += this.glyphs[name].draw(this.context, left);
  }
};

UFO.prototype.getWidthFor = function (names) {
  var i, width = 0;
  for (i = 0; i < names.length; i++) {
    width += this.glyphs[names[i]].getWidth();
  }
  return width;
};
