function UFOglif (xml, ufo) {

  this.xml = xml;
  this.ufo = ufo;
  this.data = this.parseXML(xml).glyph;
  // TODO check if data is valid
  // console.log(this.ufo);

  // NOTE temporary implementation
  this.data.advance.height = this.ufo.unitsPerEm;
  this.ratio = this.data.advance.width / this.data.advance.height;

}

UFOglif.prototype.parseXML = function (xml) {

  var data = {},
      self = this,
      i, j, node, name, attribute;

  // element with optional attributes
  if (xml.nodeType === 1) {
    if (xml.attributes.length > 0) {
      for (j = 0; j < xml.attributes.length; j++) {
        attribute = xml.attributes.item(j);
        data[attribute.nodeName] = attribute.nodeValue;
      }
    }

  // text node,
  // ignore them if they are nothing but whitespace
  } else if (xml.nodeType === 3) {
    value = xml.nodeValue.trim();
    if (value.length) {
      data = value;
    } else {
      data = false;
    }
  }

  // parse children
  if (xml.hasChildNodes()) {
    for (i = 0; i < xml.childNodes.length; i++) {
      node = xml.childNodes.item(i);
      name = node.nodeName;
      result = self.parseXML(node);
      if (result) {
        if (data[name] === undefined) {
          data[name] = result;
        } else if (data[name] instanceof Array) {
          data[name].push(result);
        } else {
          data[name] = [data[name]];
          data[name].push(result);
        }
      }
    }
  }

  return data;

};

UFOglif.prototype.setSize = function (size) {
  this.size = size;
  this.scale = this.size / this.data.advance.height;
  this.height = this.size;
  this.width = this.size * this.ratio;
  this.yOffset = this.ufo.descender * this.scale;
};

UFOglif.prototype.getWidth = function () {
  return this.width;
};

UFOglif.prototype.draw = function (context, left) {

  var i, j, contour, point,
      x, y, x1, y1, x2, y2,
      controlPoints = [],
      metrics = ["ascender", "capHeight", "xHeight"];

  // create canvas,
  // attach to body,
  // set dimensions,
  // get context
  // this.canvas = $("<canvas>").appendTo($(document.body));
  // this.canvas.attr("width", this.width);
  // this.canvas.attr("height", this.height);
  // this.canvas.css({
  //   "display": "block",
  //   "position": "absolute",
  //   "top": "50%",
  //   "left": "50%",
  //   "margin": (this.height / -2)+"px 0 0 "+(this.width / -2)+"px",
  //   "box-shadow": "0 0 18px rgba(0, 0, 0, 0.25)"
  // });
  // this.context = this.canvas[0].getContext("2d");
  // context = this.context;

  // draw metrics
  context.beginPath();
  context.strokeStyle = "rgba(255, 0, 0, 0.25)";
  y = this.height + this.yOffset;
  context.moveTo(left, y);
  context.lineTo(left + this.width, y);
  context.stroke();

  if (left !== 0) {
    context.moveTo(left, 0);
    context.lineTo(left, this.height);
    context.stroke();
  }

  // for (i = 0; i < metrics.length; i++) {
  //   y = this.height - (this.ufo[metrics[i]] * this.scale) + this.yOffset;
  //   context.moveTo(left, y);
  //   context.lineTo(left + this.width, y);
  //   context.stroke();
  // }

  // draw shape(s)
  context.strokeStyle = 'rgba(0, 0, 0, 1)';
  context.fillStyle = 'rgba(0, 153, 0, 0.25)';
  for (i = 0; i < this.data.outline.contour.length; i++) {
    contour = this.data.outline.contour[i];

    // NOTE temporary
    // Duplicate the first point, and move it to the back of the contour,
    // to close the path.
    contour.point.push(contour.point[0]);

    context.beginPath();
    for (j = 0; j < contour.point.length; j++) {
      point = contour.point[j];
      x = left + (parseInt(point.x) * this.scale);
      y = this.height - (parseInt(point.y) * this.scale) + this.yOffset;
      point._x = x;
      point._y = y;
      if (j === 0) {
        context.moveTo(x, y);
      } else if (point.type === "line") {
        context.lineTo(x, y);
        controlPoints = [];
      } else if (point.type === "curve") {
        if (controlPoints.length === 1) {

        } else if (controlPoints.length === 2) {
          x1 = controlPoints[0]._x;
          y1 = controlPoints[0]._y;
          x2 = controlPoints[1]._x;
          y2 = controlPoints[1]._y;
          context.bezierCurveTo(x1, y1, x2, y2, x, y);
        }
        controlPoints = [];
      } else {
        controlPoints.push(point);
      }
    }
    context.stroke();
    context.fill();
  }
  context.closePath();

  return this.width;

};
