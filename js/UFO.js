
// https://raw.githubusercontent.com/source-foundry/Hack-dev/usability/source/ufo/Hack/Hack-Regular.ufo
// https://raw.githubusercontent.com/source-foundry/Hack-dev/usability/source/ufo/Hack/Hack-Regular.ufo/fontinfo.plist
// https://raw.githubusercontent.com/source-foundry/Hack-dev/usability/source/ufo/Hack/Hack-Regular.ufo/glyphs/a.glif

function UFO () {
  this.glyphs = [];
}

UFO.prototype.setSrc = function (url, callback) {
  this.url = url;
  this._onLoadCallback = callback;
  this.loadFontInfo();
};

UFO.prototype.loadFontInfo = function () {
  var self = this,
      url = this.url+"/fontinfo.plist";
  $.ajax(url, {
    "cache": false,
    "crossDomain": true,
    success: function (data, status, xhr) {
      self.fontInfo = PlistParser.parse(data);
      self.getMetrics();
      if (self._onLoadCallback) {
        self._onLoadCallback();
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

UFO.prototype.loadGlyphData = function (name, container) {
  var self = this,
      url = this.url+"/glyphs/"+name+".glif";
  $.ajax(url, {
    "cache": false,
    "crossDomain": true,
    "dataType": "xml",
    success: function (data, status, xhr) {
      self.glyphs[name] = new UFOglif(data, self);
    }
  });
};

UFO.prototype.loadGlyphs = function (names) {

};

UFO.prototype.loadGlyph = function (name) {

};
