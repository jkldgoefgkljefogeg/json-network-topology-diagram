/* This notice must be untouched at all times.

Open-jACOB Draw2D
The latest version is available at
http://www.openjacob.org

Copyright (c) 2006 Andreas Herz. All rights reserved.
Created 5. 11. 2006 by Andreas Herz (Web: http://www.freegroup.de )

LICENSE: LGPL

This library is free software; you can redistribute it and/or
modify it under the terms of the GNU Lesser General Public
License (LGPL) as published by the Free Software Foundation; either
version 2.1 of the License, or (at your option) any later version.

This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public
License along with this library; if not, write to the Free Software
Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA,
or see http://www.gnu.org/copyleft/lesser.html
*/
JSONSerializer=function()
{
}

/** @private **/
JSONSerializer.prototype.type="JSONSerializer";


JSONSerializer.prototype.xml2DOM = function(text) {
  var doc;
  try {
    if (window.ActiveXObject) {
      doc=new ActiveXObject("Microsoft.XMLDOM");
      doc.async="false";
      doc.loadXML(text);
    } else {
      // code for Mozilla, Firefox, Opera, etc.
      var parser=new DOMParser();
      doc=parser.parseFromString(text,"text/xml");
    }
  } catch (e) {
    alert("Exception while parsing XML into DOM: " + e);
  }
  return doc.documentElement;
};


JSONSerializer.prototype.makeObject=function(/*:Document*/ objType, x, y)
{
  var obj = eval("new " + objType + "();");
  workflow.addFigure(obj, x, y);
  return obj;
}

JSONSerializer.prototype.fromXML=function(/*:Document*/ xmltext)
{
  var dom = this.xml2DOM(xmltext);
  var q = Ext.DomQuery;
  var figures = q.select("figure", dom);
  var allPorts = new Array();
  var allFigures = new Array();
  
  for (var i=0; i<figures.length; i++) {
    var fig = figures[i];
    var obj = this.makeObject(fig.getAttribute('type'), fig.getAttribute('x'), 
            fig.getAttribute('y'));
    obj.id = fig.getAttribute('id');
    allFigures.push(obj);

    var ports = q.select('port', fig);
    var tports = obj.getPorts();
    for(var j=0; j<ports.length;j++) {
      tports[j].id = ports[j].getAttribute('id');   
      allPorts[tports[j].id] = tports[j];
    }
  }
  for (var i=0; i<allFigures.length; i++) {
    var fig = allFigures[i];
    var p1 = fig.getPosition();
    fig.setPosition(p1.getX()+1, p1.getY()+1);
    fig.setPosition(p1.getX()-1, p1.getY()-1);
  }

  for (var i=0; i<figures.length; i++) {
    var fig = figures[i];
    var ports = q.select('port', fig);
    for(var j=0; j<ports.length;j++) {
      var conns = q.select('connection', ports[j]);
      for(var k=0; k<conns.length; k++) {
	var src = allPorts[conns[k].getAttribute('source')];
	var dst = allPorts[conns[k].getAttribute('target')];
        var xxx = new CommandConnect(src.parentNode.workflow, src, dst);
	var conn = new ContextmenuConnection();
	xxx.setConnection(conn);
	src.parentNode.workflow.getCommandStack().execute(xxx);
      }
    }
  }

  for (var i=0; i<allFigures.length; i++) {
    var fig = allFigures[i];
    var p1 = fig.getPosition();
    fig.setPosition(p1.getX()+1, p1.getY()+1);
  }
}
/**
 * Return the draw2d document as XML
 *
 * @param {Document} document The Draw2D document
 * @type String
 * @see ToolSave
 **/
JSONSerializer.prototype.toJSON=function(/*:Document*/ document)
{
  var js_figures = new Array;
  var js = new Object;

  var figures = document.getFigures();
  for(var i=0;i< figures.length; i++)
  {
    var figure = figures[i];
    if (figure.type != "-label-") {
      js_figures.push(figure.toJSON());
    }
  }
  js['figures'] = js_figures;
  return js;
}

JSONSerializer.prototype.fromJSON=function(js)
{

  var figures = js['figures'];
  var allPorts = new Array();
  var allFigures = new Array();
  var idx = new Object();
  
  for (var i=0; i<figures.length; i++) {
    var fig = figures[i];
    addDragIconPic(fig['subtype'], "icons_div", fig['pic']);
    var obj = this.makeObject(fig['type'], fig['x'], fig['y']);
    obj.id = fig['id'];
    obj.setPic(fig['pic']);
    obj.subtype = fig['subtype'];
    obj.setDimension(fig['width'], fig['height']);
    obj.setSelectable(true);
    allFigures.push(obj);
    idx[obj.id] = obj;

    var ports = fig['ports'];
    var tports = obj.getPorts();
    for(var j=0; j<ports.length;j++) {
      if (j < tports.length) {
        tports[j].id = ports[j]['id'];
        tports[j].setPosition(ports[j]['x'], ports[j]['y']);
        tports[j].setOrigin(ports[j]['x'], ports[j]['y']);
      } else {
        var aPort = new MyInputPort();
	aPort.setWorkflow(fig.getWorkflow());
	fig.addPort(aPort, ports[j]['x'], ports[j]['y']);
	Port.prototype.paint.call(aPort);
        tports.push(aPort);
      }
      allPorts[tports[j].id] = tports[j];
      idx[tports[j].id] = tports[j];

    }
  }
  // A hack to properly position figures 
  for (var i=0; i<allFigures.length; i++) {
    var fig = allFigures[i];
    var p1 = fig.getPosition();
    //fig.setPosition(p1.getX()+1, p1.getY()+1);
    fig.setPosition(p1.getX()-1, p1.getY()-1);
  }

  for (var i=0; i<figures.length; i++) {
    var fig = figures[i];
    var ports = fig['ports'];
    var annotations = fig['annotations'];
    for(var j=0; j<ports.length;j++) {
      var conns = ports[j]['connections'];
      for(var k=0; k<conns.length; k++) {
	var src = allPorts[conns[k]['source']];
	var dst = allPorts[conns[k]['target']];
        var xxx = new CommandConnect(src.parentNode.workflow, src, dst);
	var conn = new ContextmenuConnection();
	if (conns[k]['color']) {
	  conn.setColor(eval("new Color(" + conns[k]['color'] + ")"));
	}
	xxx.setConnection(conn);
	src.parentNode.workflow.getCommandStack().execute(xxx);
      }
    }
    
    for(j=0; j<annotations.length; j++) {
      var ann = annotations[j];
      var obj = idx[fig['id']];
      var dx = obj.getX();
      var dy = obj.getY();
      obj.addAnnotation(idx[ann['for']], ann['text'], ann['x']-dx-1, ann['y']-dy-1);
    }
  }
  // put them where they were
  for (var i=0; i<allFigures.length; i++) {
    var fig = allFigures[i];
    var p1 = fig.getPosition();
    fig.setPosition(p1.getX()+1, p1.getY()+1);
  }
}

/**
 * Recursive call to all children of a ComparmtentFigure
 *
 * @param {CompartmentFigure} The CompartmentFigure for the XML serialization
 * @param {String} suffix Some spaces used to pretty print the XML
 * @type String
 **/
JSONSerializer.prototype.getChildXML=function(/*:CompartmentFigure*/ compartmentFigure, /*:String*/ suffix)
{
  var xml = "";

  var figures = compartmentFigure.getChildren();
  for(var i=0;i< figures.length; i++)
  {
    var figure = figures[i];
    xml = xml +suffix+'<'+figure.type+' x="'+figure.getX()+'" y="'+figure.getY()+'" id="'+figure.getId()+'">\n';
    xml = xml +this.getPropertyXML(figure,"   "+suffix);
    if(figure instanceof CompartmentFigure)
    {
       xml = xml + this.getChildXML(figure,"   "+suffix);
    }
    xml = xml +suffix+'</'+figure.type+'>\n';
  }
  return xml;
}

/**
 * Serialize the user defined properties to XML/String
 *
 * @param {Figure} The Figure which stores the properties.
 * @param {String} suffix Some spaces used to pretty print the XML
 * @type String
 **/
JSONSerializer.prototype.getPropertyXML=function(/*:Figure*/ figure, /*:String*/ suffix)
{
  var xml = "";
  var properties = figure.getProperties();
  for(key in properties)
  {
    var value = properties[key];
    if(value!=null)
    {
       xml = xml +suffix+'<property name="'+key+'" value="'+value+'">\n';
    }
  }
  return xml;
}
