ContextmenuConnection=function(){
Connection.call(this);
this.type = "ContextmenuConnection";
this.sourcePort=null;
this.targetPort=null;
this.lineSegments=new Array();
this.setColor(new Color(128,128,255));
this.setLineWidth(2);
//this.setZOrder(101);
this.setZOrderBaseIndex = 101;
};
ContextmenuConnection.prototype=new Connection;

ContextmenuConnection.prototype.toJSON=function() {
  var js = new Object;
  var c = this.getColor();
  js['source'] = this.getSource().getId();
  js['target'] = this.getTarget().getId();
  js['color'] = c.getRed() + "," + c.getGreen() + "," + c.getBlue();
  //js['router'] = this.router;
  return js;
}

ContextmenuConnection.prototype.getContextMenu=function(){
var menu=new Menu();
var oThis=this;
//menu.appendMenuItem(new MenuItem("NULL Router",null,function(){ oThis.setRouter(null); }));
menu.appendMenuItem(new MenuItem("- Curvature -",null,function(){ }));
menu.appendMenuItem(new MenuItem("Squared curve",null,function(){ oThis.setRouter(new ManhattanConnectionRouter()); }));
menu.appendMenuItem(new MenuItem("Bezier curve",null,function(){ oThis.setRouter(new BezierConnectionRouter()); }));
//menu.appendMenuItem(new MenuItem("Fan Router",null,function(){ oThis.setRouter(new FanConnectionRouter()); }));
menu.appendMenuItem(new MenuItem("- Color -",null,function(){ }));

menu.appendMenuItem(new MenuItem("Light Blue", null,function(){oThis.setColor(new  Color(128,128,255));}));
menu.appendMenuItem(new MenuItem("Light Red", null,function(){oThis.setColor(new  Color(255,128,128));}));
menu.appendMenuItem(new MenuItem("Light Green", null,function(){oThis.setColor(new  Color(128,255,128));}));
menu.appendMenuItem(new MenuItem("Blue", null,function(){oThis.setColor(new  Color(0,0,200));}));
menu.appendMenuItem(new MenuItem("Green", null,function(){oThis.setColor(new  Color(0,200,0));}));
menu.appendMenuItem(new MenuItem("Red", null,function(){oThis.setColor(new  Color(200,0,0));}));
menu.appendMenuItem(new MenuItem("Gray", null,function(){oThis.setColor(new  Color(128,128,128));}));
menu.appendMenuItem(new MenuItem("Black", null,function(){oThis.setColor(new  Color(0,0,0));}));

return menu;
};
