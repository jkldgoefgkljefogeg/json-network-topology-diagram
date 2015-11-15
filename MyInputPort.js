MyInputPort=function(_385b){
//InputPort.call(this,_385b);
  var aPort = this;
  var fff = function(e) {
    aPort.ctrlKey = e.ctrlKey;
  }
  var fff2 = function(e) {
    aPort.haveDragged = true;
  }
  Port.call(this,_385b);
  this.setZOrderBaseIndex = 104;
  this.setBackgroundColor(new Color(115,115,245));
  this.setColor(null);
  this.setDimension(10,10);
  this.setCoronaWidth(5);
  this.haveDragged = false;
  this.clonePort = false;
  if(this.html.addEventListener) {
    this.html.addEventListener("mouseup", fff,false);
    this.html.addEventListener("mousemove", fff,false);
  } else {
    if(this.html.attachEvent){
      this.html.attachEvent("onmouseup",fff);
      this.html.attachEvent("onmousemove",fff);
    }
  }
};
MyInputPort.prototype=new Port;
MyInputPort.prototype.type="MyInputPort";

MyInputPort.prototype.toJSON = function() {
  var js = new Object;
  var js_conns = new Array;
  var conns = this.getConnections();
  for(var k = 0; k<conns.length; k++) {
    if (conns[k].getSource() == this) {
      js_conns.push(conns[k].toJSON());
    }
  }
  js['connections'] = js_conns;
  js['x'] = this.getX();
  js['y'] = this.getY();
  js['id'] = this.getId();
  return js;
}

MyInputPort.prototype.onDoubleClick=function(){
  if(!this.annotation) {
    this.getParent().addAnnotation(this, "Port description", this.getX(), this.getY());
    this.annotation.doEdit();
    this.bgFlash();
  } else {
    this.annotation.bgFlash();
  }
}

MyInputPort.prototype.onDrag=function(){
  this.haveDragged = true;
  Rectangle.prototype.onDrag.call(this);
  this.parentNode.workflow.showConnectionLine(this.parentNode.x+this.x+this.width/2,this.parentNode.y+this.y+this.height/2,this.parentNode.x+this.originX,this.parentNode.y+this.originY);
  this.predragX = this.originX;
  this.predragY = this.originY;
}

MyInputPort.prototype.onDragend=function(){
  var myX = this.getX();
  var myY = this.getY();
  if (this.haveDragged) {
    // weird bug in the lib ?
    myX += this.width/2;
    myY += this.height/2;
    this.haveDragged = false;
  } else {
    this.predragX = myX;
    this.predragY = myY;
  }
  var fig = this.getParent();
  if (myX > -20 && myY > -20 && 
           myX < fig.width+20 && myY < fig.height+20) {
    if(this.ctrlKey) {
      var fig = this.getParent();
      var aPort = new MyInputPort();
      aPort.setWorkflow(fig.getWorkflow());
      fig.addPort(aPort, myX, myY);
      Port.prototype.paint.call(aPort);
    } else {
      this.setPosition(myX, myY);
      if(this.annotation) {
        var newdx = myX - this.predragX;
	var newdy = myY - this.predragY;
	this.annotation.DX += newdx;
	this.annotation.DY += newdy;
        this.annotation.setPosition(this.annotation.getX() + newdx, this.annotation.getY() + newdy);
      }
      //this.setOrigin(myX+10, myY+10);
    }  
  }
  Port.prototype.onDragend.call(this);
}


MyInputPort.prototype.onDrop=function(port){
if(port.getMaxFanOut&&port.getMaxFanOut()<=port.getFanOut()){
return;
}
if(this.parentNode.id==port.parentNode.id){
}else{
var _385d=new CommandConnect(this.parentNode.workflow,port,this);
_385d.setConnection(new ContextmenuConnection());
this.parentNode.workflow.getCommandStack().execute(_385d);
}
};

MyInputPort.prototype.getContextMenu=function(){
var menu=new Menu();
var oThis=this;
menu.appendMenuItem(new MenuItem("Delete port",null,function(){
workflow.commandStack.execute(new CommandDelete(oThis));
//oThis.getParent().removePort(oThis);
}));
return menu;
};


