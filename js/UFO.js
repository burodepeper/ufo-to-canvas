
// UFO
//
// https://github.com/source-foundry/Hack-dev/tree/usability/source/ufo/Hack/Hack-Regular.ufo
// https://github.com/source-foundry/Hack-dev/blob/usability/source/ufo/Hack/Hack-Regular.ufo/fontinfo.plist
// https://github.com/source-foundry/Hack-dev/blob/usability/source/ufo/Hack/Hack-Regular.ufo/glyphs/a.glif
//
// https://raw.githubusercontent.com/source-foundry/Hack-dev/usability/source/ufo/Hack/Hack-Regular.ufo
// https://raw.githubusercontent.com/source-foundry/Hack-dev/usability/source/ufo/Hack/Hack-Regular.ufo/fontinfo.plist
// https://raw.githubusercontent.com/source-foundry/Hack-dev/usability/source/ufo/Hack/Hack-Regular.ufo/glyphs/a.glif


// Could be interesting:
// http://goessner.net/download/prj/jsonxml/

function UFO () {
  this.glyphs = [];
}

UFO.prototype.setSrc = function (url) {
  this.url = url;
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

UFO.prototype.loadGlyphData = function (name) {
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
