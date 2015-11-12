function UFOglif (xml, ufo) {
  this.xml = xml;
  this.ufo = ufo;
  this.data = this.parseXML(xml);
  console.log(this.data);
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
