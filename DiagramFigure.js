Figure.prototype.toggleBackground=function()
{
  if(this.highlight) {
    this.setBackgroundColor(new  Color(245,115,115));
  } else {
    this.setBackgroundColor(new  Color(115,245,115));
  }
  this.highlight = !this.highlight;
  this.toggleCountdown--;
  if (this.toggleCountdown == 0) {
    window.clearInterval(this.toggleTimer);
    this.setBackgroundColor(this.xsaveOldBackgroundColor);
  }
}


Figure.prototype.bgFlash = function() {
  if (this.toggleCountdown) {
    return;
  }
  this.toggleCountdown = 10;
  this.aOldBorder = this.border;
  try {
    this.xsaveOldBackgroundColor = this.getBackgroundColor();
  } catch (e) {
    this.xsaveOldBackgroundColor = null;
  }
  var oThis = this;
  var func = function(){oThis.toggleBackground();};
  this.highlight=false;
  this.toggleTimer = window.setInterval(func,100);
/*
  var aOldBorder = this.border;
  var aThis = this;
  var fff = function(aOld, aCount) {
    if (aCount == 0) {
      aThis.setBorder(aOld);
    } else {
      var brd = new Border();
      if(aCount%2==0) {
        brd.setColor(new Color(115,115,245));
      } else {
        brd.setColor(null);
      }
      aThis.setBorder(brd);
      this.setBackgroundColor(new  Color(245,115,115));
      setTimeout(function() { fff(aOld, aCount-1); }, 500);
    }
  }
  fff(aOldBorder, 10);
*/
}


Node.prototype.addAnnotation = function(aForWhat, aText, aAnnX, aAnnY) {
  if(!this.annotations) {
    this.annotations = new Array;
    this.oldSetPosition = this.setPosition;
    this.setPosition = function(aX, aY) {
      this.oldSetPosition(aX, aY);
      for(var i=0; i<this.annotations.length;i++) {
        var ann = this.annotations[i];
        ann.setPosition(aX+ann.DX, aY+ann.DY);
      }
    }

    this.oldOnDrag = this.onDrag;
    this.onDrag = function() {
      var oldX=this.getX();
      var oldY=this.getY();
      this.oldOnDrag();
      for(var i=0; i<this.annotations.length;i++) {
        var child = this.annotations[i];
        child.setPosition(child.getX()+this.getX()-oldX,child.getY()+this.getY()-oldY);
      }
    }
  }
  var ann = new Annotation(aText);
  ann.setBackgroundColor(null);
  ann.setDimension(this.width,20);
  ann.type = "-label-";
  if(aAnnX) {
    ann.DX = aAnnX;
    ann.DY = aAnnY;
  } else {
    ann.DX = 0;
    ann.DY = 0;
  }
  ann.TheTarget = this;
  ann.forWhat = aForWhat;
  ann.forWhat.annotation = ann;
  ann.onDrag=function(){
    Annotation.prototype.onDrag.call(this);
    this.DX = this.getX() - this.TheTarget.getX();
    this.DY = this.getY() - this.TheTarget.getY();
  };
  ann.onKeyDown=function(_3831,ctrl){
    if(_3831==46&&this.isDeleteable()==true){
      var i=0;
      if (this.forWhat.annotation == ann) {
        this.forWhat.annotation = null;
      }
      while(i<this.TheTarget.annotations.length) {
        var ann2 = this.TheTarget.annotations[i];
	if (ann2 == this) {
	  this.TheTarget.annotations.splice(i,1);
	} else {
	  i++;
	}
      }
      this.workflow.commandStack.execute(new CommandDelete(this));
    }
    if(ctrl){
      this.workflow.onKeyDown(_3831,ctrl);
    }
  };
  ann.doEdit=function(){
        var obj = this.html;
        var aThat = this;
	Element.hide(obj);
        workflow.setCurrentSelection(null);

	
	//var textarea = '<div id="'+obj.id+'_editor" style="position: absolute; left:'+this.getX()+'; top:' + this.getY() +'"><textarea id="'+obj.id+'_edit" name="'+obj.id+'" rows="4" cols="60">'+obj.innerHTML+'</textarea>';
	var textarea = '<div id="'+obj.id+'_editor" style="position: absolute; z-index:99999; left:'+this.getX()+'; top:' + this.getY() +'"><input type="text" id="'+obj.id+'_edit" name="'+obj.id+'" value="'+obj.innerHTML+'"></input>';
	var button	 = '<div><input id="'+obj.id+'_save" type="button" value="SAVE" /> OR <input id="'+obj.id+'_cancel" type="button" value="CANCEL" /></div></div>';
	
	new Insertion.After(obj, textarea+button);
	$(obj.id+'_edit').focus();
	$(obj.id+'_edit').select();
		
	Event.observe(obj.id+'_save', 'click', function(){aThat.setText($F(obj.id+'_edit'));Element.remove(obj.id+'_editor'); Element.show(obj);}, false);
	Event.observe(obj.id+'_cancel', 'click', function(){Element.remove(obj.id+'_editor'); Element.show(obj);}, false);
        Event.observe(obj.id+'_edit', 'keydown', function(event) { var key = event.which || event.keyCode;if(key==13) { aThat.setText($F(obj.id+'_edit'));Element.remove(obj.id+'_editor'); Element.show(obj);}}, false);
  }
  ann.onDoubleClick=function(){
    this.doEdit();
  }

  this.annotations.push(ann);
  workflow.addFigure(ann,this.getX() + ann.DX,this.getY() + ann.DY);
  return ann;
}

DiagramFigure=function(){
  this.type = "DiagramFigure";
  ImageFigure.call(this);
  this.inputPort=null;
};

DiagramFigure.prototype=new ImageFigure;
DiagramFigure.prototype.type="DiagramFigure";
DiagramFigure.prototype.setPic = function(aPic) {
  this.pic = aPic;
  this.setImage(aPic);
}
/*
DiagramFigure.prototype.setPosition=function(aX, aY){
  ImageFigure.prototype.setPosition.call(this, aX, aY);
  this.annotation.setPosition(aX+this.annotation.DX, aY+this.annotation.DY, true);
};
*/
/*
DiagramFigure.prototype.onDrag=function(){
var oldX=this.getX();
var oldY=this.getY();
var child = this.annotation;
ImageFigure.prototype.onDrag.call(this);
child.setPosition(child.getX()+this.getX()-oldX,child.getY()+this.getY()-oldY);
}
*/

DiagramFigure.prototype.toJSON=function() {
  var js = new Object;
  var ports = this.getPorts();
  var js_ports = new Array;
  var js_annotations = new Array;
  debug("Figure start"); 
  if (typeof(this.annotations) != "undefined") {
    debug("annotations len: " + this.annotations.length);
    for (var j=0; j<this.annotations.length; j++) {
      var js_ann = new Object;
      var ann = this.annotations[j];
      js_ann['text'] = ann.getText();
      js_ann['x'] = ann.getX();
      js_ann['y'] = ann.getY();
      js_ann['for'] = ann.forWhat.getId();
      js_annotations.push(js_ann);
    }
  }

  for (var j=0; j<ports.length; j++) {
    js_ports.push(ports[j].toJSON());
  }

  js['id'] = this.getId();
  js['type'] = this.type;
  js['subtype'] = this.subtype;
  js['pic'] = this.pic;
  js['x'] = this.getX();
  js['y'] = this.getY();
  js['width'] = this.getWidth();
  js['height'] = this.getHeight();
  js['ports'] = js_ports;
  js['annotations'] = js_annotations;
  debug("Figure end"); 
  return js;
}

DiagramFigure.prototype.onSelectionChanged=function(newSel){
  try { 
    if(newSel.type == "-label-") {
      if(newSel.forWhat) {
        newSel.forWhat.bgFlash();
      }
    }
  } catch (err) {
    // if properties do not exist, do nothing
  }
}

DiagramFigure.prototype.onDoubleClick=function(){
  if(!this.annotation) {
    this.addAnnotation(this, "Description for the figure", 1, this.height + 5);
    this.annotation.doEdit();
    this.bgFlash();
  } else {
    this.annotation.bgFlash();
  }
}

DiagramFigure.prototype.setWorkflow=function(_3a5c){
ImageFigure.prototype.setWorkflow.call(this,_3a5c);
if(_3a5c!=null&&this.inputPort==null){
this.inputPort=new MyInputPort();
this.inputPort.setWorkflow(_3a5c);
this.addPort(this.inputPort,0,this.height/2);
this.inputPort2=new MyInputPort();
this.inputPort2.setWorkflow(_3a5c);
this.addPort(this.inputPort2,this.width/2,0);
this.inputPort3=new MyInputPort();
this.inputPort3.setWorkflow(_3a5c);
this.addPort(this.inputPort3,this.width,this.height/2);
this.inputPort4=new MyInputPort();
this.inputPort4.setWorkflow(_3a5c);
this.addPort(this.inputPort4,this.width/2,this.height);
this.workflow.addSelectionListener(this);
//workflow.addFigure(this.annotation,this.getX(),this.getY());
};
};

DiagramFigure.prototype.getContextMenu=function(){
var menu=new Menu();
/*
var oThis=this;
menu.appendMenuItem(new MenuItem("NULL Router",null,function(){
oThis.setRouter(null);
}));
menu.appendMenuItem(new MenuItem("Manhatten Router",null,function(){
oThis.setRouter(new ManhattanConnectionRouter());
}));
menu.appendMenuItem(new MenuItem("Bezier Router",null,function(){
oThis.setRouter(new BezierConnectionRouter());
}));
menu.appendMenuItem(new MenuItem("Fan Router",null,function(){
oThis.setRouter(new FanConnectionRouter());
}));
*/
return menu;
};

