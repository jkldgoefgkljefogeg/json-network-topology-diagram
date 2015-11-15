
/**This notice must be untouched at all times.
This is the COMPRESSED version of Open-jACOB Draw2D
WebSite: http://www.openjacob.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/
Event=function(){
this.type=null;
this.target=null;
this.relatedTarget=null;
this.cancelable=false;
this.timeStamp=null;
this.returnValue=true;
};
Event.prototype.initEvent=function(sType,_344f){
this.type=sType;
this.cancelable=_344f;
this.timeStamp=(new Date()).getTime();
};
Event.prototype.preventDefault=function(){
if(this.cancelable){
this.returnValue=false;
}
};
Event.fireDOMEvent=function(_3450,_3451){
if(document.createEvent){
var evt=document.createEvent("Events");
evt.initEvent(_3450,true,true);
_3451.dispatchEvent(evt);
}else{
if(document.createEventObject){
var evt=document.createEventObject();
_3451.fireEvent("on"+_3450,evt);
}
}
};
EventTarget=function(){
this.eventhandlers=new Object();
};
EventTarget.prototype.addEventListener=function(sType,_3454){
if(typeof this.eventhandlers[sType]=="undefined"){
this.eventhandlers[sType]=new Array;
}
this.eventhandlers[sType][this.eventhandlers[sType].length]=_3454;
};
EventTarget.prototype.dispatchEvent=function(_3455){
_3455.target=this;
if(typeof this.eventhandlers[_3455.type]!="undefined"){
for(var i=0;i<this.eventhandlers[_3455.type].length;i++){
this.eventhandlers[_3455.type][i](_3455);
}
}
return _3455.returnValue;
};
EventTarget.prototype.removeEventListener=function(sType,_3458){
if(typeof this.eventhandlers[sType]!="undefined"){
var _3459=new Array;
for(var i=0;i<this.eventhandlers[sType].length;i++){
if(this.eventhandlers[sType][i]!=_3458){
_3459[_3459.length]=this.eventhandlers[sType][i];
}
}
this.eventhandlers[sType]=_3459;
}
};
ArrayList=function(){
this.increment=10;
this.size=0;
this.data=new Array(this.increment);
};
ArrayList.EMPTY_LIST=new ArrayList();
ArrayList.prototype.reverse=function(){
var _37ec=new Array(this.size);
for(var i=0;i<this.size;i++){
_37ec[i]=this.data[this.size-i-1];
}
this.data=_37ec;
};
ArrayList.prototype.getCapacity=function(){
return this.data.length;
};
ArrayList.prototype.getSize=function(){
return this.size;
};
ArrayList.prototype.isEmpty=function(){
return this.getSize()==0;
};
ArrayList.prototype.getLastElement=function(){
if(this.data[this.getSize()-1]!=null){
return this.data[this.getSize()-1];
}
};
ArrayList.prototype.getFirstElement=function(){
if(this.data[0]!=null){
return this.data[0];
}
};
ArrayList.prototype.get=function(i){
return this.data[i];
};
ArrayList.prototype.add=function(obj){
if(this.getSize()==this.data.length){
this.resize();
}
this.data[this.size++]=obj;
};
ArrayList.prototype.remove=function(obj){
var index=this.indexOf(obj);
if(index>=0){
return this.removeElementAt(index);
}
return null;
};
ArrayList.prototype.insertElementAt=function(obj,index){
if(this.size==this.capacity){
this.resize();
}
for(var i=this.getSize();i>index;i--){
this.data[i]=this.data[i-1];
}
this.data[index]=obj;
this.size++;
};
ArrayList.prototype.removeElementAt=function(index){
var _37f6=this.data[index];
for(var i=index;i<(this.getSize()-1);i++){
this.data[i]=this.data[i+1];
}
this.data[this.getSize()-1]=null;
this.size--;
return _37f6;
};
ArrayList.prototype.removeAllElements=function(){
this.size=0;
for(var i=0;i<this.data.length;i++){
this.data[i]=null;
}
};
ArrayList.prototype.indexOf=function(obj){
for(var i=0;i<this.getSize();i++){
if(this.data[i]==obj){
return i;
}
}
return -1;
};
ArrayList.prototype.contains=function(obj){
for(var i=0;i<this.getSize();i++){
if(this.data[i]==obj){
return true;
}
}
return false;
};
ArrayList.prototype.resize=function(){
newData=new Array(this.data.length+this.increment);
for(var i=0;i<this.data.length;i++){
newData[i]=this.data[i];
}
this.data=newData;
};
ArrayList.prototype.trimToSize=function(){
var temp=new Array(this.getSize());
for(var i=0;i<this.getSize();i++){
temp[i]=this.data[i];
}
this.size=temp.length-1;
this.data=temp;
};
ArrayList.prototype.sort=function(f){
var i,j;
var _3802;
var _3803;
var _3804;
var _3805;
for(i=1;i<this.getSize();i++){
_3803=this.data[i];
_3802=_3803[f];
j=i-1;
_3804=this.data[j];
_3805=_3804[f];
while(j>=0&&_3805>_3802){
this.data[j+1]=this.data[j];
j--;
if(j>=0){
_3804=this.data[j];
_3805=_3804[f];
}
}
this.data[j+1]=_3803;
}
};
ArrayList.prototype.clone=function(){
var _3806=new ArrayList(this.size);
for(var i=0;i<this.size;i++){
_3806.add(this.data[i]);
}
return _3806;
};
ArrayList.prototype.overwriteElementAt=function(obj,index){
this.data[index]=obj;
};
function trace(_37e3){
var _37e4=openwindow("about:blank",700,400);
_37e4.document.writeln("<pre>"+_37e3+"</pre>");
}
function openwindow(url,width,_37e7){
var left=(screen.width-width)/2;
var top=(screen.height-_37e7)/2;
property="left="+left+", top="+top+", toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,alwaysRaised,width="+width+",height="+_37e7;
return window.open(url,"_blank",property);
}
function dumpObject(obj){
trace("----------------------------------------------------------------------------");
trace("- Object dump");
trace("----------------------------------------------------------------------------");
for(var i in obj){
try{
if(typeof obj[i]!="function"){
trace(i+" --&gt; "+obj[i]);
}
}
catch(e){
}
}
for(var i in obj){
try{
if(typeof obj[i]=="function"){
trace(i+" --&gt; "+obj[i]);
}
}
catch(e){
}
}
trace("----------------------------------------------------------------------------");
}
Drag=function(){
};
Drag.current=null;
Drag.currentTarget=null;
Drag.dragging=false;
Drag.isDragging=function(){
return this.dragging;
};
Drag.setCurrent=function(_2cd0){
this.current=_2cd0;
this.dragging=true;
};
Drag.getCurrent=function(){
return this.current;
};
Drag.clearCurrent=function(){
this.current=null;
this.dragging=false;
};
Draggable=function(_2cd1,_2cd2){
EventTarget.call(this);
this.construct(_2cd1,_2cd2);
this.diffX=0;
this.diffY=0;
this.targets=new ArrayList();
};
Draggable.prototype=new EventTarget;
Draggable.prototype.addDropTarget=function(_2cd3){
this.targets.add(_2cd3);
};
Draggable.prototype.construct=function(_2cd4,_2cd5){
this.element=_2cd4;
this.constraints=_2cd5;
var oThis=this;
var _2cd7=function(){
var _2cd8=new DragDropEvent();
_2cd8.initDragDropEvent("dblclick",true);
oThis.dispatchEvent(_2cd8);
var _2cd9=arguments[0]||window.event;
_2cd9.cancelBubble=true;
_2cd9.returnValue=false;
};
var _2cda=function(){
var _2cdb=arguments[0]||window.event;
var _2cdc=new DragDropEvent();
var _2cdd=oThis.node.workflow.getAbsoluteX();
var _2cde=oThis.node.workflow.getAbsoluteY();
var _2cdf=oThis.node.workflow.getScrollLeft();
var _2ce0=oThis.node.workflow.getScrollTop();
_2cdc.x=_2cdb.clientX-oThis.element.offsetLeft+_2cdf-_2cdd;
_2cdc.y=_2cdb.clientY-oThis.element.offsetTop+_2ce0-_2cde;
if(_2cdb.button==2){
_2cdc.initDragDropEvent("contextmenu",true);
oThis.dispatchEvent(_2cdc);
}else{
_2cdc.initDragDropEvent("dragstart",true);
if(oThis.dispatchEvent(_2cdc)){
oThis.diffX=_2cdb.clientX-oThis.element.offsetLeft;
oThis.diffY=_2cdb.clientY-oThis.element.offsetTop;
Drag.setCurrent(oThis);
if(oThis.isAttached==true){
oThis.detachEventHandlers();
}
oThis.attachEventHandlers();
}
}
_2cdb.cancelBubble=true;
_2cdb.returnValue=false;
};
var _2ce1=function(){
if(Drag.getCurrent()==null){
var _2ce2=arguments[0]||window.event;
if(Drag.currentHover!=null&&oThis!=Drag.currentHover){
var _2ce3=new DragDropEvent();
_2ce3.initDragDropEvent("mouseleave",false,oThis);
Drag.currentHover.dispatchEvent(_2ce3);
}
if(oThis!=null&&oThis!=Drag.currentHover){
var _2ce3=new DragDropEvent();
_2ce3.initDragDropEvent("mouseenter",false,oThis);
oThis.dispatchEvent(_2ce3);
}
Drag.currentHover=oThis;
}else{
}
};
if(this.element.addEventListener){
this.element.addEventListener("mousemove",_2ce1,false);
this.element.addEventListener("mousedown",_2cda,false);
this.element.addEventListener("dblclick",_2cd7,false);
}else{
if(this.element.attachEvent){
this.element.attachEvent("onmousemove",_2ce1);
this.element.attachEvent("onmousedown",_2cda);
this.element.attachEvent("ondblclick",_2cd7);
}else{
throw new Error("Drag not supported in this browser.");
}
}
};
Draggable.prototype.attachEventHandlers=function(){
var oThis=this;
oThis.isAttached=true;
this.tempMouseMove=function(){
var _2ce5=arguments[0]||window.event;
var _2ce6=new Point(_2ce5.clientX-oThis.diffX,_2ce5.clientY-oThis.diffY);
if(oThis.node.getCanSnapToHelper()){
_2ce6=oThis.node.getWorkflow().snapToHelper(oThis.node,_2ce6);
}
oThis.element.style.left=_2ce6.x+"px";
oThis.element.style.top=_2ce6.y+"px";
var _2ce7=oThis.node.workflow.getScrollLeft();
var _2ce8=oThis.node.workflow.getScrollTop();
var _2ce9=oThis.node.workflow.getAbsoluteX();
var _2cea=oThis.node.workflow.getAbsoluteY();
var _2ceb=oThis.getDropTarget(_2ce5.clientX+_2ce7-_2ce9,_2ce5.clientY+_2ce8-_2cea);
var _2cec=oThis.getCompartment(_2ce5.clientX+_2ce7-_2ce9,_2ce5.clientY+_2ce8-_2cea);
if(Drag.currentTarget!=null&&_2ceb!=Drag.currentTarget){
var _2ced=new DragDropEvent();
_2ced.initDragDropEvent("dragleave",false,oThis);
Drag.currentTarget.dispatchEvent(_2ced);
}
if(_2ceb!=null&&_2ceb!=Drag.currentTarget){
var _2ced=new DragDropEvent();
_2ced.initDragDropEvent("dragenter",false,oThis);
_2ceb.dispatchEvent(_2ced);
}
Drag.currentTarget=_2ceb;
if(Drag.currentCompartment!=null&&_2cec!=Drag.currentCompartment){
var _2ced=new DragDropEvent();
_2ced.initDragDropEvent("figureleave",false,oThis);
Drag.currentCompartment.dispatchEvent(_2ced);
}
if(_2cec!=null&&_2cec.node!=oThis.node&&_2cec!=Drag.currentCompartment){
var _2ced=new DragDropEvent();
_2ced.initDragDropEvent("figureenter",false,oThis);
_2cec.dispatchEvent(_2ced);
}
Drag.currentCompartment=_2cec;
var _2cee=new DragDropEvent();
_2cee.initDragDropEvent("drag",false);
oThis.dispatchEvent(_2cee);
};
oThis.tempMouseUp=function(){
oThis.detachEventHandlers();
var _2cef=arguments[0]||window.event;
var _2cf0=new DragDropEvent();
_2cf0.initDragDropEvent("dragend",false);
oThis.dispatchEvent(_2cf0);
var _2cf1=oThis.node.workflow.getScrollLeft();
var _2cf2=oThis.node.workflow.getScrollTop();
var _2cf3=oThis.node.workflow.getAbsoluteX();
var _2cf4=oThis.node.workflow.getAbsoluteY();
var _2cf5=oThis.getDropTarget(_2cef.clientX+_2cf1-_2cf3,_2cef.clientY+_2cf2-_2cf4);
var _2cf6=oThis.getCompartment(_2cef.clientX+_2cf1-_2cf3,_2cef.clientY+_2cf2-_2cf4);
if(_2cf5!=null){
var _2cf7=new DragDropEvent();
_2cf7.initDragDropEvent("drop",false,oThis);
_2cf5.dispatchEvent(_2cf7);
}
if(_2cf6!=null&&_2cf6.node!=oThis.node){
var _2cf7=new DragDropEvent();
_2cf7.initDragDropEvent("figuredrop",false,oThis);
_2cf6.dispatchEvent(_2cf7);
}
if(Drag.currentTarget!=null){
var _2cf7=new DragDropEvent();
_2cf7.initDragDropEvent("dragleave",false,oThis);
Drag.currentTarget.dispatchEvent(_2cf7);
Drag.currentTarget=null;
}
Drag.currentCompartment=null;
Drag.clearCurrent();
};
if(document.body.addEventListener){
document.body.addEventListener("mousemove",this.tempMouseMove,false);
document.body.addEventListener("mouseup",this.tempMouseUp,false);
}else{
if(document.body.attachEvent){
document.body.attachEvent("onmousemove",this.tempMouseMove);
document.body.attachEvent("onmouseup",this.tempMouseUp);
}else{
throw new Error("Drag doesn't support this browser.");
}
}
};
Draggable.prototype.detachEventHandlers=function(){
this.isAttached=false;
if(document.body.removeEventListener){
document.body.removeEventListener("mousemove",this.tempMouseMove,false);
document.body.removeEventListener("mouseup",this.tempMouseUp,false);
}else{
if(document.body.detachEvent){
document.body.detachEvent("onmousemove",this.tempMouseMove);
document.body.detachEvent("onmouseup",this.tempMouseUp);
}else{
throw new Error("Drag doesn't support this browser.");
}
}
};
Draggable.prototype.getDropTarget=function(x,y){
for(var i=0;i<this.targets.getSize();i++){
var _2cfb=this.targets.get(i);
if(_2cfb.node.isOver(x,y)&&_2cfb.node!=this.node){
return _2cfb;
}
}
return null;
};
Draggable.prototype.getCompartment=function(x,y){
var _2cfe=null;
for(var i=0;i<this.node.workflow.compartments.getSize();i++){
var _2d00=this.node.workflow.compartments.get(i);
if(_2d00.isOver(x,y)&&_2d00!=this.node){
if(_2cfe==null){
_2cfe=_2d00;
}else{
if(_2cfe.getZOrder()<_2d00.getZOrder()){
_2cfe=_2d00;
}
}
}
}
return _2cfe==null?null:_2cfe.dropable;
};
Draggable.prototype.getLeft=function(){
return this.element.offsetLeft;
};
Draggable.prototype.getTop=function(){
return this.element.offsetTop;
};
DragDropEvent=function(){
Event.call(this);
};
DragDropEvent.prototype=new Event();
DragDropEvent.prototype.initDragDropEvent=function(sType,_2d02,_2d03){
this.initEvent(sType,_2d02);
this.relatedTarget=_2d03;
};
DropTarget=function(_2d04){
EventTarget.call(this);
this.construct(_2d04);
};
DropTarget.prototype=new EventTarget;
DropTarget.prototype.construct=function(_2d05){
this.element=_2d05;
};
DropTarget.prototype.getLeft=function(){
var el=this.element;
var ol=el.offsetLeft;
while((el=el.offsetParent)!=null){
ol+=el.offsetLeft;
}
return ol;
};
DropTarget.prototype.getTop=function(){
var el=this.element;
var ot=el.offsetTop;
while((el=el.offsetParent)!=null){
ot+=el.offsetTop;
}
return ot;
};
DropTarget.prototype.getHeight=function(){
return this.element.offsetHeight;
};
DropTarget.prototype.getWidth=function(){
return this.element.offsetWidth;
};
PositionConstants=function(){
};
PositionConstants.NORTH=1;
PositionConstants.SOUTH=4;
PositionConstants.WEST=8;
PositionConstants.EAST=16;
Color=function(red,green,blue){
if(typeof green=="undefined"){
var rgb=this.hex2rgb(red);
this.red=rgb[0];
this.green=rgb[1];
this.blue=rgb[2];
}else{
this.red=red;
this.green=green;
this.blue=blue;
}
};
Color.prototype.type="Color";
Color.prototype.getHTMLStyle=function(){
return "rgb("+this.red+","+this.green+","+this.blue+")";
};
Color.prototype.getRed=function(){
return this.red;
};
Color.prototype.getGreen=function(){
return this.green;
};
Color.prototype.getBlue=function(){
return this.blue;
};
Color.prototype.getIdealTextColor=function(){
var _3901=105;
var _3902=(this.red*0.299)+(this.green*0.587)+(this.blue*0.114);
return (255-_3902<_3901)?new Color(0,0,0):new Color(255,255,255);
};
Color.prototype.hex2rgb=function(_3903){
_3903=_3903.replace("#","");
return ({0:parseInt(_3903.substr(0,2),16),1:parseInt(_3903.substr(2,2),16),2:parseInt(_3903.substr(4,2),16)});
};
Color.prototype.hex=function(){
return (this.int2hex(this.red)+this.int2hex(this.green)+this.int2hex(this.blue));
};
Color.prototype.int2hex=function(v){
v=Math.round(Math.min(Math.max(0,v),255));
return ("0123456789ABCDEF".charAt((v-v%16)/16)+"0123456789ABCDEF".charAt(v%16));
};
Point=function(x,y){
this.x=x;
this.y=y;
};
Point.prototype.type="Point";
Point.prototype.getX=function(){
return this.x;
};
Point.prototype.getY=function(){
return this.y;
};
Point.prototype.getPosition=function(p){
var dx=p.x-this.x;
var dy=p.y-this.y;
if(Math.abs(dx)>Math.abs(dy)){
if(dx<0){
return PositionConstants.WEST;
}
return PositionConstants.EAST;
}
if(dy<0){
return PositionConstants.NORTH;
}
return PositionConstants.SOUTH;
};
Point.prototype.equals=function(o){
return this.x==o.x&&this.y==o.y;
};
Point.prototype.getDistance=function(other){
return Math.sqrt((this.x-other.x)*(this.x-other.x)+(this.y-other.y)*(this.y-other.y));
};
Point.prototype.getTranslated=function(other){
return new Point(this.x+other.x,this.y+other.y);
};
Dimension=function(x,y,w,h){
Point.call(this,x,y);
this.w=w;
this.h=h;
};
Dimension.prototype=new Point;
Dimension.prototype.type="Dimension";
Dimension.prototype.getWidth=function(){
return this.w;
};
Dimension.prototype.getHeight=function(){
return this.h;
};
Dimension.prototype.getRight=function(){
return this.x+this.w;
};
Dimension.prototype.getBottom=function(){
return this.y+this.h;
};
Dimension.prototype.getTopLeft=function(){
return new Point(this.x,this.y);
};
Dimension.prototype.getCenter=function(){
return new Point(this.x+this.w/2,this.y+this.h/2);
};
Dimension.prototype.getBottomRight=function(){
return new Point(this.x+this.w,this.y+this.h);
};
Dimension.prototype.equals=function(o){
return this.x==o.x&&this.y==o.y&&this.w==o.w&&this.h==o.h;
};
SnapToHelper=function(_3909){
this.workflow=_3909;
};
SnapToHelper.NORTH=1;
SnapToHelper.SOUTH=4;
SnapToHelper.WEST=8;
SnapToHelper.EAST=16;
SnapToHelper.NORTH_EAST=SnapToHelper.NORTH|SnapToHelper.EAST;
SnapToHelper.NORTH_WEST=SnapToHelper.NORTH|SnapToHelper.WEST;
SnapToHelper.SOUTH_EAST=SnapToHelper.SOUTH|SnapToHelper.EAST;
SnapToHelper.SOUTH_WEST=SnapToHelper.SOUTH|SnapToHelper.WEST;
SnapToHelper.NORTH_SOUTH=SnapToHelper.NORTH|SnapToHelper.SOUTH;
SnapToHelper.EAST_WEST=SnapToHelper.EAST|SnapToHelper.WEST;
SnapToHelper.NSEW=SnapToHelper.NORTH_SOUTH|SnapToHelper.EAST_WEST;
SnapToHelper.prototype.snapPoint=function(_390a,_390b,_390c){
return _390b;
};
SnapToHelper.prototype.snapRectangle=function(_390d,_390e){
return _390d;
};
SnapToHelper.prototype.onSetDocumentDirty=function(){
};
SnapToGrid=function(_3424){
SnapToHelper.call(this,_3424);
};
SnapToGrid.prototype=new SnapToHelper;
SnapToGrid.prototype.snapPoint=function(_3425,_3426,_3427){
_3427.x=this.workflow.gridWidthX*Math.floor(((_3426.x+this.workflow.gridWidthX/2)/this.workflow.gridWidthX));
_3427.y=this.workflow.gridWidthY*Math.floor(((_3426.y+this.workflow.gridWidthY/2)/this.workflow.gridWidthY));
return 0;
};
SnapToGrid.prototype.snapRectangle=function(_3428,_3429){
_3429.x=_3428.x;
_3429.y=_3428.y;
_3429.w=_3428.w;
_3429.h=_3428.h;
return 0;
};
SnapToGeometryEntry=function(type,_3418){
this.type=type;
this.location=_3418;
};
SnapToGeometryEntry.prototype.getLocation=function(){
return this.location;
};
SnapToGeometryEntry.prototype.getType=function(){
return this.type;
};
SnapToGeometry=function(_3aa7){
SnapToHelper.call(this,_3aa7);
};
SnapToGeometry.prototype=new SnapToHelper;
SnapToGeometry.THRESHOLD=5;
SnapToGeometry.prototype.snapPoint=function(_3aa8,_3aa9,_3aaa){
if(this.rows==null||this.cols==null){
this.populateRowsAndCols();
}
if((_3aa8&SnapToHelper.EAST)!=0){
var _3aab=this.getCorrectionFor(this.cols,_3aa9.getX()-1,1);
if(_3aab!=SnapToGeometry.THRESHOLD){
_3aa8&=~SnapToHelper.EAST;
_3aaa.x+=_3aab;
}
}
if((_3aa8&SnapToHelper.WEST)!=0){
var _3aac=this.getCorrectionFor(this.cols,_3aa9.getX(),-1);
if(_3aac!=SnapToGeometry.THRESHOLD){
_3aa8&=~SnapToHelper.WEST;
_3aaa.x+=_3aac;
}
}
if((_3aa8&SnapToHelper.SOUTH)!=0){
var _3aad=this.getCorrectionFor(this.rows,_3aa9.getY()-1,1);
if(_3aad!=SnapToGeometry.THRESHOLD){
_3aa8&=~SnapToHelper.SOUTH;
_3aaa.y+=_3aad;
}
}
if((_3aa8&SnapToHelper.NORTH)!=0){
var _3aae=this.getCorrectionFor(this.rows,_3aa9.getY(),-1);
if(_3aae!=SnapToGeometry.THRESHOLD){
_3aa8&=~SnapToHelper.NORTH;
_3aaa.y+=_3aae;
}
}
return _3aa8;
};
SnapToGeometry.prototype.snapRectangle=function(_3aaf,_3ab0){
var _3ab1=_3aaf.getTopLeft();
var _3ab2=_3aaf.getBottomRight();
var _3ab3=this.snapPoint(SnapToHelper.NORTH_WEST,_3aaf.getTopLeft(),_3ab1);
_3ab0.x=_3ab1.x;
_3ab0.y=_3ab1.y;
var _3ab4=this.snapPoint(SnapToHelper.SOUTH_EAST,_3aaf.getBottomRight(),_3ab2);
if(_3ab3&SnapToHelper.WEST){
_3ab0.x=_3ab2.x-_3aaf.getWidth();
}
if(_3ab3&SnapToHelper.NORTH){
_3ab0.y=_3ab2.y-_3aaf.getHeight();
}
return _3ab3|_3ab4;
};
SnapToGeometry.prototype.populateRowsAndCols=function(){
this.rows=new Array();
this.cols=new Array();
var _3ab5=this.workflow.getDocument().getFigures();
var index=0;
for(var i=0;i<_3ab5.length;i++){
var _3ab8=_3ab5[i];
if(_3ab8!=this.workflow.getCurrentSelection()){
var _3ab9=_3ab8.getBounds();
this.cols[index*3]=new SnapToGeometryEntry(-1,_3ab9.getX());
this.rows[index*3]=new SnapToGeometryEntry(-1,_3ab9.getY());
this.cols[index*3+1]=new SnapToGeometryEntry(0,_3ab9.x+(_3ab9.getWidth()-1)/2);
this.rows[index*3+1]=new SnapToGeometryEntry(0,_3ab9.y+(_3ab9.getHeight()-1)/2);
this.cols[index*3+2]=new SnapToGeometryEntry(1,_3ab9.getRight()-1);
this.rows[index*3+2]=new SnapToGeometryEntry(1,_3ab9.getBottom()-1);
index++;
}
}
};
SnapToGeometry.prototype.getCorrectionFor=function(_3aba,value,side){
var _3abd=SnapToGeometry.THRESHOLD;
var _3abe=SnapToGeometry.THRESHOLD;
for(var i=0;i<_3aba.length;i++){
var entry=_3aba[i];
var _3ac1;
if(entry.type==-1&&side!=0){
_3ac1=Math.abs(value-entry.location);
if(_3ac1<_3abd){
_3abd=_3ac1;
_3abe=entry.location-value;
}
}else{
if(entry.type==0&&side==0){
_3ac1=Math.abs(value-entry.location);
if(_3ac1<_3abd){
_3abd=_3ac1;
_3abe=entry.location-value;
}
}else{
if(entry.type==1&&side!=0){
_3ac1=Math.abs(value-entry.location);
if(_3ac1<_3abd){
_3abd=_3ac1;
_3abe=entry.location-value;
}
}
}
}
}
return _3abe;
};
SnapToGeometry.prototype.onSetDocumentDirty=function(){
this.rows=null;
this.cols=null;
};
Border=function(){
this.color=null;
};
Border.prototype.type="Border";
Border.prototype.dispose=function(){
this.color=null;
};
Border.prototype.getHTMLStyle=function(){
return "";
};
Border.prototype.setColor=function(c){
this.color=c;
};
Border.prototype.getColor=function(){
return this.color;
};
Border.prototype.refresh=function(){
};
LineBorder=function(width){
Border.call(this);
this.width=1;
if(width){
this.width=width;
}
this.figure=null;
};
LineBorder.prototype=new Border;
LineBorder.prototype.type="LineBorder";
LineBorder.prototype.dispose=function(){
Border.prototype.dispose.call(this);
this.figure=null;
};
LineBorder.prototype.setLineWidth=function(w){
this.width=w;
if(this.figure!=null){
this.figure.html.style.border=this.getHTMLStyle();
}
};
LineBorder.prototype.getHTMLStyle=function(){
if(this.getColor()!=null){
return this.width+"px solid "+this.getColor().getHTMLStyle();
}
return this.width+"px solid black";
};
LineBorder.prototype.refresh=function(){
this.setLineWidth(this.width);
};
Figure=function(){
this.construct();
};
Figure.prototype.type="Figure";
Figure.ZOrderBaseIndex=100;
Figure.setZOrderBaseIndex=function(index){
Figure.ZOrderBaseIndex=index;
};
Figure.prototype.construct=function(){
this.lastDragStartTime=0;
this.x=0;
this.y=0;
this.border=null;
this.setDimension(10,10);
this.id=this.generateUId();
this.html=this.createHTMLElement();
this.canvas=null;
this.workflow=null;
this.draggable=null;
this.parent=null;
this.isMoving=false;
this.canSnapToHelper=true;
this.snapToGridAnchor=new Point(0,0);
this.timer=-1;
this.setDeleteable(true);
this.setCanDrag(true);
this.setResizeable(true);
this.setSelectable(true);
this.properties=new Object();
this.moveListener=new Object();
};
Figure.prototype.dispose=function(){
this.canvas=null;
this.workflow=null;
this.moveListener=null;
if(this.draggable!=null){
this.draggable.removeEventListener("mouseenter",this.tmpMouseEnter);
this.draggable.removeEventListener("mouseleave",this.tmpMouseLeave);
this.draggable.removeEventListener("dragend",this.tmpDragend);
this.draggable.removeEventListener("dragstart",this.tmpDragstart);
this.draggable.removeEventListener("drag",this.tmpDrag);
this.draggable.removeEventListener("dblclick",this.tmpDoubleClick);
this.draggable.node=null;
}
this.draggable=null;
if(this.border!=null){
this.border.dispose();
}
this.border=null;
if(this.parent!=null){
this.parent.removeChild(this);
}
};
Figure.prototype.getProperties=function(){
return this.properties;
};
Figure.prototype.getProperty=function(key){
return this.properties[key];
};
Figure.prototype.setProperty=function(key,value){
this.properties[key]=value;
this.setDocumentDirty();
};
Figure.prototype.getId=function(){
return this.id;
};
Figure.prototype.setCanvas=function(_380e){
this.canvas=_380e;
};
Figure.prototype.getWorkflow=function(){
return this.workflow;
};
Figure.prototype.setWorkflow=function(_380f){
if(this.draggable==null){
this.html.tabIndex="0";
var oThis=this;
this.keyDown=function(event){
event.cancelBubble=true;
event.returnValue=false;
oThis.onKeyDown(event.keyCode,event.ctrlKey);
};
if(this.html.addEventListener){
this.html.addEventListener("keydown",this.keyDown,false);
}else{
if(item.attachEvent){
this.html.attachEvent("onkeydown",this.keyDown);
}
}
this.draggable=new Draggable(this.html,Draggable.DRAG_X|Draggable.DRAG_Y);
this.draggable.node=this;
this.tmpContextMenu=function(_3812){
oThis.onContextMenu(oThis.x+_3812.x,_3812.y+oThis.y);
};
this.tmpMouseEnter=function(_3813){
oThis.onMouseEnter();
};
this.tmpMouseLeave=function(_3814){
oThis.onMouseLeave();
};
this.tmpDragend=function(_3815){
oThis.onDragend();
};
this.tmpDragstart=function(_3816){
var w=oThis.workflow;
w.showMenu(null);
if(oThis.workflow.toolPalette&&oThis.workflow.toolPalette.activeTool){
_3816.returnValue=false;
oThis.workflow.onMouseDown(oThis.x+_3816.x,_3816.y+oThis.y);
oThis.workflow.onMouseUp(oThis.x+_3816.x,_3816.y+oThis.y);
return;
}
_3816.returnValue=oThis.onDragstart(_3816.x,_3816.y);
};
this.tmpDrag=function(_3818){
oThis.onDrag();
};
this.tmpDoubleClick=function(_3819){
oThis.onDoubleClick();
};
this.draggable.addEventListener("contextmenu",this.tmpContextMenu);
this.draggable.addEventListener("mouseenter",this.tmpMouseEnter);
this.draggable.addEventListener("mouseleave",this.tmpMouseLeave);
this.draggable.addEventListener("dragend",this.tmpDragend);
this.draggable.addEventListener("dragstart",this.tmpDragstart);
this.draggable.addEventListener("drag",this.tmpDrag);
this.draggable.addEventListener("dblclick",this.tmpDoubleClick);
}
this.workflow=_380f;
};
Figure.prototype.createHTMLElement=function(){
var item=document.createElement("div");
item.id=this.id;
item.style.position="absolute";
item.style.left=this.x+"px";
item.style.top=this.y+"px";
item.style.height=this.width+"px";
item.style.width=this.height+"px";
item.style.margin="0px";
item.style.padding="0px";
item.style.outline="none";
item.style.zIndex=""+Figure.ZOrderBaseIndex;
return item;
};
Figure.prototype.setParent=function(_381b){
this.parent=_381b;
};
Figure.prototype.getParent=function(){
return this.parent;
};
Figure.prototype.getZOrder=function(){
return this.html.style.zIndex;
};
Figure.prototype.setZOrder=function(index){
this.html.style.zIndex=index;
};
Figure.prototype.hasFixedPosition=function(){
return false;
};
Figure.prototype.getMinWidth=function(){
return 5;
};
Figure.prototype.getMinHeight=function(){
return 5;
};
Figure.prototype.getHTMLElement=function(){
if(this.html==null){
this.html=this.createHTMLElement();
}
return this.html;
};
Figure.prototype.paint=function(){
};
Figure.prototype.setBorder=function(_381d){
if(this.border!=null){
this.border.figure=null;
}
this.border=_381d;
this.border.figure=this;
this.border.refresh();
this.setDocumentDirty();
};
Figure.prototype.onContextMenu=function(x,y){
var menu=this.getContextMenu();
if(menu!=null){
this.workflow.showMenu(menu,x,y);
}
};
Figure.prototype.getContextMenu=function(){
return null;
};
Figure.prototype.onDoubleClick=function(){
};
Figure.prototype.onMouseEnter=function(){
};
Figure.prototype.onMouseLeave=function(){
};
Figure.prototype.onDrag=function(){
this.x=this.draggable.getLeft();
this.y=this.draggable.getTop();
if(this.isMoving==false){
this.isMoving=true;
this.setAlpha(0.5);
}
this.fireMoveEvent();
};
Figure.prototype.onDragend=function(){
if(this.getWorkflow().getEnableSmoothFigureHandling()==true){
var _3821=this;
var _3822=function(){
if(_3821.alpha<1){
_3821.setAlpha(Math.min(1,_3821.alpha+0.05));
}else{
window.clearInterval(_3821.timer);
_3821.timer=-1;
}
};
if(_3821.timer>0){
window.clearInterval(_3821.timer);
}
_3821.timer=window.setInterval(_3822,20);
}else{
this.setAlpha(1);
}
this.command.setPosition(this.x,this.y);
this.workflow.commandStack.execute(this.command);
this.command=null;
this.isMoving=false;
this.workflow.hideSnapToHelperLines();
this.fireMoveEvent();
};
Figure.prototype.onDragstart=function(x,y){
if(!this.canDrag){
return false;
}
this.command=new CommandMove(this,this.x,this.y);
return true;
};
Figure.prototype.setCanDrag=function(flag){
this.canDrag=flag;
if(flag){
this.html.style.cursor="move";
}else{
this.html.style.cursor=null;
}
};
Figure.prototype.setAlpha=function(_3826){
if(this.alpha==_3826){
return;
}
try{
this.html.style.MozOpacity=_3826;
}
catch(exc){
}
try{
this.html.style.opacity=_3826;
}
catch(exc){
}
try{
var _3827=Math.round(_3826*100);
if(_3827>=99){
this.html.style.filter="";
}else{
this.html.style.filter="alpha(opacity="+_3827+")";
}
}
catch(exc){
}
this.alpha=_3826;
};
Figure.prototype.setDimension=function(w,h){
this.width=Math.max(this.getMinWidth(),w);
this.height=Math.max(this.getMinHeight(),h);
if(this.html==null){
return;
}
this.html.style.width=this.width+"px";
this.html.style.height=this.height+"px";
this.fireMoveEvent();
if(this.workflow!=null&&this.workflow.getCurrentSelection()==this){
this.workflow.showResizeHandles(this);
}
};
Figure.prototype.setPosition=function(xPos,yPos){
this.x=xPos;
this.y=yPos;
if(this.html==null){
return;
}
this.html.style.left=this.x+"px";
this.html.style.top=this.y+"px";
this.fireMoveEvent();
if(this.workflow!=null&&this.workflow.getCurrentSelection()==this){
this.workflow.showResizeHandles(this);
}
};
Figure.prototype.isResizeable=function(){
return this.resizeable;
};
Figure.prototype.setResizeable=function(flag){
this.resizeable=flag;
};
Figure.prototype.isSelectable=function(){
return this.selectable;
};
Figure.prototype.setSelectable=function(flag){
this.selectable=flag;
};
Figure.prototype.isStrechable=function(){
return true;
};
Figure.prototype.isDeleteable=function(){
return this.deleteable;
};
Figure.prototype.setDeleteable=function(flag){
this.deleteable=flag;
};
Figure.prototype.setCanSnapToHelper=function(flag){
this.canSnapToHelper=flag;
};
Figure.prototype.getCanSnapToHelper=function(){
return this.canSnapToHelper;
};
Figure.prototype.getSnapToGridAnchor=function(){
return this.snapToGridAnchor;
};
Figure.prototype.setSnapToGridAnchor=function(point){
this.snapToGridAnchor=point;
};
Figure.prototype.getBounds=function(){
return new Dimension(this.getX(),this.getY(),this.getWidth(),this.getHeight());
};
Figure.prototype.getWidth=function(){
return this.width;
};
Figure.prototype.getHeight=function(){
return this.height;
};
Figure.prototype.getY=function(){
return this.y;
};
Figure.prototype.getX=function(){
return this.x;
};
Figure.prototype.getAbsoluteY=function(){
return this.y;
};
Figure.prototype.getAbsoluteX=function(){
return this.x;
};
Figure.prototype.onKeyDown=function(_3831,ctrl){
if(_3831==46&&this.isDeleteable()==true){
this.workflow.commandStack.execute(new CommandDelete(this));
}
if(ctrl){
this.workflow.onKeyDown(_3831,ctrl);
}
};
Figure.prototype.getPosition=function(){
return new Point(this.x,this.y);
};
Figure.prototype.isOver=function(iX,iY){
var x=this.getAbsoluteX();
var y=this.getAbsoluteY();
var iX2=x+this.width;
var iY2=y+this.height;
return (iX>=x&&iX<=iX2&&iY>=y&&iY<=iY2);
};
Figure.prototype.attachMoveListener=function(_3839){
if(_3839==null||this.moveListener==null){
return;
}
this.moveListener[_3839.id]=_3839;
};
Figure.prototype.detachMoveListener=function(_383a){
if(_383a==null||this.moveListener==null){
return;
}
this.moveListener[_383a.id]=null;
};
Figure.prototype.fireMoveEvent=function(){
this.setDocumentDirty();
for(key in this.moveListener){
var _383b=this.moveListener[key];
if(_383b!=null){
_383b.onOtherFigureMoved(this);
}
}
};
Figure.prototype.onOtherFigureMoved=function(_383c){
};
Figure.prototype.setDocumentDirty=function(){
if(this.workflow!=null){
this.workflow.setDocumentDirty();
}
};
Figure.prototype.generateUId=function(){
var chars="0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
var _383e=10;
var _383f=10;
nbTry=0;
while(nbTry<1000){
var id="";
for(var i=0;i<_383e;i++){
var rnum=Math.floor(Math.random()*chars.length);
id+=chars.substring(rnum,rnum+1);
}
elem=document.getElementById(id);
if(!elem){
return id;
}
nbTry+=1;
}
return null;
};
Figure.prototype.disableTextSelection=function(e){
if(typeof e.onselectstart!="undefined"){
e.onselectstart=function(){
return false;
};
}else{
if(typeof e.style.MozUserSelect!="undefined"){
e.style.MozUserSelect="none";
}
}
};
Node=function(){
this.bgColor=null;
this.lineColor=new Color(128,128,255);
this.lineStroke=1;
this.ports=new ArrayList();
Figure.call(this);
};
Node.prototype=new Figure;
Node.prototype.type="Node";
Node.prototype.dispose=function(){
for(var i=0;i<this.ports.getSize();i++){
this.ports.get(i).dispose();
}
this.ports=null;
Figure.prototype.dispose.call(this);
};
Node.prototype.createHTMLElement=function(){
var item=Figure.prototype.createHTMLElement.call(this);
item.style.width="auto";
item.style.height="auto";
item.style.margin="0px";
item.style.padding="0px";
if(this.lineColor!=null){
item.style.border=this.lineStroke+"px solid "+this.lineColor.getHTMLStyle();
}
item.style.fontSize="1px";
if(this.bgColor!=null){
item.style.backgroundColor=this.bgColor.getHTMLStyle();
}
return item;
};
Node.prototype.paint=function(){
Figure.prototype.paint.call(this);
for(var i=0;i<this.ports.getSize();i++){
this.ports.get(i).paint();
}
};
Node.prototype.getPorts=function(){
var _2d0e=new Array();
for(var i=0;i<this.ports.getSize();i++){
_2d0e.push(this.ports.get(i));
}
return _2d0e;
};
Node.prototype.getPort=function(_2d10){
if(this.ports==null){
return null;
}
for(var i=0;i<this.ports.getSize();i++){
var port=this.ports.get(i);
if(port.getName()==_2d10){
return port;
}
}
};
Node.prototype.addPort=function(port,x,y){
this.ports.add(port);
port.setOrigin(x,y);
port.setPosition(x,y);
port.setParent(this);
port.setDeleteable(false);
this.html.appendChild(port.getHTMLElement());
if(this.workflow!=null){
this.workflow.registerPort(port);
}
};
Node.prototype.removePort=function(port){
if(this.ports!=null){
this.ports.removeElementAt(this.ports.indexOf(port));
}
try{
this.html.removeChild(port.getHTMLElement());
}
catch(exc){
}
if(this.workflow!=null){
this.workflow.unregisterPort(port);
}
};
Node.prototype.setWorkflow=function(_2d17){
var _2d18=this.workflow;
Figure.prototype.setWorkflow.call(this,_2d17);
if(_2d18!=null){
for(var i=0;i<this.ports.getSize();i++){
_2d18.unregisterPort(this.ports.get(i));
}
}
if(this.workflow!=null){
for(var i=0;i<this.ports.getSize();i++){
this.workflow.registerPort(this.ports.get(i));
}
}
};
Node.prototype.setBackgroundColor=function(color){
this.bgColor=color;
if(this.bgColor!=null){
this.html.style.backgroundColor=this.bgColor.getHTMLStyle();
}else{
this.html.style.backgroundColor="transparent";
}
};
Node.prototype.setColor=function(color){
this.lineColor=color;
if(this.lineColor!=null){
this.html.style.border=this.lineStroke+"px solid "+this.lineColor.getHTMLStyle();
}else{
this.html.style.border="0px";
}
};
Node.prototype.setLineWidth=function(w){
this.lineStroke=w;
if(this.lineColor!=null){
this.html.style.border=this.lineStroke+"px solid "+this.lineColor.getHTMLStyle();
}else{
this.html.style.border="0px";
}
};
VectorFigure=function(){
this.bgColor=null;
this.lineColor=new Color(0,0,0);
this.stroke=1;
this.graphics=null;
Node.call(this);
};
VectorFigure.prototype=new Node;
VectorFigure.prototype.type="VectorFigure";
VectorFigure.prototype.dispose=function(){
Node.prototype.dispose.call(this);
this.bgColor=null;
this.lineColor=null;
if(this.graphics!=null){
this.graphics.clear();
}
this.graphics=null;
};
VectorFigure.prototype.createHTMLElement=function(){
var item=Node.prototype.createHTMLElement.call(this);
item.style.border="0px";
item.style.backgroundColor="transparent";
return item;
};
VectorFigure.prototype.setWorkflow=function(_3879){
Node.prototype.setWorkflow.call(this,_3879);
if(this.workflow==null){
this.graphics.clear();
this.graphics=null;
}
};
VectorFigure.prototype.paint=function(){
if(this.graphics==null){
this.graphics=new jsGraphics(this.id);
}else{
this.graphics.clear();
}
Node.prototype.paint.call(this);
for(var i=0;i<this.ports.getSize();i++){
this.html.appendChild(this.ports.get(i).getHTMLElement());
}
};
VectorFigure.prototype.setDimension=function(w,h){
Node.prototype.setDimension.call(this,w,h);
if(this.graphics!=null){
this.paint();
}
};
VectorFigure.prototype.setBackgroundColor=function(color){
this.bgColor=color;
if(this.graphics!=null){
this.paint();
}
};
VectorFigure.prototype.getBackgroundColor=function(){
return this.bgColor;
};
VectorFigure.prototype.setLineWidth=function(w){
this.stroke=w;
if(this.graphics!=null){
this.paint();
}
};
VectorFigure.prototype.setColor=function(color){
this.lineColor=color;
if(this.graphics!=null){
this.paint();
}
};
VectorFigure.prototype.getColor=function(){
return this.lineColor;
};
Label=function(msg){
this.msg=msg;
this.bgColor=null;
this.color=new Color(0,0,0);
this.fontSize=10;
this.textNode=null;
this.align="center";
Figure.call(this);
};
Label.prototype=new Figure;
Label.prototype.type="Label";
Label.prototype.createHTMLElement=function(){
var item=Figure.prototype.createHTMLElement.call(this);
this.textNode=document.createTextNode(this.msg);
item.appendChild(this.textNode);
item.style.color=this.color.getHTMLStyle();
item.style.fontSize=this.fontSize+"pt";
item.style.width="auto";
item.style.height="auto";
item.style.paddingLeft="3px";
item.style.paddingRight="3px";
item.style.textAlign=this.align;
if(this.bgColor!=null){
item.style.backgroundColor=this.bgColor.getHTMLStyle();
}
return item;
};
Label.prototype.isResizeable=function(){
return false;
};
Label.prototype.setWordwrap=function(flag){
this.html.style.whiteSpace=flag?"wrap":"nowrap";
};
Label.prototype.setAlign=function(align){
this.align=align;
this.html.style.textAlign=align;
};
Label.prototype.setBackgroundColor=function(color){
this.bgColor=color;
if(this.bgColor!=null){
this.html.style.backgroundColor=this.bgColor.getHTMLStyle();
}else{
this.html.style.backgroundColor="transparent";
}
};
Label.prototype.setColor=function(color){
this.color=color;
this.html.style.color=this.color.getHTMLStyle();
};
Label.prototype.setFontSize=function(size){
this.fontSize=size;
this.html.style.fontSize=this.fontSize+"pt";
};
Label.prototype.getWidth=function(){
try{
return parseInt(getComputedStyle(this.html,"").getPropertyValue("width"));
}
catch(e){
return (this.html.clientWidth);
}
return 100;
};
Label.prototype.getHeight=function(){
try{
return parseInt(getComputedStyle(this.html,"").getPropertyValue("height"));
}
catch(e){
return (this.html.clientHeight);
}
return 30;
};
Label.prototype.setText=function(text){
this.msg=text;
this.html.removeChild(this.textNode);
this.textNode=document.createTextNode(this.msg);
this.html.appendChild(this.textNode);
};
Label.prototype.setStyledText=function(text){
this.msg=text;
this.html.removeChild(this.textNode);
this.textNode=document.createElement("div");
this.textNode.style.whiteSpace="nowrap";
this.textNode.innerHTML=text;
this.html.appendChild(this.textNode);
};
Oval=function(){
VectorFigure.call(this);
};
Oval.prototype=new VectorFigure;
Oval.prototype.type="Oval";
Oval.prototype.paint=function(){
VectorFigure.prototype.paint.call(this);
this.graphics.setStroke(this.stroke);
if(this.bgColor!=null){
this.graphics.setColor(this.bgColor.getHTMLStyle());
this.graphics.fillOval(0,0,this.getWidth()-1,this.getHeight()-1);
}
if(this.lineColor!=null){
this.graphics.setColor(this.lineColor.getHTMLStyle());
this.graphics.drawOval(0,0,this.getWidth()-1,this.getHeight()-1);
}
this.graphics.paint();
};
Circle=function(_393c){
Oval.call(this);
if(_393c){
this.setDimension(_393c,_393c);
}
};
Circle.prototype=new Oval;
Circle.prototype.type="Circle";
Circle.prototype.setDimension=function(w,h){
if(w>h){
Oval.prototype.setDimension.call(this,w,w);
}else{
Oval.prototype.setDimension.call(this,h,h);
}
};
Circle.prototype.isStrechable=function(){
return false;
};
Rectangle=function(width,_3848){
this.bgColor=null;
this.lineColor=new Color(0,0,0);
this.lineStroke=1;
Figure.call(this);
if(width&&_3848){
this.setDimension(width,_3848);
}
};
Rectangle.prototype=new Figure;
Rectangle.prototype.type="Rectangle";
Rectangle.prototype.dispose=function(){
Figure.prototype.dispose.call(this);
this.bgColor=null;
this.lineColor=null;
};
Rectangle.prototype.createHTMLElement=function(){
var item=Figure.prototype.createHTMLElement.call(this);
item.style.width="auto";
item.style.height="auto";
item.style.margin="0px";
item.style.padding="0px";
item.style.border=this.lineStroke+"px solid "+this.lineColor.getHTMLStyle();
item.style.fontSize="1px";
item.style.lineHeight="1px";
item.innerHTML="&nbsp";
if(this.bgColor!=null){
item.style.backgroundColor=this.bgColor.getHTMLStyle();
}
return item;
};
Rectangle.prototype.setBackgroundColor=function(color){
this.bgColor=color;
if(this.bgColor!=null){
this.html.style.backgroundColor=this.bgColor.getHTMLStyle();
}else{
this.html.style.backgroundColor="transparent";
}
};
Rectangle.prototype.getBackgroundColor=function(){
return this.bgColor;
};
Rectangle.prototype.setColor=function(color){
this.lineColor=color;
if(this.lineColor!=null){
this.html.style.border=this.lineStroke+"px solid "+this.lineColor.getHTMLStyle();
}else{
this.html.style.border=this.lineStroke+"0px";
}
};
Rectangle.prototype.getColor=function(){
return this.lineColor;
};
Rectangle.prototype.getWidth=function(){
return Figure.prototype.getWidth.call(this)+2*this.lineStroke;
};
Rectangle.prototype.getHeight=function(){
return Figure.prototype.getHeight.call(this)+2*this.lineStroke;
};
Rectangle.prototype.setDimension=function(w,h){
return Figure.prototype.setDimension.call(this,w-2*this.lineStroke,h-2*this.lineStroke);
};
Rectangle.prototype.setLineWidth=function(w){
var diff=w-this.lineStroke;
this.setDimension(this.getWidth()-2*diff,this.getHeight()-2*diff);
this.lineStroke=w;
var c="transparent";
if(this.lineColor!=null){
c=this.lineColor.getHTMLStyle();
}
this.html.style.border=this.lineStroke+"px solid "+c;
};
Rectangle.prototype.getLineWidth=function(){
return this.lineStroke;
};
ImageFigure=function(url){
this.url=url;
Node.call(this);
this.setDimension(40,40);
};
ImageFigure.prototype=new Node;
ImageFigure.prototype.type="Image";
ImageFigure.prototype.createHTMLElement=function(){
var item=Node.prototype.createHTMLElement.call(this);
item.style.width=this.width+"px";
item.style.height=this.height+"px";
item.style.margin="0px";
item.style.padding="0px";
item.style.border="0px";
if(this.url!=null){
item.style.backgroundImage="url("+this.url+")";
}else{
item.style.backgroundImage="";
}
return item;
};
ImageFigure.prototype.setBackgroundColor=function(color){
};
ImageFigure.prototype.setColor=function(color){
};
ImageFigure.prototype.isResizeable=function(){
return false;
};
ImageFigure.prototype.setImage=function(url){
this.url=url;
if(this.url!=null){
this.html.style.backgroundImage="url("+this.url+")";
}else{
this.html.style.backgroundImage="";
}
};
Port=function(_3b81,_3b82){
Corona=function(){
};
Corona.prototype=new Circle;
Corona.prototype.setAlpha=function(_3b83){
Circle.prototype.setAlpha.call(this,Math.min(0.3,_3b83));
};
if(_3b81==null){
this.currentUIRepresentation=new Circle();
}else{
this.currentUIRepresentation=_3b81;
}
if(_3b82==null){
this.connectedUIRepresentation=new Circle();
this.connectedUIRepresentation.setColor(null);
}else{
this.connectedUIRepresentation=_3b82;
}
this.disconnectedUIRepresentation=this.currentUIRepresentation;
this.hideIfConnected=false;
this.uiRepresentationAdded=true;
this.parentNode=null;
this.originX=0;
this.originY=0;
this.coronaWidth=10;
this.corona=null;
Rectangle.call(this);
this.setDimension(8,8);
this.setBackgroundColor(new Color(100,180,100));
this.setColor(new Color(90,150,90));
Rectangle.prototype.setColor.call(this,null);
this.dropable=new DropTarget(this.html);
this.dropable.node=this;
this.dropable.addEventListener("dragenter",function(_3b84){
_3b84.target.node.onDragEnter(_3b84.relatedTarget.node);
});
this.dropable.addEventListener("dragleave",function(_3b85){
_3b85.target.node.onDragLeave(_3b85.relatedTarget.node);
});
this.dropable.addEventListener("drop",function(_3b86){
_3b86.relatedTarget.node.onDrop(_3b86.target.node);
});
};
Port.prototype=new Rectangle;
Port.prototype.type="Port";
Port.ZOrderBaseIndex=5000;
Port.setZOrderBaseIndex=function(index){
Port.ZOrderBaseIndex=index;
};
Port.prototype.setHideIfConnected=function(flag){
this.hideIfConnected=flag;
};
Port.prototype.dispose=function(){
for(key in this.moveListener){
var _3b89=this.moveListener[key];
if(_3b89!=null){
this.parentNode.workflow.removeFigure(_3b89);
_3b89.dispose();
}
}
Rectangle.prototype.dispose.call(this);
this.parentNode=null;
this.dropable.node=null;
this.dropable=null;
this.disconnectedUIRepresentation.dispose();
this.connectedUIRepresentation.dispose();
};
Port.prototype.createHTMLElement=function(){
var item=Rectangle.prototype.createHTMLElement.call(this);
item.style.zIndex=Port.ZOrderBaseIndex;
this.currentUIRepresentation.html.zIndex=Port.ZOrderBaseIndex;
item.appendChild(this.currentUIRepresentation.html);
this.uiRepresentationAdded=true;
return item;
};
Port.prototype.setUiRepresentation=function(_3b8b){
if(_3b8b==null){
_3b8b=new Figure();
}
if(this.uiRepresentationAdded){
this.html.removeChild(this.currentUIRepresentation.getHTMLElement());
}
this.html.appendChild(_3b8b.getHTMLElement());
_3b8b.paint();
this.currentUIRepresentation=_3b8b;
};
Port.prototype.onMouseEnter=function(){
this.setLineWidth(2);
};
Port.prototype.onMouseLeave=function(){
this.setLineWidth(0);
};
Port.prototype.setDimension=function(width,_3b8d){
Rectangle.prototype.setDimension.call(this,width,_3b8d);
this.connectedUIRepresentation.setDimension(width,_3b8d);
this.disconnectedUIRepresentation.setDimension(width,_3b8d);
this.setPosition(this.x,this.y);
};
Port.prototype.setBackgroundColor=function(color){
this.currentUIRepresentation.setBackgroundColor(color);
};
Port.prototype.getBackgroundColor=function(){
return this.currentUIRepresentation.getBackgroundColor();
};
Port.prototype.getConnections=function(){
var _3b8f=new Array();
for(key in this.moveListener){
var _3b90=this.moveListener[key];
if(_3b90 instanceof Connection){
_3b8f.push(_3b90);
}
}
return _3b8f;
};
Port.prototype.setColor=function(color){
this.currentUIRepresentation.setColor(color);
};
Port.prototype.getColor=function(){
return this.currentUIRepresentation.getColor();
};
Port.prototype.setLineWidth=function(width){
this.currentUIRepresentation.setLineWidth(width);
};
Port.prototype.getLineWidth=function(){
return this.currentUIRepresentation.getLineWidth();
};
Port.prototype.paint=function(){
this.currentUIRepresentation.paint();
};
Port.prototype.setPosition=function(xPos,yPos){
this.originX=xPos;
this.originY=yPos;
Rectangle.prototype.setPosition.call(this,xPos,yPos);
if(this.html==null){
return;
}
this.html.style.left=(this.x-this.getWidth()/2)+"px";
this.html.style.top=(this.y-this.getHeight()/2)+"px";
};
Port.prototype.setParent=function(_3b95){
if(this.parentNode!=null){
this.parentNode.detachMoveListener(this);
}
this.parentNode=_3b95;
if(this.parentNode!=null){
this.parentNode.attachMoveListener(this);
}
};
Port.prototype.attachMoveListener=function(_3b96){
Rectangle.prototype.attachMoveListener.call(this,_3b96);
if(this.hideIfConnected==true){
this.setUiRepresentation(this.connectedUIRepresentation);
}
};
Port.prototype.detachMoveListener=function(_3b97){
Rectangle.prototype.detachMoveListener.call(this,_3b97);
if(this.getConnections().length==0){
this.setUiRepresentation(this.disconnectedUIRepresentation);
}
};
Port.prototype.getParent=function(){
return this.parentNode;
};
Port.prototype.onDrag=function(){
Rectangle.prototype.onDrag.call(this);
this.parentNode.workflow.showConnectionLine(this.parentNode.x+this.x,this.parentNode.y+this.y,this.parentNode.x+this.originX,this.parentNode.y+this.originY);
};
Port.prototype.getCoronaWidth=function(){
return this.coronaWidth;
};
Port.prototype.setCoronaWidth=function(width){
this.coronaWidth=width;
};
Port.prototype.onDragend=function(){
this.setAlpha(1);
this.setPosition(this.originX,this.originY);
this.parentNode.workflow.hideConnectionLine();
};
Port.prototype.setOrigin=function(x,y){
this.originX=x;
this.originY=y;
};
Port.prototype.onDragEnter=function(port){
this.parentNode.workflow.connectionLine.setColor(new Color(0,150,0));
this.parentNode.workflow.connectionLine.setLineWidth(3);
this.showCorona(true);
};
Port.prototype.onDragLeave=function(port){
this.parentNode.workflow.connectionLine.setColor(new Color(0,0,0));
this.parentNode.workflow.connectionLine.setLineWidth(1);
this.showCorona(false);
};
Port.prototype.onDrop=function(port){
if(this.parentNode.id==port.parentNode.id){
}else{
var _3b9e=new CommandConnect(this.parentNode.workflow,port,this);
this.parentNode.workflow.getCommandStack().execute(_3b9e);
}
};
Port.prototype.getAbsolutePosition=function(){
return new Point(this.getAbsoluteX(),this.getAbsoluteY());
};
Port.prototype.getAbsoluteY=function(){
return this.originY+this.parentNode.getY();
};
Port.prototype.getAbsoluteX=function(){
return this.originX+this.parentNode.getX();
};
Port.prototype.onOtherFigureMoved=function(_3b9f){
this.fireMoveEvent();
};
Port.prototype.getName=function(){
return this.getProperty("name");
};
Port.prototype.setName=function(name){
this.setProperty("name",name);
};
Port.prototype.isOver=function(iX,iY){
var x=this.getAbsoluteX()-this.coronaWidth-this.getWidth()/2;
var y=this.getAbsoluteY()-this.coronaWidth-this.getHeight()/2;
var iX2=x+this.width+(this.coronaWidth*2)+this.getWidth()/2;
var iY2=y+this.height+(this.coronaWidth*2)+this.getHeight()/2;
return (iX>=x&&iX<=iX2&&iY>=y&&iY<=iY2);
};
Port.prototype.showCorona=function(flag,_3ba8){
if(flag){
this.corona=new Corona();
this.corona.setAlpha(0.3);
this.corona.setBackgroundColor(new Color(0,125,125));
this.corona.setColor(null);
this.corona.setDimension(this.getWidth()+(this.getCoronaWidth()*2),this.getWidth()+(this.getCoronaWidth()*2));
this.parentNode.getWorkflow().addFigure(this.corona,this.getAbsoluteX()-this.getCoronaWidth()-this.getWidth()/2,this.getAbsoluteY()-this.getCoronaWidth()-this.getHeight()/2);
}else{
this.parentNode.getWorkflow().removeFigure(this.corona);
this.corona=null;
}
};
InputPort=function(_3a3c){
Port.call(this,_3a3c);
};
InputPort.prototype=new Port;
InputPort.prototype.type="InputPort";
InputPort.prototype.onDrop=function(port){
if(port.getMaxFanOut&&port.getMaxFanOut()<=port.getFanOut()){
return;
}
if(this.parentNode.id==port.parentNode.id){
}else{
if(port instanceof OutputPort){
var _3a3e=new CommandConnect(this.parentNode.workflow,port,this);
this.parentNode.workflow.getCommandStack().execute(_3a3e);
}
}
};
InputPort.prototype.onDragEnter=function(port){
if(port instanceof OutputPort){
Port.prototype.onDragEnter.call(this,port);
}
};
InputPort.prototype.onDragLeave=function(port){
if(port instanceof OutputPort){
Port.prototype.onDragLeave.call(this,port);
}
};
OutputPort=function(_2fe4){
Port.call(this,_2fe4);
this.maxFanOut=-1;
};
OutputPort.prototype=new Port;
OutputPort.prototype.type="OutputPort";
OutputPort.prototype.onDrop=function(port){
if(this.getMaxFanOut()<=this.getFanOut()){
return;
}
if(this.parentNode.id==port.parentNode.id){
}else{
if(port instanceof InputPort){
var _2fe6=new CommandConnect(this.parentNode.workflow,this,port);
this.parentNode.workflow.getCommandStack().execute(_2fe6);
}
}
};
OutputPort.prototype.onDragEnter=function(port){
if(this.getMaxFanOut()<=this.getFanOut()){
return;
}
if(port instanceof InputPort){
Port.prototype.onDragEnter.call(this,port);
}
};
OutputPort.prototype.onDragLeave=function(port){
if(port instanceof InputPort){
Port.prototype.onDragLeave.call(this,port);
}
};
OutputPort.prototype.onDragstart=function(x,y){
if(this.maxFanOut==-1){
return true;
}
if(this.getMaxFanOut()<=this.getFanOut()){
return false;
}
return true;
};
OutputPort.prototype.setMaxFanOut=function(count){
this.maxFanOut=count;
};
OutputPort.prototype.getMaxFanOut=function(){
return this.maxFanOut;
};
OutputPort.prototype.getFanOut=function(){
if(this.getParent().workflow==null){
return 0;
}
var count=0;
var lines=this.getParent().workflow.getLines();
for(key in lines){
var line=lines[key];
if(line instanceof Connection){
if(line.getSource()==this){
count++;
}else{
if(line.getTarget()==this){
count++;
}
}
}
}
return count;
};
Line=function(){
this.lineColor=new Color(0,0,0);
this.stroke=1;
this.canvas=null;
this.workflow=null;
this.html=null;
this.graphics=null;
this.id=this.generateUId();
this.startX=30;
this.startY=30;
this.endX=100;
this.endY=100;
this.alpha=1;
this.zOrder=Line.ZOrderBaseIndex;
this.moveListener=new Object();
this.setSelectable(true);
this.setDeleteable(true);
};
Line.ZOrderBaseIndex=20;
Line.setZOrderBaseIndex=function(index){
Line.ZOrderBaseIndex=index;
};
Line.prototype.dispose=function(){
this.canvas=null;
this.workflow=null;
if(this.graphics!=null){
this.graphics.clear();
}
this.graphics=null;
};
Line.prototype.getZOrder=function(){
return this.zOrder;
};
Line.prototype.setZOrder=function(index){
if(this.html!=null){
this.html.style.zIndex=index;
}
this.zOrder=index;
};
Line.prototype.createHTMLElement=function(){
var item=document.createElement("div");
item.id=this.id;
item.style.position="absolute";
item.style.left="0px";
item.style.top="0px";
item.style.height="0px";
item.style.width="0px";
item.style.zIndex=this.zOrder;
return item;
};
Line.prototype.getHTMLElement=function(){
if(this.html==null){
this.html=this.createHTMLElement();
}
return this.html;
};
Line.prototype.getWorkflow=function(){
return this.workflow;
};
Line.prototype.isResizeable=function(){
return true;
};
Line.prototype.setCanvas=function(_38d2){
this.canvas=_38d2;
if(this.graphics!=null){
this.graphics.clear();
}
this.graphics=null;
};
Line.prototype.setWorkflow=function(_38d3){
this.workflow=_38d3;
if(this.graphics!=null){
this.graphics.clear();
}
this.graphics=null;
};
Line.prototype.paint=function(){
if(this.graphics==null){
this.graphics=new jsGraphics(this.id);
}else{
this.graphics.clear();
}
this.graphics.setStroke(this.stroke);
this.graphics.setColor(this.lineColor.getHTMLStyle());
this.graphics.drawLine(this.startX,this.startY,this.endX,this.endY);
this.graphics.paint();
};
Line.prototype.attachMoveListener=function(_38d4){
this.moveListener[_38d4.id]=_38d4;
};
Line.prototype.detachMoveListener=function(_38d5){
this.moveListener[_38d5.id]=null;
};
Line.prototype.fireMoveEvent=function(){
for(key in this.moveListener){
var _38d6=this.moveListener[key];
if(_38d6!=null){
_38d6.onOtherFigureMoved(this);
}
}
};
Line.prototype.onOtherFigureMoved=function(_38d7){
};
Line.prototype.setLineWidth=function(w){
this.stroke=w;
if(this.graphics!=null){
this.paint();
}
this.setDocumentDirty();
};
Line.prototype.setColor=function(color){
this.lineColor=color;
if(this.graphics!=null){
this.paint();
}
this.setDocumentDirty();
};
Line.prototype.getColor=function(){
return this.lineColor;
};
Line.prototype.setAlpha=function(_38da){
if(_38da==this.alpha){
return;
}
try{
this.html.style.MozOpacity=_38da;
}
catch(exc){
}
try{
this.html.style.opacity=_38da;
}
catch(exc){
}
try{
var _38db=Math.round(_38da*100);
if(_38db>=99){
this.html.style.filter="";
}else{
this.html.style.filter="alpha(opacity="+_38db+")";
}
}
catch(exc){
}
this.alpha=_38da;
};
Line.prototype.setStartPoint=function(x,y){
this.startX=x;
this.startY=y;
if(this.graphics!=null){
this.paint();
}
this.setDocumentDirty();
};
Line.prototype.setEndPoint=function(x,y){
this.endX=x;
this.endY=y;
if(this.graphics!=null){
this.paint();
}
this.setDocumentDirty();
};
Line.prototype.getStartX=function(){
return this.startX;
};
Line.prototype.getStartY=function(){
return this.startY;
};
Line.prototype.getStartPoint=function(){
return new Point(this.startX,this.startY);
};
Line.prototype.getEndX=function(){
return this.endX;
};
Line.prototype.getEndY=function(){
return this.endY;
};
Line.prototype.getEndPoint=function(){
return new Point(this.endX,this.endY);
};
Line.prototype.isSelectable=function(){
return this.selectable;
};
Line.prototype.setSelectable=function(flag){
this.selectable=flag;
};
Line.prototype.isDeleteable=function(){
return this.deleteable;
};
Line.prototype.setDeleteable=function(flag){
this.deleteable=flag;
};
Line.prototype.getLength=function(){
return Math.sqrt((this.startX-this.endX)*(this.startX-this.endX)+(this.startY-this.endY)*(this.startY-this.endY));
};
Line.prototype.getAngle=function(){
var _38e2=this.getLength();
var angle=-(180/Math.PI)*Math.asin((this.startY-this.endY)/_38e2);
if(angle<0){
if(this.endX<this.startX){
angle=Math.abs(angle)+180;
}else{
angle=360-Math.abs(angle);
}
}else{
if(this.endX<this.startX){
angle=180-angle;
}
}
return angle;
};
Line.prototype.onContextMenu=function(x,y){
var menu=this.getContextMenu();
if(menu!=null){
this.workflow.showMenu(menu,x,y);
}
};
Line.prototype.getContextMenu=function(){
return null;
};
Line.prototype.onDoubleClick=function(){
};
Line.prototype.setDocumentDirty=function(){
if(this.workflow!=null){
this.workflow.setDocumentDirty();
}
};
Line.prototype.generateUId=function(){
var chars="0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
var _38e8=10;
var _38e9=10;
nbTry=0;
while(nbTry<1000){
var id="";
for(var i=0;i<_38e8;i++){
var rnum=Math.floor(Math.random()*chars.length);
id+=chars.substring(rnum,rnum+1);
}
elem=document.getElementById(id);
if(!elem){
return id;
}
nbTry+=1;
}
return null;
};
Line.prototype.containsPoint=function(px,py){
return Line.hit(this.startX,this.startY,this.endX,this.endY,px,py);
};
Line.hit=function(X1,Y1,X2,Y2,px,py){
var _38f5=5;
X2-=X1;
Y2-=Y1;
px-=X1;
py-=Y1;
var _38f6=px*X2+py*Y2;
var _38f7;
if(_38f6<=0){
_38f7=0;
}else{
px=X2-px;
py=Y2-py;
_38f6=px*X2+py*Y2;
if(_38f6<=0){
_38f7=0;
}else{
_38f7=_38f6*_38f6/(X2*X2+Y2*Y2);
}
}
var lenSq=px*px+py*py-_38f7;
if(lenSq<0){
lenSq=0;
}
return Math.sqrt(lenSq)<_38f5;
};
ConnectionRouter=function(){
};
ConnectionRouter.prototype.type="ConnectionRouter";
ConnectionRouter.prototype.getDirection=function(r,p){
var _395d=Math.abs(r.x-p.x);
var _395e=3;
var i=Math.abs(r.y-p.y);
if(i<=_395d){
_395d=i;
_395e=0;
}
i=Math.abs(r.getBottom()-p.y);
if(i<=_395d){
_395d=i;
_395e=2;
}
i=Math.abs(r.getRight()-p.x);
if(i<_395d){
_395d=i;
_395e=1;
}
return _395e;
};
ConnectionRouter.prototype.getEndDirection=function(conn){
var p=conn.getEndPoint();
var rect=conn.getTarget().getParent().getBounds();
return this.getDirection(rect,p);
};
ConnectionRouter.prototype.getStartDirection=function(conn){
var p=conn.getStartPoint();
var rect=conn.getSource().getParent().getBounds();
return this.getDirection(rect,p);
};
ConnectionRouter.prototype.route=function(_3966){
};
NullConnectionRouter=function(){
};
NullConnectionRouter.prototype=new ConnectionRouter;
NullConnectionRouter.prototype.type="NullConnectionRouter";
NullConnectionRouter.prototype.invalidate=function(){
};
NullConnectionRouter.prototype.route=function(_394a){
_394a.addPoint(_394a.getStartPoint());
_394a.addPoint(_394a.getEndPoint());
};
ManhattanConnectionRouter=function(){
this.MINDIST=20;
};
ManhattanConnectionRouter.prototype=new ConnectionRouter;
ManhattanConnectionRouter.prototype.type="ManhattanConnectionRouter";
ManhattanConnectionRouter.prototype.route=function(conn){
var _35cd=conn.getStartPoint();
var _35ce=this.getStartDirection(conn);
var toPt=conn.getEndPoint();
var toDir=this.getEndDirection(conn);
this._route(conn,toPt,toDir,_35cd,_35ce);
};
ManhattanConnectionRouter.prototype._route=function(conn,_35d2,_35d3,toPt,toDir){
var TOL=0.1;
var _35d7=0.01;
var UP=0;
var RIGHT=1;
var DOWN=2;
var LEFT=3;
var xDiff=_35d2.x-toPt.x;
var yDiff=_35d2.y-toPt.y;
var point;
var dir;
if(((xDiff*xDiff)<(_35d7))&&((yDiff*yDiff)<(_35d7))){
conn.addPoint(new Point(toPt.x,toPt.y));
return;
}
if(_35d3==LEFT){
if((xDiff>0)&&((yDiff*yDiff)<TOL)&&(toDir==RIGHT)){
point=toPt;
dir=toDir;
}else{
if(xDiff<0){
point=new Point(_35d2.x-this.MINDIST,_35d2.y);
}else{
if(((yDiff>0)&&(toDir==DOWN))||((yDiff<0)&&(toDir==UP))){
point=new Point(toPt.x,_35d2.y);
}else{
if(_35d3==toDir){
var pos=Math.min(_35d2.x,toPt.x)-this.MINDIST;
point=new Point(pos,_35d2.y);
}else{
point=new Point(_35d2.x-(xDiff/2),_35d2.y);
}
}
}
if(yDiff>0){
dir=UP;
}else{
dir=DOWN;
}
}
}else{
if(_35d3==RIGHT){
if((xDiff<0)&&((yDiff*yDiff)<TOL)&&(toDir==LEFT)){
point=toPt;
dir=toDir;
}else{
if(xDiff>0){
point=new Point(_35d2.x+this.MINDIST,_35d2.y);
}else{
if(((yDiff>0)&&(toDir==DOWN))||((yDiff<0)&&(toDir==UP))){
point=new Point(toPt.x,_35d2.y);
}else{
if(_35d3==toDir){
var pos=Math.max(_35d2.x,toPt.x)+this.MINDIST;
point=new Point(pos,_35d2.y);
}else{
point=new Point(_35d2.x-(xDiff/2),_35d2.y);
}
}
}
if(yDiff>0){
dir=UP;
}else{
dir=DOWN;
}
}
}else{
if(_35d3==DOWN){
if(((xDiff*xDiff)<TOL)&&(yDiff<0)&&(toDir==UP)){
point=toPt;
dir=toDir;
}else{
if(yDiff>0){
point=new Point(_35d2.x,_35d2.y+this.MINDIST);
}else{
if(((xDiff>0)&&(toDir==RIGHT))||((xDiff<0)&&(toDir==LEFT))){
point=new Point(_35d2.x,toPt.y);
}else{
if(_35d3==toDir){
var pos=Math.max(_35d2.y,toPt.y)+this.MINDIST;
point=new Point(_35d2.x,pos);
}else{
point=new Point(_35d2.x,_35d2.y-(yDiff/2));
}
}
}
if(xDiff>0){
dir=LEFT;
}else{
dir=RIGHT;
}
}
}else{
if(_35d3==UP){
if(((xDiff*xDiff)<TOL)&&(yDiff>0)&&(toDir==DOWN)){
point=toPt;
dir=toDir;
}else{
if(yDiff<0){
point=new Point(_35d2.x,_35d2.y-this.MINDIST);
}else{
if(((xDiff>0)&&(toDir==RIGHT))||((xDiff<0)&&(toDir==LEFT))){
point=new Point(_35d2.x,toPt.y);
}else{
if(_35d3==toDir){
var pos=Math.min(_35d2.y,toPt.y)-this.MINDIST;
point=new Point(_35d2.x,pos);
}else{
point=new Point(_35d2.x,_35d2.y-(yDiff/2));
}
}
}
if(xDiff>0){
dir=LEFT;
}else{
dir=RIGHT;
}
}
}
}
}
}
this._route(conn,point,dir,toPt,toDir);
conn.addPoint(_35d2);
};
BezierConnectionRouter=function(_2fb0){
if(!_2fb0){
this.cheapRouter=new ManhattanConnectionRouter();
}else{
this.cheapRouter=null;
}
this.iteration=5;
};
BezierConnectionRouter.prototype=new ConnectionRouter;
BezierConnectionRouter.prototype.type="BezierConnectionRouter";
BezierConnectionRouter.prototype.drawBezier=function(_2fb1,_2fb2,t,iter){
var n=_2fb1.length-1;
var q=new Array();
for(var i=0;i<n+1;i++){
q[i]=new Array();
q[i][0]=_2fb1[i];
}
for(var j=1;j<=n;j++){
for(var i=0;i<=(n-j);i++){
q[i][j]=new Point((1-t)*q[i][j-1].x+t*q[i+1][j-1].x,(1-t)*q[i][j-1].y+t*q[i+1][j-1].y);
}
}
var c1=new Array();
var c2=new Array();
for(var i=0;i<n+1;i++){
c1[i]=q[0][i];
c2[i]=q[i][n-i];
}
if(iter>=0){
this.drawBezier(c1,_2fb2,t,--iter);
this.drawBezier(c2,_2fb2,t,--iter);
}else{
for(var i=0;i<n;i++){
_2fb2.push(q[i][n-i]);
}
}
};
BezierConnectionRouter.prototype.route=function(conn){
if(this.cheapRouter!=null&&(conn.getSource().getParent().isMoving==true||conn.getTarget().getParent().isMoving==true)){
this.cheapRouter.route(conn);
return;
}
var _2fbc=new Array();
var _2fbd=conn.getStartPoint();
var toPt=conn.getEndPoint();
this._route(_2fbc,conn,toPt,this.getEndDirection(conn),_2fbd,this.getStartDirection(conn));
var _2fbf=new Array();
this.drawBezier(_2fbc,_2fbf,0.5,this.iteration);
for(var i=0;i<_2fbf.length;i++){
conn.addPoint(_2fbf[i]);
}
conn.addPoint(toPt);
};
BezierConnectionRouter.prototype._route=function(_2fc1,conn,_2fc3,_2fc4,toPt,toDir){
var TOL=0.1;
var _2fc8=0.01;
var _2fc9=90;
var UP=0;
var RIGHT=1;
var DOWN=2;
var LEFT=3;
var xDiff=_2fc3.x-toPt.x;
var yDiff=_2fc3.y-toPt.y;
var point;
var dir;
if(((xDiff*xDiff)<(_2fc8))&&((yDiff*yDiff)<(_2fc8))){
_2fc1.push(new Point(toPt.x,toPt.y));
return;
}
if(_2fc4==LEFT){
if((xDiff>0)&&((yDiff*yDiff)<TOL)&&(toDir==RIGHT)){
point=toPt;
dir=toDir;
}else{
if(xDiff<0){
point=new Point(_2fc3.x-_2fc9,_2fc3.y);
}else{
if(((yDiff>0)&&(toDir==DOWN))||((yDiff<0)&&(toDir==UP))){
point=new Point(toPt.x,_2fc3.y);
}else{
if(_2fc4==toDir){
var pos=Math.min(_2fc3.x,toPt.x)-_2fc9;
point=new Point(pos,_2fc3.y);
}else{
point=new Point(_2fc3.x-(xDiff/2),_2fc3.y);
}
}
}
if(yDiff>0){
dir=UP;
}else{
dir=DOWN;
}
}
}else{
if(_2fc4==RIGHT){
if((xDiff<0)&&((yDiff*yDiff)<TOL)&&(toDir==LEFT)){
point=toPt;
dir=toDir;
}else{
if(xDiff>0){
point=new Point(_2fc3.x+_2fc9,_2fc3.y);
}else{
if(((yDiff>0)&&(toDir==DOWN))||((yDiff<0)&&(toDir==UP))){
point=new Point(toPt.x,_2fc3.y);
}else{
if(_2fc4==toDir){
var pos=Math.max(_2fc3.x,toPt.x)+_2fc9;
point=new Point(pos,_2fc3.y);
}else{
point=new Point(_2fc3.x-(xDiff/2),_2fc3.y);
}
}
}
if(yDiff>0){
dir=UP;
}else{
dir=DOWN;
}
}
}else{
if(_2fc4==DOWN){
if(((xDiff*xDiff)<TOL)&&(yDiff<0)&&(toDir==UP)){
point=toPt;
dir=toDir;
}else{
if(yDiff>0){
point=new Point(_2fc3.x,_2fc3.y+_2fc9);
}else{
if(((xDiff>0)&&(toDir==RIGHT))||((xDiff<0)&&(toDir==LEFT))){
point=new Point(_2fc3.x,toPt.y);
}else{
if(_2fc4==toDir){
var pos=Math.max(_2fc3.y,toPt.y)+_2fc9;
point=new Point(_2fc3.x,pos);
}else{
point=new Point(_2fc3.x,_2fc3.y-(yDiff/2));
}
}
}
if(xDiff>0){
dir=LEFT;
}else{
dir=RIGHT;
}
}
}else{
if(_2fc4==UP){
if(((xDiff*xDiff)<TOL)&&(yDiff>0)&&(toDir==DOWN)){
point=toPt;
dir=toDir;
}else{
if(yDiff<0){
point=new Point(_2fc3.x,_2fc3.y-_2fc9);
}else{
if(((xDiff>0)&&(toDir==RIGHT))||((xDiff<0)&&(toDir==LEFT))){
point=new Point(_2fc3.x,toPt.y);
}else{
if(_2fc4==toDir){
var pos=Math.min(_2fc3.y,toPt.y)-_2fc9;
point=new Point(_2fc3.x,pos);
}else{
point=new Point(_2fc3.x,_2fc3.y-(yDiff/2));
}
}
}
if(xDiff>0){
dir=LEFT;
}else{
dir=RIGHT;
}
}
}
}
}
}
this._route(_2fc1,conn,point,dir,toPt,toDir);
_2fc1.push(_2fc3);
};
FanConnectionRouter=function(){
};
FanConnectionRouter.prototype=new NullConnectionRouter;
FanConnectionRouter.prototype.type="FanConnectionRouter";
FanConnectionRouter.prototype.route=function(conn){
var _3a93=conn.getStartPoint();
var toPt=conn.getEndPoint();
var lines=conn.getSource().getConnections();
var _3a96=new ArrayList();
var index=0;
for(var i=0;i<lines.length;i++){
var _3a99=lines[i];
if(_3a99.getTarget()==conn.getTarget()||_3a99.getSource()==conn.getTarget()){
_3a96.add(_3a99);
if(conn==_3a99){
index=_3a96.getSize();
}
}
}
if(_3a96.getSize()>1){
this.routeCollision(conn,index);
}else{
NullConnectionRouter.prototype.route.call(this,conn);
}
};
FanConnectionRouter.prototype.routeNormal=function(conn){
conn.addPoint(conn.getStartPoint());
conn.addPoint(conn.getEndPoint());
};
FanConnectionRouter.prototype.routeCollision=function(conn,index){
var start=conn.getStartPoint();
var end=conn.getEndPoint();
conn.addPoint(start);
var _3a9f=10;
var _3aa0=new Point((end.x+start.x)/2,(end.y+start.y)/2);
var _3aa1=end.getPosition(start);
var ray;
if(_3aa1==PositionConstants.SOUTH||_3aa1==PositionConstants.EAST){
ray=new Point(end.x-start.x,end.y-start.y);
}else{
ray=new Point(start.x-end.x,start.y-end.y);
}
var _3aa3=Math.sqrt(ray.x*ray.x+ray.y*ray.y);
var _3aa4=_3a9f*ray.x/_3aa3;
var _3aa5=_3a9f*ray.y/_3aa3;
var _3aa6;
if(index%2==0){
_3aa6=new Point(_3aa0.x+(index/2)*(-1*_3aa5),_3aa0.y+(index/2)*_3aa4);
}else{
_3aa6=new Point(_3aa0.x+(index/2)*_3aa5,_3aa0.y+(index/2)*(-1*_3aa4));
}
conn.addPoint(_3aa6);
conn.addPoint(end);
};
Graphics=function(_3486,_3487,_3488){
this.jsGraphics=_3486;
this.xt=_3488.x;
this.yt=_3488.y;
this.radian=_3487*Math.PI/180;
this.sinRadian=Math.sin(this.radian);
this.cosRadian=Math.cos(this.radian);
};
Graphics.prototype.setStroke=function(x){
this.jsGraphics.setStroke(x);
};
Graphics.prototype.drawLine=function(x1,y1,x2,y2){
var _x1=this.xt+x1*this.cosRadian-y1*this.sinRadian;
var _y1=this.yt+x1*this.sinRadian+y1*this.cosRadian;
var _x2=this.xt+x2*this.cosRadian-y2*this.sinRadian;
var _y2=this.yt+x2*this.sinRadian+y2*this.cosRadian;
this.jsGraphics.drawLine(_x1,_y1,_x2,_y2);
};
Graphics.prototype.fillRect=function(x,y,w,h){
var x1=this.xt+x*this.cosRadian-y*this.sinRadian;
var y1=this.yt+x*this.sinRadian+y*this.cosRadian;
var x2=this.xt+(x+w)*this.cosRadian-y*this.sinRadian;
var y2=this.yt+(x+w)*this.sinRadian+y*this.cosRadian;
var x3=this.xt+(x+w)*this.cosRadian-(y+h)*this.sinRadian;
var y3=this.yt+(x+w)*this.sinRadian+(y+h)*this.cosRadian;
var x4=this.xt+x*this.cosRadian-(y+h)*this.sinRadian;
var y4=this.yt+x*this.sinRadian+(y+h)*this.cosRadian;
this.jsGraphics.fillPolygon([x1,x2,x3,x4],[y1,y2,y3,y4]);
};
Graphics.prototype.fillPolygon=function(_349e,_349f){
var rotX=new Array();
var rotY=new Array();
for(var i=0;i<_349e.length;i++){
rotX[i]=this.xt+_349e[i]*this.cosRadian-_349f[i]*this.sinRadian;
rotY[i]=this.yt+_349e[i]*this.sinRadian+_349f[i]*this.cosRadian;
}
this.jsGraphics.fillPolygon(rotX,rotY);
};
Graphics.prototype.setColor=function(color){
this.jsGraphics.setColor(color.getHTMLStyle());
};
Graphics.prototype.drawPolygon=function(_34a4,_34a5){
var rotX=new Array();
var rotY=new Array();
for(var i=0;i<_34a4.length;i++){
rotX[i]=this.xt+_34a4[i]*this.cosRadian-_34a5[i]*this.sinRadian;
rotY[i]=this.yt+_34a4[i]*this.sinRadian+_34a5[i]*this.cosRadian;
}
this.jsGraphics.drawPolygon(rotX,rotY);
};
Connection=function(){
Line.call(this);
this.sourcePort=null;
this.targetPort=null;
this.sourceDecorator=null;
this.targetDecorator=null;
this.router=Connection.defaultRouter;
this.lineSegments=new Array();
this.setColor(new Color(0,0,115));
this.setLineWidth(1);
};
Connection.prototype=new Line;
Connection.defaultRouter=new ManhattanConnectionRouter();
Connection.setDefaultRouter=function(_28aa){
Connection.defaultRouter=_28aa;
};
Connection.prototype.disconnect=function(){
if(this.sourcePort!=null){
this.sourcePort.detachMoveListener(this);
this.fireSourcePortRouteEvent();
}
if(this.targetPort!=null){
this.targetPort.detachMoveListener(this);
this.fireTargetPortRouteEvent();
}
};
Connection.prototype.reconnect=function(){
if(this.sourcePort!=null){
this.sourcePort.attachMoveListener(this);
this.fireSourcePortRouteEvent();
}
if(this.targetPort!=null){
this.targetPort.attachMoveListener(this);
this.fireTargetPortRouteEvent();
}
};
Connection.prototype.isResizeable=function(){
return false;
};
Connection.prototype.setSourceDecorator=function(_28ab){
this.sourceDecorator=_28ab;
if(this.graphics!=null){
this.paint();
}
};
Connection.prototype.setTargetDecorator=function(_28ac){
this.targetDecorator=_28ac;
if(this.graphics!=null){
this.paint();
}
};
Connection.prototype.setRouter=function(_28ad){
if(_28ad!=null){
this.router=_28ad;
}else{
this.router=new NullConnectionRouter();
}
if(this.graphics!=null){
this.paint();
}
};
Connection.prototype.paint=function(){
if(this.graphics==null){
this.graphics=new jsGraphics(this.id);
}else{
this.graphics.clear();
}
this.graphics.setStroke(this.stroke);
this.graphics.setColor(this.lineColor.getHTMLStyle());
this.startStroke();
this.router.route(this);
if(this.getSource().getParent().isMoving==false&&this.getTarget().getParent().isMoving==false){
if(this.targetDecorator!=null){
this.targetDecorator.paint(new Graphics(this.graphics,this.getEndAngle(),this.getEndPoint()));
}
if(this.sourceDecorator!=null){
this.sourceDecorator.paint(new Graphics(this.graphics,this.getStartAngle(),this.getStartPoint()));
}
}
this.finishStroke();
};
Connection.prototype.startStroke=function(){
this.oldPoint=null;
this.lineSegments=new Array();
};
Connection.prototype.finishStroke=function(){
this.graphics.paint();
this.oldPoint=null;
};
Connection.prototype.addPoint=function(p){
p=new Point(parseInt(p.x),parseInt(p.y));
if(this.oldPoint!=null){
this.graphics.drawLine(this.oldPoint.x,this.oldPoint.y,p.x,p.y);
var line=new Object();
line.start=this.oldPoint;
line.end=p;
this.lineSegments.push(line);
}
this.oldPoint=new Object();
this.oldPoint.x=p.x;
this.oldPoint.y=p.y;
};
Connection.prototype.setSource=function(port){
if(this.sourcePort!=null){
this.sourcePort.detachMoveListener(this);
}
this.sourcePort=port;
if(this.sourcePort==null){
return;
}
this.fireSourcePortRouteEvent();
this.sourcePort.attachMoveListener(this);
this.setStartPoint(port.getAbsoluteX(),port.getAbsoluteY());
};
Connection.prototype.getSource=function(){
return this.sourcePort;
};
Connection.prototype.setTarget=function(port){
if(this.targetPort!=null){
this.targetPort.detachMoveListener(this);
}
this.targetPort=port;
if(this.targetPort==null){
return;
}
this.fireTargetPortRouteEvent();
this.targetPort.attachMoveListener(this);
this.setEndPoint(port.getAbsoluteX(),port.getAbsoluteY());
};
Connection.prototype.getTarget=function(){
return this.targetPort;
};
Connection.prototype.onOtherFigureMoved=function(_28b2){
if(_28b2==this.sourcePort){
this.setStartPoint(this.sourcePort.getAbsoluteX(),this.sourcePort.getAbsoluteY());
}else{
this.setEndPoint(this.targetPort.getAbsoluteX(),this.targetPort.getAbsoluteY());
}
};
Connection.prototype.containsPoint=function(px,py){
for(var i=0;i<this.lineSegments.length;i++){
var line=this.lineSegments[i];
if(Line.hit(line.start.x,line.start.y,line.end.x,line.end.y,px,py)){
return true;
}
}
return false;
};
Connection.prototype.getStartAngle=function(){
var p1=this.lineSegments[0].start;
var p2=this.lineSegments[0].end;
if(this.router instanceof BezierConnectionRouter){
p2=this.lineSegments[5].end;
}
var _28b9=Math.sqrt((p1.x-p2.x)*(p1.x-p2.x)+(p1.y-p2.y)*(p1.y-p2.y));
var angle=-(180/Math.PI)*Math.asin((p1.y-p2.y)/_28b9);
if(angle<0){
if(p2.x<p1.x){
angle=Math.abs(angle)+180;
}else{
angle=360-Math.abs(angle);
}
}else{
if(p2.x<p1.x){
angle=180-angle;
}
}
return angle;
};
Connection.prototype.getEndAngle=function(){
var p1=this.lineSegments[this.lineSegments.length-1].end;
var p2=this.lineSegments[this.lineSegments.length-1].start;
if(this.router instanceof BezierConnectionRouter){
p2=this.lineSegments[this.lineSegments.length-5].end;
}
var _28bd=Math.sqrt((p1.x-p2.x)*(p1.x-p2.x)+(p1.y-p2.y)*(p1.y-p2.y));
var angle=-(180/Math.PI)*Math.asin((p1.y-p2.y)/_28bd);
if(angle<0){
if(p2.x<p1.x){
angle=Math.abs(angle)+180;
}else{
angle=360-Math.abs(angle);
}
}else{
if(p2.x<p1.x){
angle=180-angle;
}
}
return angle;
};
Connection.prototype.fireSourcePortRouteEvent=function(){
var _28bf=this.sourcePort.getConnections();
for(var i=0;i<_28bf.length;i++){
_28bf[i].paint();
}
};
Connection.prototype.fireTargetPortRouteEvent=function(){
var _28c1=this.targetPort.getConnections();
for(var i=0;i<_28c1.length;i++){
_28c1[i].paint();
}
};
ConnectionDecorator=function(){
};
ConnectionDecorator.prototype.type="ConnectionDecorator";
ConnectionDecorator.prototype.paint=function(g){
};
ArrowConnectionDecorator=function(){
};
ArrowConnectionDecorator.prototype=new ConnectionDecorator;
ArrowConnectionDecorator.prototype.type="ArrowConnectionDecorator";
ArrowConnectionDecorator.prototype.paint=function(g){
g.setColor(new Color(255,128,128));
g.fillPolygon([3,20,20,3],[0,5,-5,0]);
g.setColor(new Color(128,128,255));
g.setStroke(1);
g.drawPolygon([3,20,20,3],[0,5,-5,0]);
};
CompartmentFigure=function(){
Figure.call(this);
this.children=new ArrayList();
this.setBorder(new LineBorder(1));
this.dropable=new DropTarget(this.html);
this.dropable.node=this;
this.dropable.addEventListener("figureenter",function(_3a45){
_3a45.target.node.onFigureEnter(_3a45.relatedTarget.node);
});
this.dropable.addEventListener("figureleave",function(_3a46){
_3a46.target.node.onFigureLeave(_3a46.relatedTarget.node);
});
this.dropable.addEventListener("figuredrop",function(_3a47){
_3a47.target.node.onFigureDrop(_3a47.relatedTarget.node);
});
};
CompartmentFigure.prototype=new Figure;
CompartmentFigure.prototype.type="CompartmentFigure";
CompartmentFigure.prototype.onFigureEnter=function(_3a48){
};
CompartmentFigure.prototype.onFigureLeave=function(_3a49){
};
CompartmentFigure.prototype.onFigureDrop=function(_3a4a){
};
CompartmentFigure.prototype.getChildren=function(){
var _3a4b=new Array();
for(var i=0;i<this.children.getSize();i++){
_3a4b.push(this.children.get(i));
}
return _3a4b;
};
CompartmentFigure.prototype.addChild=function(_3a4d){
_3a4d.setZOrder(this.getZOrder()+1);
_3a4d.setParent(this);
if(this.children.indexOf(_3a4d)!=-1){
alert("error");
}
this.children.add(_3a4d);
};
CompartmentFigure.prototype.removeChild=function(_3a4e){
_3a4e.setParent(null);
this.children.remove(_3a4e);
};
CompartmentFigure.prototype.setZOrder=function(index){
Figure.prototype.setZOrder.call(this,index);
for(var i=0;i<this.children.getSize();i++){
this.children.get(i).setZOrder(index+1);
}
};
CompartmentFigure.prototype.setPosition=function(xPos,yPos){
var oldX=this.getX();
var oldY=this.getY();
Figure.prototype.setPosition.call(this,xPos,yPos);
for(var i=0;i<this.children.getSize();i++){
var child=this.children.get(i);
child.setPosition(child.getX()+this.getX()-oldX,child.getY()+this.getY()-oldY);
}
};
CompartmentFigure.prototype.onDrag=function(){
var oldX=this.getX();
var oldY=this.getY();
Figure.prototype.onDrag.call(this);
for(var i=0;i<this.children.getSize();i++){
var child=this.children.get(i);
child.setPosition(child.getX()+this.getX()-oldX,child.getY()+this.getY()-oldY);
}
};
Document=function(_346e){
this.canvas=_346e;
};
Document.prototype.getFigures=function(){
var _346f=new Array();
var _3470=this.canvas.figures;
var _3471=this.canvas.dialogs;
for(var i=0;i<_3470.getSize();i++){
var _3473=_3470.get(i);
if(_3471.indexOf(_3473)==-1&&_3473.getParent()==null&&!(_3473 instanceof Window)){
_346f.push(_3473);
}
}
return _346f;
};
Document.prototype.getLines=function(){
var _3474=new Array();
var lines=this.canvas.getLines();
for(var i=0;i<lines.getSize();i++){
_3474.push(lines.get(i));
}
return _3474;
};
Annotation=function(msg){
this.msg=msg;
this.color=new Color(0,0,0);
this.bgColor=new Color(241,241,121);
this.fontSize=10;
this.textNode=null;
Figure.call(this);
};
Annotation.prototype=new Figure;
Annotation.prototype.type="Annotation";
Annotation.prototype.createHTMLElement=function(){
var item=Figure.prototype.createHTMLElement.call(this);
item.style.color=this.color.getHTMLStyle();
item.style.backgroundColor=this.bgColor.getHTMLStyle();
item.style.fontSize=this.fontSize+"pt";
item.style.width="auto";
item.style.height="auto";
item.style.margin="0px";
item.style.padding="0px";
item.onselectstart=function(){
return false;
};
item.unselectable="on";
item.style.MozUserSelect="none";
item.style.cursor="default";
item.style.zIndex=(Figure.ZOrderIndex-1);
this.textNode=document.createTextNode(this.msg);
item.appendChild(this.textNode);
this.disableTextSelection(item);
return item;
};
Annotation.prototype.onDoubleClick=function(){
var _3a6c=new AnnotationDialog(this);
this.workflow.showDialog(_3a6c);
};
Annotation.prototype.setBackgroundColor=function(color){
this.bgColor=color;
if(this.bgColor!=null){
this.html.style.backgroundColor=this.bgColor.getHTMLStyle();
}else{
this.html.style.backgroundColor="transparent";
}
};
Annotation.prototype.getBackgroundColor=function(){
return this.bgColor;
};
Annotation.prototype.setFontSize=function(size){
this.fontSize=size;
this.html.style.fontSize=this.fontSize+"pt";
};
Annotation.prototype.getText=function(){
return this.msg;
};
Annotation.prototype.setText=function(text){
this.msg=text;
this.html.removeChild(this.textNode);
this.textNode=document.createTextNode(this.msg);
this.html.appendChild(this.textNode);
};
Annotation.prototype.setStyledText=function(text){
this.msg=text;
this.html.removeChild(this.textNode);
this.textNode=document.createElement("div");
this.textNode.innerHTML=text;
this.html.appendChild(this.textNode);
};
ResizeHandle=function(_2894,type){
Rectangle.call(this,5,5);
this.type=type;
var _2896=this.getWidth();
var _2897=_2896/2;
switch(this.type){
case 1:
this.setSnapToGridAnchor(new Point(_2896,_2896));
break;
case 2:
this.setSnapToGridAnchor(new Point(_2897,_2896));
break;
case 3:
this.setSnapToGridAnchor(new Point(0,_2896));
break;
case 4:
this.setSnapToGridAnchor(new Point(0,_2897));
break;
case 5:
this.setSnapToGridAnchor(new Point(0,0));
break;
case 6:
this.setSnapToGridAnchor(new Point(_2897,0));
break;
case 7:
this.setSnapToGridAnchor(new Point(_2896,0));
break;
case 8:
this.setSnapToGridAnchor(new Point(_2896,_2897));
break;
}
this.setBackgroundColor(new Color(0,255,0));
this.setWorkflow(_2894);
this.setZOrder(10000);
};
ResizeHandle.prototype=new Rectangle;
ResizeHandle.prototype.type="ResizeHandle";
ResizeHandle.prototype.getSnapToDirection=function(){
switch(this.type){
case 1:
return SnapToHelper.NORTH_WEST;
case 2:
return SnapToHelper.NORTH;
case 3:
return SnapToHelper.NORTH_EAST;
case 4:
return SnapToHelper.EAST;
case 5:
return SnapToHelper.SOUTH_EAST;
case 6:
return SnapToHelper.SOUTH;
case 7:
return SnapToHelper.SOUTH_WEST;
case 8:
return SnapToHelper.WEST;
}
};
ResizeHandle.prototype.onDragend=function(){
if(this.commandMove==null){
return;
}
var _2898=this.workflow.currentSelection;
this.commandMove.setPosition(_2898.getX(),_2898.getY());
this.commandResize.setDimension(_2898.getWidth(),_2898.getHeight());
this.workflow.getCommandStack().execute(this.commandResize);
this.workflow.getCommandStack().execute(this.commandMove);
this.commandMove=null;
this.commandResize=null;
this.workflow.hideSnapToHelperLines();
};
ResizeHandle.prototype.setPosition=function(xPos,yPos){
this.x=xPos;
this.y=yPos;
this.html.style.left=this.x+"px";
this.html.style.top=this.y+"px";
};
ResizeHandle.prototype.onDragstart=function(x,y){
if(!this.canDrag){
return false;
}
var _289d=this.workflow.currentSelection;
this.commandMove=new CommandMove(_289d,_289d.getX(),_289d.getY());
this.commandResize=new CommandResize(_289d,_289d.getWidth(),_289d.getHeight());
return true;
};
ResizeHandle.prototype.onDrag=function(){
var oldX=this.getX();
var oldY=this.getY();
Rectangle.prototype.onDrag.call(this);
var diffX=oldX-this.getX();
var diffY=oldY-this.getY();
var _28a2=this.workflow.currentSelection.getX();
var _28a3=this.workflow.currentSelection.getY();
var _28a4=this.workflow.currentSelection.getWidth();
var _28a5=this.workflow.currentSelection.getHeight();
switch(this.type){
case 1:
this.workflow.currentSelection.setPosition(_28a2-diffX,_28a3-diffY);
this.workflow.currentSelection.setDimension(_28a4+diffX,_28a5+diffY);
break;
case 2:
this.workflow.currentSelection.setPosition(_28a2,_28a3-diffY);
this.workflow.currentSelection.setDimension(_28a4,_28a5+diffY);
break;
case 3:
this.workflow.currentSelection.setPosition(_28a2,_28a3-diffY);
this.workflow.currentSelection.setDimension(_28a4-diffX,_28a5+diffY);
break;
case 4:
this.workflow.currentSelection.setPosition(_28a2,_28a3);
this.workflow.currentSelection.setDimension(_28a4-diffX,_28a5);
break;
case 5:
this.workflow.currentSelection.setPosition(_28a2,_28a3);
this.workflow.currentSelection.setDimension(_28a4-diffX,_28a5-diffY);
break;
case 6:
this.workflow.currentSelection.setPosition(_28a2,_28a3);
this.workflow.currentSelection.setDimension(_28a4,_28a5-diffY);
break;
case 7:
this.workflow.currentSelection.setPosition(_28a2-diffX,_28a3);
this.workflow.currentSelection.setDimension(_28a4+diffX,_28a5-diffY);
break;
case 8:
this.workflow.currentSelection.setPosition(_28a2-diffX,_28a3);
this.workflow.currentSelection.setDimension(_28a4+diffX,_28a5);
break;
}
this.workflow.moveResizeHandles(this.workflow.getCurrentSelection());
};
ResizeHandle.prototype.setCanDrag=function(flag){
Rectangle.prototype.setCanDrag.call(this,flag);
if(!flag){
this.html.style.cursor="";
return;
}
switch(this.type){
case 1:
this.html.style.cursor="nw-resize";
break;
case 2:
this.html.style.cursor="n-resize";
break;
case 3:
this.html.style.cursor="ne-resize";
break;
case 4:
this.html.style.cursor="w-resize";
break;
case 5:
this.html.style.cursor="nw-resize";
break;
case 6:
this.html.style.cursor="n-resize";
break;
case 7:
this.html.style.cursor="ne-resize";
break;
case 8:
this.html.style.cursor="w-resize";
break;
}
};
ResizeHandle.prototype.onKeyDown=function(_28a7,ctrl){
this.workflow.onKeyDown(_28a7,ctrl);
};
ResizeHandle.prototype.fireMoveEvent=function(){
};
LineStartResizeHandle=function(_3ac2){
Rectangle.call(this);
this.setDimension(5,5);
this.setBackgroundColor(new Color(0,255,0));
this.setWorkflow(_3ac2);
this.setZOrder(10000);
};
LineStartResizeHandle.prototype=new Rectangle;
LineStartResizeHandle.prototype.type="LineStartResizeHandle";
LineStartResizeHandle.prototype.onDragend=function(){
if(this.command==null){
return;
}
var line=this.workflow.currentSelection;
var x1=line.getStartX();
var y1=line.getStartY();
var x2=line.getEndX();
var y2=line.getEndY();
this.command.setEndPoints(x1,y1,x2,y2);
this.workflow.getCommandStack().execute(this.command);
this.command=null;
};
LineStartResizeHandle.prototype.onDragstart=function(x,y){
if(!this.canDrag){
return false;
}
var line=this.workflow.currentSelection;
var x1=line.getStartX();
var y1=line.getStartY();
var x2=line.getEndX();
var y2=line.getEndY();
this.command=new CommandMoveLine(line,x1,y1,x2,y2);
return true;
};
LineStartResizeHandle.prototype.onDrag=function(){
var oldX=this.getX();
var oldY=this.getY();
Rectangle.prototype.onDrag.call(this);
var diffX=oldX-this.getX();
var diffY=oldY-this.getY();
var _3ad3=this.workflow.currentSelection.getStartX();
var _3ad4=this.workflow.currentSelection.getStartY();
this.workflow.currentSelection.setStartPoint(_3ad3-diffX,_3ad4-diffY);
};
LineStartResizeHandle.prototype.onKeyDown=function(_3ad5,ctrl){
if(this.workflow!=null){
this.workflow.onKeyDown(_3ad5,ctrl);
}
};
LineEndResizeHandle=function(_3918){
Rectangle.call(this);
this.setDimension(5,5);
this.setBackgroundColor(new Color(0,255,0));
this.setWorkflow(_3918);
this.setZOrder(10000);
};
LineEndResizeHandle.prototype=new Rectangle;
LineEndResizeHandle.prototype.type="LineEndResizeHandle";
LineEndResizeHandle.prototype.onDragend=function(){
if(this.command==null){
return;
}
var line=this.workflow.currentSelection;
var x1=line.getStartX();
var y1=line.getStartY();
var x2=line.getEndX();
var y2=line.getEndY();
this.command.setEndPoints(x1,y1,x2,y2);
this.workflow.getCommandStack().execute(this.command);
this.command=null;
};
LineEndResizeHandle.prototype.onDragstart=function(x,y){
if(!this.canDrag){
return false;
}
var line=this.workflow.currentSelection;
var x1=line.getStartX();
var y1=line.getStartY();
var x2=line.getEndX();
var y2=line.getEndY();
this.command=new CommandMoveLine(line,x1,y1,x2,y2);
return true;
};
LineEndResizeHandle.prototype.onDrag=function(){
var oldX=this.getX();
var oldY=this.getY();
Rectangle.prototype.onDrag.call(this);
var diffX=oldX-this.getX();
var diffY=oldY-this.getY();
var _3929=this.workflow.currentSelection.getEndX();
var _392a=this.workflow.currentSelection.getEndY();
this.workflow.currentSelection.setEndPoint(_3929-diffX,_392a-diffY);
};
LineEndResizeHandle.prototype.onKeyDown=function(_392b){
if(this.workflow!=null){
this.workflow.onKeyDown(_392b);
}
};
Canvas=function(_3862){
if(_3862){
this.construct(_3862);
}
this.enableSmoothFigureHandling=false;
};
Canvas.prototype.type="Canvas";
Canvas.prototype.construct=function(_3863){
this.canvasId=_3863;
this.html=document.getElementById(this.canvasId);
this.scrollArea=document.body.parentNode;
};
Canvas.prototype.setViewPort=function(divId){
this.scrollArea=document.getElementById(divId);
};
Canvas.prototype.addFigure=function(_3865,xPos,yPos,_3868){
if(this.enableSmoothFigureHandling==true){
if(_3865.timer<=0){
_3865.setAlpha(0.001);
}
var _3869=_3865;
var _386a=function(){
if(_3869.alpha<1){
_3869.setAlpha(Math.min(1,_3869.alpha+0.05));
}else{
window.clearInterval(_3869.timer);
_3869.timer=-1;
}
};
if(_3869.timer>0){
window.clearInterval(_3869.timer);
}
_3869.timer=window.setInterval(_386a,30);
}
_3865.setCanvas(this);
if(xPos&&yPos){
_3865.setPosition(xPos,yPos);
}
this.html.appendChild(_3865.getHTMLElement());
if(!_3868){
_3865.paint();
}
};
Canvas.prototype.removeFigure=function(_386b){
if(this.enableSmoothFigureHandling==true){
var oThis=this;
var _386d=_386b;
var _386e=function(){
if(_386d.alpha>0){
_386d.setAlpha(Math.max(0,_386d.alpha-0.05));
}else{
window.clearInterval(_386d.timer);
_386d.timer=-1;
oThis.html.removeChild(_386d.html);
_386d.setCanvas(null);
}
};
if(_386d.timer>0){
window.clearInterval(_386d.timer);
}
_386d.timer=window.setInterval(_386e,20);
}else{
this.html.removeChild(_386b.html);
_386b.setCanvas(null);
}
};
Canvas.prototype.getEnableSmoothFigureHandling=function(){
return this.enableSmoothFigureHandling;
};
Canvas.prototype.setEnableSmoothFigureHandling=function(flag){
this.enableSmoothFigureHandling=flag;
};
Canvas.prototype.getWidth=function(){
return parseInt(this.html.style.width);
};
Canvas.prototype.getHeight=function(){
return parseInt(this.html.style.height);
};
Canvas.prototype.setBackgroundImage=function(_3870,_3871){
if(_3871){
this.html.style.background="transparent url("+_3870+") ";
}else{
this.html.style.background="transparent url("+_3870+") no-repeat";
}
};
Canvas.prototype.getY=function(){
return this.y;
};
Canvas.prototype.getX=function(){
return this.x;
};
Canvas.prototype.getAbsoluteY=function(){
var el=this.html;
var ot=el.offsetTop;
while((el=el.offsetParent)!=null){
ot+=el.offsetTop;
}
return ot;
};
Canvas.prototype.getAbsoluteX=function(){
var el=this.html;
var ol=el.offsetLeft;
while((el=el.offsetParent)!=null){
ol+=el.offsetLeft;
}
return ol;
};
Canvas.prototype.getScrollLeft=function(){
return this.scrollArea.scrollLeft;
};
Canvas.prototype.getScrollTop=function(){
return this.scrollArea.scrollTop;
};
Workflow=function(id){
if(!id){
return;
}
this.gridWidthX=10;
this.gridWidthY=10;
this.snapToGridHelper=null;
this.verticalSnapToHelperLine=null;
this.horizontalSnapToHelperLine=null;
this.figures=new ArrayList();
this.lines=new ArrayList();
this.commonPorts=new ArrayList();
this.dropTargets=new ArrayList();
this.compartments=new ArrayList();
this.selectionListeners=new ArrayList();
this.dialogs=new ArrayList();
this.toolPalette=null;
this.dragging=false;
this.commandStack=new CommandStack();
this.oldScrollPosLeft=0;
this.oldScrollPosTop=0;
this.currentSelection=null;
this.currentMenu=null;
this.connectionLine=new Line();
this.resizeHandleStart=new LineStartResizeHandle(this);
this.resizeHandleEnd=new LineEndResizeHandle(this);
this.resizeHandle1=new ResizeHandle(this,1);
this.resizeHandle2=new ResizeHandle(this,2);
this.resizeHandle3=new ResizeHandle(this,3);
this.resizeHandle4=new ResizeHandle(this,4);
this.resizeHandle5=new ResizeHandle(this,5);
this.resizeHandle6=new ResizeHandle(this,6);
this.resizeHandle7=new ResizeHandle(this,7);
this.resizeHandle8=new ResizeHandle(this,8);
this.resizeHandleHalfWidth=parseInt(this.resizeHandle2.getWidth()/2);
Canvas.call(this,id);
this.setPanning(false);
if(this.html!=null){
// this.html.style.backgroundImage="url(grid_10.png)";
oThis=this;
this.html.tabIndex="0";
var _3adc=function(){
var _3add=arguments[0]||window.event;
var diffX=_3add.clientX;
var diffY=_3add.clientY;
var _3ae0=oThis.getScrollLeft();
var _3ae1=oThis.getScrollTop();
var _3ae2=oThis.getAbsoluteX();
var _3ae3=oThis.getAbsoluteY();
if(oThis.getBestFigure(diffX+_3ae0-_3ae2,diffY+_3ae1-_3ae3)!=null){
return;
}
var line=oThis.getBestLine(diffX+_3ae0-_3ae2,diffY+_3ae1-_3ae3,null);
if(line!=null){
line.onContextMenu(diffX+_3ae0-_3ae2,diffY+_3ae1-_3ae3);
}else{
oThis.onContextMenu(diffX+_3ae0-_3ae2,diffY+_3ae1-_3ae3);
}
};
this.html.oncontextmenu=function(){
return false;
};
var oThis=this;
var _3ae6=function(event){
var ctrl=event.ctrlKey;
oThis.onKeyDown(event.keyCode,ctrl);
};
var _3ae9=function(){
var _3aea=arguments[0]||window.event;
var diffX=_3aea.clientX;
var diffY=_3aea.clientY;
var _3aed=oThis.getScrollLeft();
var _3aee=oThis.getScrollTop();
var _3aef=oThis.getAbsoluteX();
var _3af0=oThis.getAbsoluteY();
oThis.onMouseDown(diffX+_3aed-_3aef,diffY+_3aee-_3af0);
};
var _3af1=function(){
var _3af2=arguments[0]||window.event;
if(oThis.currentMenu!=null){
oThis.removeFigure(oThis.currentMenu);
oThis.currentMenu=null;
}
if(_3af2.button==2){
return;
}
var diffX=_3af2.clientX;
var diffY=_3af2.clientY;
var _3af5=oThis.getScrollLeft();
var _3af6=oThis.getScrollTop();
var _3af7=oThis.getAbsoluteX();
var _3af8=oThis.getAbsoluteY();
oThis.onMouseUp(diffX+_3af5-_3af7,diffY+_3af6-_3af8);
};
var _3af9=function(){
var _3afa=arguments[0]||window.event;
if(Drag.currentHover!=null){
var _3afb=new DragDropEvent();
_3afb.initDragDropEvent("mouseleave",false,oThis);
Drag.currentHover.dispatchEvent(_3afb);
Drag.currentHover=null;
}else{
var diffX=_3afa.clientX;
var diffY=_3afa.clientY;
var _3afe=oThis.getScrollLeft();
var _3aff=oThis.getScrollTop();
var _3b00=oThis.getAbsoluteX();
var _3b01=oThis.getAbsoluteY();
oThis.onMouseMove(diffX+_3afe-_3b00,diffY+_3aff-_3b01);
}
};
var _3b02=function(_3b03){
var _3b03=arguments[0]||window.event;
var diffX=_3b03.clientX;
var diffY=_3b03.clientY;
var _3b06=oThis.getScrollLeft();
var _3b07=oThis.getScrollTop();
var _3b08=oThis.getAbsoluteX();
var _3b09=oThis.getAbsoluteY();
var line=oThis.getBestLine(diffX+_3b06-_3b08,diffY+_3b07-_3b09,null);
if(line!=null){
line.onDoubleClick();
}
};
if(this.html.addEventListener){
this.html.addEventListener("contextmenu",_3adc,false);
this.html.addEventListener("mousemove",_3af9,false);
this.html.addEventListener("mouseup",_3af1,false);
this.html.addEventListener("mousedown",_3ae9,false);
this.html.addEventListener("keydown",_3ae6,false);
this.html.addEventListener("dblclick",_3b02,false);
}else{
if(this.html.attachEvent){
this.html.attachEvent("oncontextmenu",_3adc);
this.html.attachEvent("onmousemove",_3af9);
this.html.attachEvent("onmousedown",_3ae9);
this.html.attachEvent("onmouseup",_3af1);
this.html.attachEvent("onkeydown",_3ae6);
this.html.attachEvent("ondblclick",_3b02);
}else{
throw new Error("Open-jACOB.Graphics not supported in this browser.");
}
}
}
};
Workflow.prototype=new Canvas;
Workflow.prototype.type="Workflow";
Workflow.prototype.onScroll=function(){
var _3b0b=this.getScrollLeft();
var _3b0c=this.getScrollTop();
var _3b0d=_3b0b-this.oldScrollPosLeft;
var _3b0e=_3b0c-this.oldScrollPosTop;
for(var i=0;i<this.figures.getSize();i++){
var _3b10=this.figures.get(i);
if(_3b10.hasFixedPosition&&_3b10.hasFixedPosition()==true){
_3b10.setPosition(_3b10.getX()+_3b0d,_3b10.getY()+_3b0e);
}
}
this.oldScrollPosLeft=_3b0b;
this.oldScrollPosTop=_3b0c;
};
Workflow.prototype.setPanning=function(flag){
this.panning=flag;
if(flag){
this.html.style.cursor="move";
}else{
this.html.style.cursor="default";
}
};
Workflow.prototype.scrollTo=function(x,y,fast){
if(fast){
this.scrollArea.scrollLeft=x;
this.scrollArea.scrollTop=y;
}else{
var steps=40;
var xStep=(x-this.getScrollLeft())/steps;
var yStep=(y-this.getScrollTop())/steps;
var oldX=this.getScrollLeft();
var oldY=this.getScrollTop();
for(var i=0;i<steps;i++){
this.scrollArea.scrollLeft=oldX+(xStep*i);
this.scrollArea.scrollTop=oldY+(yStep*i);
}
}
};
Workflow.prototype.showDialog=function(_3b1b,xPos,yPos){
if(xPos){
this.addFigure(_3b1b,xPos,yPos);
}else{
this.addFigure(_3b1b,200,100);
}
this.dialogs.add(_3b1b);
};
Workflow.prototype.showMenu=function(menu,xPos,yPos){
if(this.menu!=null){
this.html.removeChild(this.menu.getHTMLElement());
this.menu.setWorkflow();
}
this.menu=menu;
if(this.menu!=null){
this.menu.setWorkflow(this);
this.menu.setPosition(xPos,yPos);
this.html.appendChild(this.menu.getHTMLElement());
this.menu.paint();
}
};
Workflow.prototype.onContextMenu=function(x,y){
var menu=this.getContextMenu();
if(menu!=null){
this.showMenu(menu,x,y);
}
};
Workflow.prototype.getContextMenu=function(){
return null;
};
Workflow.prototype.setToolWindow=function(_3b24,x,y){
this.toolPalette=_3b24;
if(y){
this.addFigure(_3b24,x,y);
}else{
this.addFigure(_3b24,20,20);
}
this.dialogs.add(_3b24);
};
Workflow.prototype.setSnapToGrid=function(flag){
if(flag){
this.snapToGridHelper=new SnapToGrid(this);
}else{
this.snapToGridHelper=null;
}
};
Workflow.prototype.setSnapToGeometry=function(flag){
if(flag){
this.snapToGeometryHelper=new SnapToGeometry(this);
}else{
this.snapToGeometryHelper=null;
}
};
Workflow.prototype.setGridWidth=function(dx,dy){
this.gridWidthX=dx;
this.gridWidthY=dy;
};
Workflow.prototype.addFigure=function(_3b2b,xPos,yPos){
_3b2b.setWorkflow(this);
Canvas.prototype.addFigure.call(this,_3b2b,xPos,yPos,true);
var _3b2e=this;
if(_3b2b instanceof CompartmentFigure){
this.compartments.add(_3b2b);
}
if(_3b2b instanceof Line){
this.lines.add(_3b2b);
}else{
this.figures.add(_3b2b);
_3b2b.draggable.addEventListener("dragend",function(_3b2f){
});
_3b2b.draggable.addEventListener("dragstart",function(_3b30){
var _3b31=_3b2e.getFigure(_3b30.target.element.id);
if(_3b31==null){
return;
}
if(_3b31.isSelectable()==false){
return;
}
_3b2e.showResizeHandles(_3b31);
_3b2e.setCurrentSelection(_3b31);
});
_3b2b.draggable.addEventListener("drag",function(_3b32){
var _3b33=_3b2e.getFigure(_3b32.target.element.id);
if(_3b33==null){
return;
}
if(_3b33.isSelectable()==false){
return;
}
_3b2e.moveResizeHandles(_3b33);
});
}
_3b2b.paint();
this.setDocumentDirty();
};
Workflow.prototype.removeFigure=function(_3b34){
Canvas.prototype.removeFigure.call(this,_3b34);
this.figures.remove(_3b34);
this.lines.remove(_3b34);
this.dialogs.remove(_3b34);
_3b34.setWorkflow(null);
if(_3b34 instanceof CompartmentFigure){
this.compartments.remove(_3b34);
}
if(_3b34 instanceof Connection){
_3b34.disconnect();
}
if(this.currentSelection==_3b34){
this.setCurrentSelection(null);
}
this.setDocumentDirty();
};
Workflow.prototype.moveFront=function(_3b35){
this.html.removeChild(_3b35.getHTMLElement());
this.html.appendChild(_3b35.getHTMLElement());
};
Workflow.prototype.moveBack=function(_3b36){
this.html.removeChild(_3b36.getHTMLElement());
this.html.insertBefore(_3b36.getHTMLElement(),this.html.firstChild);
};
Workflow.prototype.getBestCompartmentFigure=function(x,y,_3b39){
var _3b3a=null;
for(var i=0;i<this.figures.getSize();i++){
var _3b3c=this.figures.get(i);
if((_3b3c instanceof CompartmentFigure)&&_3b3c.isOver(x,y)==true&&_3b3c!=_3b39){
if(_3b3a==null){
_3b3a=_3b3c;
}else{
if(_3b3a.getZOrder()<_3b3c.getZOrder()){
_3b3a=_3b3c;
}
}
}
}
return _3b3a;
};
Workflow.prototype.getBestFigure=function(x,y,_3b3f){
var _3b40=null;
for(var i=0;i<this.figures.getSize();i++){
var _3b42=this.figures.get(i);
if(_3b42.isOver(x,y)==true&&_3b42!=_3b3f){
if(_3b40==null){
_3b40=_3b42;
}else{
if(_3b40.getZOrder()<_3b42.getZOrder()){
_3b40=_3b42;
}
}
}
}
return _3b40;
};
Workflow.prototype.getBestLine=function(x,y,_3b45){
var _3b46=null;
for(var i=0;i<this.lines.getSize();i++){
var line=this.lines.get(i);
if(line.containsPoint(x,y)==true&&line!=_3b45){
if(_3b46==null){
_3b46=line;
}else{
if(_3b46.getZOrder()<line.getZOrder()){
_3b46=line;
}
}
}
}
return _3b46;
};
Workflow.prototype.getFigure=function(id){
for(var i=0;i<this.figures.getSize();i++){
var _3b4b=this.figures.get(i);
if(_3b4b.id==id){
return _3b4b;
}
}
return null;
};
Workflow.prototype.getFigures=function(){
return this.figures;
};
Workflow.prototype.getDocument=function(){
return new Document(this);
};
Workflow.prototype.addSelectionListener=function(w){
this.selectionListeners.add(w);
};
Workflow.prototype.removeSelectionListener=function(w){
this.selectionListeners.remove(w);
};
Workflow.prototype.setCurrentSelection=function(_3b4e){
if(_3b4e==null){
this.hideResizeHandles();
this.hideLineResizeHandles();
}
this.currentSelection=_3b4e;
for(var i=0;i<this.selectionListeners.getSize();i++){
var w=this.selectionListeners.get(i);
if(w!=null&&w.onSelectionChanged){
w.onSelectionChanged(this.currentSelection);
}
}
};
Workflow.prototype.getCurrentSelection=function(){
return this.currentSelection;
};
Workflow.prototype.getLines=function(){
return this.lines;
};
Workflow.prototype.registerPort=function(port){
this.commonPorts.add(port);
port.draggable.targets=this.dropTargets;
this.dropTargets.add(port.dropable);
};
Workflow.prototype.unregisterPort=function(port){
port.targets=null;
this.commonPorts.remove(port);
this.dropTargets.remove(port);
};
Workflow.prototype.getCommandStack=function(){
return this.commandStack;
};
Workflow.prototype.showConnectionLine=function(x1,y1,x2,y2){
this.connectionLine.setStartPoint(x1,y1);
this.connectionLine.setEndPoint(x2,y2);
if(this.connectionLine.canvas==null){
Canvas.prototype.addFigure.call(this,this.connectionLine);
}
};
Workflow.prototype.hideConnectionLine=function(){
if(this.connectionLine.canvas!=null){
Canvas.prototype.removeFigure.call(this,this.connectionLine);
}
};
Workflow.prototype.showLineResizeHandles=function(_3b57){
var _3b58=this.resizeHandleStart.getWidth()/2;
var _3b59=this.resizeHandleStart.getHeight()/2;
Canvas.prototype.addFigure.call(this,this.resizeHandleStart,_3b57.getStartX()-_3b58,_3b57.getStartY()-_3b58);
Canvas.prototype.addFigure.call(this,this.resizeHandleEnd,_3b57.getEndX()-_3b58,_3b57.getEndY()-_3b58);
this.resizeHandleStart.setCanDrag(_3b57.isResizeable());
this.resizeHandleEnd.setCanDrag(_3b57.isResizeable());
if(_3b57.isResizeable()){
var green=new Color(0,255,0);
this.resizeHandleStart.setBackgroundColor(green);
this.resizeHandleEnd.setBackgroundColor(green);
}else{
this.resizeHandleStart.setBackgroundColor(null);
this.resizeHandleEnd.setBackgroundColor(null);
}
};
Workflow.prototype.hideLineResizeHandles=function(){
if(this.resizeHandleStart.canvas!=null){
Canvas.prototype.removeFigure.call(this,this.resizeHandleStart);
}
if(this.resizeHandleEnd.canvas!=null){
Canvas.prototype.removeFigure.call(this,this.resizeHandleEnd);
}
};
Workflow.prototype.showResizeHandles=function(_3b5b){
this.hideLineResizeHandles();
this.hideResizeHandles();
if(this.getEnableSmoothFigureHandling()==true&&this.getCurrentSelection()!=_3b5b){
this.resizeHandle1.setAlpha(0.01);
this.resizeHandle2.setAlpha(0.01);
this.resizeHandle3.setAlpha(0.01);
this.resizeHandle4.setAlpha(0.01);
this.resizeHandle5.setAlpha(0.01);
this.resizeHandle6.setAlpha(0.01);
this.resizeHandle7.setAlpha(0.01);
this.resizeHandle8.setAlpha(0.01);
}
var _3b5c=this.resizeHandle1.getWidth();
var _3b5d=this.resizeHandle1.getHeight();
var _3b5e=_3b5b.getHeight();
var _3b5f=_3b5b.getWidth();
var xPos=_3b5b.getX();
var yPos=_3b5b.getY();
Canvas.prototype.addFigure.call(this,this.resizeHandle1,xPos-_3b5c,yPos-_3b5d);
Canvas.prototype.addFigure.call(this,this.resizeHandle3,xPos+_3b5f,yPos-_3b5d);
Canvas.prototype.addFigure.call(this,this.resizeHandle5,xPos+_3b5f,yPos+_3b5e);
Canvas.prototype.addFigure.call(this,this.resizeHandle7,xPos-_3b5c,yPos+_3b5e);
this.resizeHandle1.setCanDrag(_3b5b.isResizeable());
this.resizeHandle3.setCanDrag(_3b5b.isResizeable());
this.resizeHandle5.setCanDrag(_3b5b.isResizeable());
this.resizeHandle7.setCanDrag(_3b5b.isResizeable());
if(_3b5b.isResizeable()){
var green=new Color(0,255,0);
this.resizeHandle1.setBackgroundColor(green);
this.resizeHandle3.setBackgroundColor(green);
this.resizeHandle5.setBackgroundColor(green);
this.resizeHandle7.setBackgroundColor(green);
}else{
this.resizeHandle1.setBackgroundColor(null);
this.resizeHandle3.setBackgroundColor(null);
this.resizeHandle5.setBackgroundColor(null);
this.resizeHandle7.setBackgroundColor(null);
}
if(_3b5b.isStrechable()&&_3b5b.isResizeable()){
Canvas.prototype.addFigure.call(this,this.resizeHandle2,xPos+(_3b5f/2)-this.resizeHandleHalfWidth,yPos-_3b5d);
Canvas.prototype.addFigure.call(this,this.resizeHandle4,xPos+_3b5f,yPos+(_3b5e/2)-(_3b5d/2));
Canvas.prototype.addFigure.call(this,this.resizeHandle6,xPos+(_3b5f/2)-this.resizeHandleHalfWidth,yPos+_3b5e);
Canvas.prototype.addFigure.call(this,this.resizeHandle8,xPos-_3b5c,yPos+(_3b5e/2)-(_3b5d/2));
}
};
Workflow.prototype.hideResizeHandles=function(){
if(this.resizeHandle1.canvas!=null){
Canvas.prototype.removeFigure.call(this,this.resizeHandle1);
}
if(this.resizeHandle2.canvas!=null){
Canvas.prototype.removeFigure.call(this,this.resizeHandle2);
}
if(this.resizeHandle3.canvas!=null){
Canvas.prototype.removeFigure.call(this,this.resizeHandle3);
}
if(this.resizeHandle4.canvas!=null){
Canvas.prototype.removeFigure.call(this,this.resizeHandle4);
}
if(this.resizeHandle5.canvas!=null){
Canvas.prototype.removeFigure.call(this,this.resizeHandle5);
}
if(this.resizeHandle6.canvas!=null){
Canvas.prototype.removeFigure.call(this,this.resizeHandle6);
}
if(this.resizeHandle7.canvas!=null){
Canvas.prototype.removeFigure.call(this,this.resizeHandle7);
}
if(this.resizeHandle8.canvas!=null){
Canvas.prototype.removeFigure.call(this,this.resizeHandle8);
}
};
Workflow.prototype.moveResizeHandles=function(_3b63){
var _3b64=this.resizeHandle1.getWidth();
var _3b65=this.resizeHandle1.getHeight();
var _3b66=_3b63.getHeight();
var _3b67=_3b63.getWidth();
var xPos=_3b63.getX();
var yPos=_3b63.getY();
this.resizeHandle1.setPosition(xPos-_3b64,yPos-_3b65);
this.resizeHandle3.setPosition(xPos+_3b67,yPos-_3b65);
this.resizeHandle5.setPosition(xPos+_3b67,yPos+_3b66);
this.resizeHandle7.setPosition(xPos-_3b64,yPos+_3b66);
if(_3b63.isStrechable()){
this.resizeHandle2.setPosition(xPos+(_3b67/2)-this.resizeHandleHalfWidth,yPos-_3b65);
this.resizeHandle4.setPosition(xPos+_3b67,yPos+(_3b66/2)-(_3b65/2));
this.resizeHandle6.setPosition(xPos+(_3b67/2)-this.resizeHandleHalfWidth,yPos+_3b66);
this.resizeHandle8.setPosition(xPos-_3b64,yPos+(_3b66/2)-(_3b65/2));
}
};
Workflow.prototype.onMouseDown=function(x,y){
this.dragging=true;
this.mouseDownPosX=x;
this.mouseDownPosY=y;
if(this.toolPalette!=null&&this.toolPalette.getActiveTool()!=null){
this.toolPalette.getActiveTool().execute(x,y);
}
this.setCurrentSelection(null);
this.showMenu(null);
for(var i=0;i<this.getLines().getSize();i++){
var line=this.lines.get(i);
if(line.containsPoint(x,y)&&line.isSelectable()){
this.hideResizeHandles();
this.setCurrentSelection(line);
this.showLineResizeHandles(this.currentSelection);
break;
}
}
};
Workflow.prototype.onMouseUp=function(x,y){
this.dragging=false;
};
Workflow.prototype.onMouseMove=function(x,y){
if(this.dragging==true&&this.panning==true){
var diffX=x-this.mouseDownPosX;
var diffY=y-this.mouseDownPosY;
this.scrollTo(this.getScrollLeft()-diffX,this.getScrollTop()-diffY,true);
this.onScroll();
}
};
Workflow.prototype.onKeyDown=function(_3b74,ctrl){
if(_3b74==46&&this.currentSelection!=null&&this.currentSelection.isDeleteable()){
this.commandStack.execute(new CommandDelete(this.currentSelection));
}else{
if(_3b74==90&&ctrl){
this.commandStack.undo();
}else{
if(_3b74==89&&ctrl){
this.commandStack.redo();
}
}
}
};
Workflow.prototype.setDocumentDirty=function(){
for(var i=0;i<this.dialogs.getSize();i++){
var d=this.dialogs.get(i);
if(d!=null&&d.onSetDocumentDirty){
d.onSetDocumentDirty();
}
}
if(this.snapToGeometryHelper!=null){
this.snapToGeometryHelper.onSetDocumentDirty();
}
if(this.snapToGridHelper!=null){
this.snapToGridHelper.onSetDocumentDirty();
}
};
Workflow.prototype.snapToHelper=function(_3b78,pos){
if(this.snapToGeometryHelper!=null){
if(_3b78 instanceof ResizeHandle){
var _3b7a=_3b78.getSnapToGridAnchor();
pos.x+=_3b7a.x;
pos.y+=_3b7a.y;
var _3b7b=new Point(pos.x,pos.y);
var _3b7c=_3b78.getSnapToDirection();
var _3b7d=this.snapToGeometryHelper.snapPoint(_3b7c,pos,_3b7b);
if((_3b7c&SnapToHelper.EAST_WEST)&&!(_3b7d&SnapToHelper.EAST_WEST)){
this.showSnapToHelperLineVertical(_3b7b.x);
}else{
this.hideSnapToHelperLineVertical();
}
if((_3b7c&SnapToHelper.NORTH_SOUTH)&&!(_3b7d&SnapToHelper.NORTH_SOUTH)){
this.showSnapToHelperLineHorizontal(_3b7b.y);
}else{
this.hideSnapToHelperLineHorizontal();
}
_3b7b.x-=_3b7a.x;
_3b7b.y-=_3b7a.y;
return _3b7b;
}else{
var _3b7e=new Dimension(pos.x,pos.y,_3b78.getWidth(),_3b78.getHeight());
var _3b7b=new Dimension(pos.x,pos.y,_3b78.getWidth(),_3b78.getHeight());
var _3b7c=SnapToHelper.NSEW;
var _3b7d=this.snapToGeometryHelper.snapRectangle(_3b7e,_3b7b);
if((_3b7c&SnapToHelper.WEST)&&!(_3b7d&SnapToHelper.WEST)){
this.showSnapToHelperLineVertical(_3b7b.x);
}else{
if((_3b7c&SnapToHelper.EAST)&&!(_3b7d&SnapToHelper.EAST)){
this.showSnapToHelperLineVertical(_3b7b.getX()+_3b7b.getWidth());
}else{
this.hideSnapToHelperLineVertical();
}
}
if((_3b7c&SnapToHelper.NORTH)&&!(_3b7d&SnapToHelper.NORTH)){
this.showSnapToHelperLineHorizontal(_3b7b.y);
}else{
if((_3b7c&SnapToHelper.SOUTH)&&!(_3b7d&SnapToHelper.SOUTH)){
this.showSnapToHelperLineHorizontal(_3b7b.getY()+_3b7b.getHeight());
}else{
this.hideSnapToHelperLineHorizontal();
}
}
return _3b7b.getTopLeft();
}
}else{
if(this.snapToGridHelper!=null){
var _3b7a=_3b78.getSnapToGridAnchor();
pos.x=pos.x+_3b7a.x;
pos.y=pos.y+_3b7a.y;
var _3b7b=new Point(pos.x,pos.y);
this.snapToGridHelper.snapPoint(0,pos,_3b7b);
_3b7b.x=_3b7b.x-_3b7a.x;
_3b7b.y=_3b7b.y-_3b7a.y;
return _3b7b;
}
}
return pos;
};
Workflow.prototype.showSnapToHelperLineHorizontal=function(_3b7f){
if(this.horizontalSnapToHelperLine==null){
this.horizontalSnapToHelperLine=new Line();
this.horizontalSnapToHelperLine.setColor(new Color(175,175,255));
this.addFigure(this.horizontalSnapToHelperLine);
}
this.horizontalSnapToHelperLine.setStartPoint(0,_3b7f);
this.horizontalSnapToHelperLine.setEndPoint(this.getWidth(),_3b7f);
};
Workflow.prototype.showSnapToHelperLineVertical=function(_3b80){
if(this.verticalSnapToHelperLine==null){
this.verticalSnapToHelperLine=new Line();
this.verticalSnapToHelperLine.setColor(new Color(175,175,255));
this.addFigure(this.verticalSnapToHelperLine);
}
this.verticalSnapToHelperLine.setStartPoint(_3b80,0);
this.verticalSnapToHelperLine.setEndPoint(_3b80,this.getHeight());
};
Workflow.prototype.hideSnapToHelperLines=function(){
this.hideSnapToHelperLineHorizontal();
this.hideSnapToHelperLineVertical();
};
Workflow.prototype.hideSnapToHelperLineHorizontal=function(){
if(this.horizontalSnapToHelperLine!=null){
this.removeFigure(this.horizontalSnapToHelperLine);
this.horizontalSnapToHelperLine=null;
}
};
Workflow.prototype.hideSnapToHelperLineVertical=function(){
if(this.verticalSnapToHelperLine!=null){
this.removeFigure(this.verticalSnapToHelperLine);
this.verticalSnapToHelperLine=null;
}
};
Window=function(title){
this.title=title;
this.titlebar=null;
Figure.call(this);
this.setDeleteable(false);
this.setCanSnapToHelper(false);
this.setZOrder(Window.ZOrderIndex);
};
Window.prototype=new Figure;
Window.prototype.type="Window";
Window.ZOrderIndex=5000;
Window.setZOrderBaseIndex=function(index){
Window.ZOrderBaseIndex=index;
};
Window.prototype.hasFixedPosition=function(){
return true;
};
Window.prototype.hasTitleBar=function(){
return true;
};
Window.prototype.createHTMLElement=function(){
var item=Figure.prototype.createHTMLElement.call(this);
item.style.margin="0px";
item.style.padding="0px";
item.style.border="1px solid black";
item.style.backgroundImage="url(window_bg.png)";
item.style.zIndex=Window.ZOrderBaseIndex;
item.style.cursor=null;
if(this.hasTitleBar()){
this.titlebar=document.createElement("div");
this.titlebar.style.position="absolute";
this.titlebar.style.left="0px";
this.titlebar.style.top="0px";
this.titlebar.style.width=this.getWidth()+"px";
this.titlebar.style.height="15px";
this.titlebar.style.margin="0px";
this.titlebar.style.padding="0px";
this.titlebar.style.font="normal 10px verdana";
this.titlebar.style.backgroundColor="blue";
this.titlebar.style.borderBottom="2px solid gray";
this.titlebar.style.whiteSpace="nowrap";
this.titlebar.style.textAlign="center";
this.titlebar.style.backgroundImage="url(window_toolbar.png)";
this.textNode=document.createTextNode(this.title);
this.titlebar.appendChild(this.textNode);
this.disableTextSelection(this.titlebar);
item.appendChild(this.titlebar);
}
return item;
};
Window.prototype.setDocumentDirty=function(_35be){
};
Window.prototype.onDragend=function(){
};
Window.prototype.onDragstart=function(x,y){
if(this.titlebar==null){
return false;
}
if(this.canDrag==true&&x<parseInt(this.titlebar.style.width)&&y<parseInt(this.titlebar.style.height)){
return true;
}
return false;
};
Window.prototype.isSelectable=function(){
return false;
};
Window.prototype.setCanDrag=function(flag){
Figure.prototype.setCanDrag.call(this,flag);
this.html.style.cursor="";
if(this.titlebar==null){
return;
}
if(flag){
this.titlebar.style.cursor="move";
}else{
this.titlebar.style.cursor="";
}
};
Window.prototype.setWorkflow=function(_35c2){
var _35c3=this.workflow;
Figure.prototype.setWorkflow.call(this,_35c2);
if(_35c3!=null){
_35c3.removeSelectionListener(this);
}
if(this.workflow!=null){
this.workflow.addSelectionListener(this);
}
};
Window.prototype.setDimension=function(w,h){
Figure.prototype.setDimension.call(this,w,h);
if(this.titlebar!=null){
this.titlebar.style.width=this.getWidth()+"px";
}
};
Window.prototype.setTitle=function(title){
this.title=title;
};
Window.prototype.getMinWidth=function(){
return 50;
};
Window.prototype.getMinHeight=function(){
return 50;
};
Window.prototype.isResizeable=function(){
return false;
};
Window.prototype.setAlpha=function(_35c7){
};
Window.prototype.setBackgroundColor=function(color){
this.bgColor=color;
if(this.bgColor!=null){
this.html.style.backgroundColor=this.bgColor.getHTMLStyle();
}else{
this.html.style.backgroundColor="transparent";
this.html.style.backgroundImage="";
}
};
Window.prototype.setColor=function(color){
this.lineColor=color;
if(this.lineColor!=null){
this.html.style.border=this.lineStroke+"px solid "+this.lineColor.getHTMLStyle();
}else{
this.html.style.border="0px";
}
};
Window.prototype.setLineWidth=function(w){
this.lineStroke=w;
this.html.style.border=this.lineStroke+"px solid black";
};
Window.prototype.onSelectionChanged=function(_35cb){
};
Button=function(_3a7c,width,_3a7e){
this.x=0;
this.y=0;
this.id=this.generateUId();
this.enabled=true;
this.active=false;
this.palette=_3a7c;
if(width&&_3a7e){
this.setDimension(width,_3a7e);
}else{
this.setDimension(24,24);
}
this.html=this.createHTMLElement();
};
Button.prototype.type="Button";
Button.prototype.dispose=function(){
};
Button.prototype.getImageUrl=function(){
if(this.enabled){
return this.type+".png";
}else{
return this.type+"_disabled.png";
}
};
Button.prototype.createHTMLElement=function(){
var item=document.createElement("div");
item.id=this.id;
item.style.position="absolute";
item.style.left=this.x+"px";
item.style.top=this.y+"px";
item.style.height=this.width+"px";
item.style.width=this.height+"px";
item.style.margin="0px";
item.style.padding="0px";
item.style.outline="none";
if(this.getImageUrl()!=null){
item.style.backgroundImage="url("+this.getImageUrl()+")";
}else{
item.style.backgroundImage="";
}
var oThis=this;
this.omousedown=function(event){
if(oThis.enabled){
oThis.setActive(true);
}
event.cancelBubble=true;
event.returnValue=false;
};
this.omouseup=function(event){
if(oThis.enabled){
oThis.setActive(false);
oThis.execute();
}
event.cancelBubble=true;
event.returnValue=false;
};
if(item.addEventListener){
item.addEventListener("mousedown",this.omousedown,false);
item.addEventListener("mouseup",this.omouseup,false);
}else{
if(item.attachEvent){
item.attachEvent("onmousedown",this.omousedown);
item.attachEvent("onmouseup",this.omouseup);
}
}
return item;
};
Button.prototype.getHTMLElement=function(){
if(this.html==null){
this.html=this.createHTMLElement();
}
return this.html;
};
Button.prototype.execute=function(){
};
Button.prototype.setTooltip=function(_3a83){
this.tooltip=_3a83;
if(this.tooltip!=null){
this.html.title=this.tooltip;
}else{
this.html.title="";
}
};
Button.prototype.setActive=function(flag){
if(!this.enabled){
return;
}
this.active=flag;
if(flag==true){
this.html.style.border="2px inset";
}else{
this.html.style.border="0px";
}
};
Button.prototype.isActive=function(){
return this.active;
};
Button.prototype.setEnabled=function(flag){
this.enabled=flag;
if(this.getImageUrl()!=null){
this.html.style.backgroundImage="url("+this.getImageUrl()+")";
}else{
this.html.style.backgroundImage="";
}
};
Button.prototype.setDimension=function(w,h){
this.width=w;
this.height=h;
if(this.html==null){
return;
}
this.html.style.width=this.width+"px";
this.html.style.height=this.height+"px";
};
Button.prototype.setPosition=function(xPos,yPos){
this.x=Math.max(0,xPos);
this.y=Math.max(0,yPos);
if(this.html==null){
return;
}
this.html.style.left=this.x+"px";
this.html.style.top=this.y+"px";
};
Button.prototype.getWidth=function(){
return this.width;
};
Button.prototype.getHeight=function(){
return this.height;
};
Button.prototype.getY=function(){
return this.y;
};
Button.prototype.getX=function(){
return this.x;
};
Button.prototype.getPosition=function(){
return new Point(this.x,this.y);
};
Button.prototype.getToolPalette=function(){
return this.palette;
};
Button.prototype.generateUId=function(){
var chars="0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
var _3a8b=10;
var _3a8c=10;
nbTry=0;
while(nbTry<1000){
var id="";
for(var i=0;i<_3a8b;i++){
var rnum=Math.floor(Math.random()*chars.length);
id+=chars.substring(rnum,rnum+1);
}
elem=document.getElementById(id);
if(!elem){
return id;
}
nbTry+=1;
}
return null;
};
ToggleButton=function(_3880){
Button.call(this,_3880);
this.isDownFlag=false;
};
ToggleButton.prototype=new Button;
ToggleButton.prototype.type="ToggleButton";
ToggleButton.prototype.createHTMLElement=function(){
var item=document.createElement("div");
item.id=this.id;
item.style.position="absolute";
item.style.left=this.x+"px";
item.style.top=this.y+"px";
item.style.height="24px";
item.style.width="24px";
item.style.margin="0px";
item.style.padding="0px";
if(this.getImageUrl()!=null){
item.style.backgroundImage="url("+this.getImageUrl()+")";
}else{
item.style.backgroundImage="";
}
var oThis=this;
this.omousedown=function(event){
if(oThis.enabled){
if(!oThis.isDown()){
Button.prototype.setActive.call(oThis,true);
}
}
event.cancelBubble=true;
event.returnValue=false;
};
this.omouseup=function(event){
if(oThis.enabled){
if(oThis.isDown()){
Button.prototype.setActive.call(oThis,false);
}
oThis.isDownFlag=!oThis.isDownFlag;
oThis.execute();
}
event.cancelBubble=true;
event.returnValue=false;
};
if(item.addEventListener){
item.addEventListener("mousedown",this.omousedown,false);
item.addEventListener("mouseup",this.omouseup,false);
}else{
if(item.attachEvent){
item.attachEvent("onmousedown",this.omousedown);
item.attachEvent("onmouseup",this.omouseup);
}
}
return item;
};
ToggleButton.prototype.isDown=function(){
return this.isDownFlag;
};
ToggleButton.prototype.setActive=function(flag){
Button.prototype.setActive.call(this,flag);
this.isDownFlag=flag;
};
ToggleButton.prototype.execute=function(){
};
ToolGeneric=function(_3437){
this.x=0;
this.y=0;
this.enabled=true;
this.tooltip=null;
this.palette=_3437;
this.setDimension(10,10);
this.html=this.createHTMLElement();
};
ToolGeneric.prototype.type="ToolGeneric";
ToolGeneric.prototype.dispose=function(){
};
ToolGeneric.prototype.getImageUrl=function(){
if(this.enabled){
return this.type+".png";
}else{
return this.type+"_disabled.png";
}
};
ToolGeneric.prototype.createHTMLElement=function(){
var item=document.createElement("div");
item.id=this.id;
item.style.position="absolute";
item.style.left=this.x+"px";
item.style.top=this.y+"px";
item.style.height="24px";
item.style.width="24px";
item.style.margin="0px";
item.style.padding="0px";
if(this.getImageUrl()!=null){
item.style.backgroundImage="url("+this.getImageUrl()+")";
}else{
item.style.backgroundImage="";
}
var oThis=this;
this.click=function(event){
if(oThis.enabled){
oThis.palette.setActiveTool(oThis);
}
event.cancelBubble=true;
event.returnValue=false;
};
if(item.addEventListener){
item.addEventListener("click",this.click,false);
}else{
if(item.attachEvent){
item.attachEvent("onclick",this.click);
}
}
return item;
};
ToolGeneric.prototype.getHTMLElement=function(){
if(this.html==null){
this.html=this.createHTMLElement();
}
return this.html;
};
ToolGeneric.prototype.execute=function(x,y){
if(this.enabled){
this.palette.setActiveTool(null);
}
};
ToolGeneric.prototype.setTooltip=function(_343d){
this.tooltip=_343d;
if(this.tooltip!=null){
this.html.title=this.tooltip;
}else{
this.html.title="";
}
};
ToolGeneric.prototype.setActive=function(flag){
if(!this.enabled){
return;
}
if(flag==true){
this.html.style.border="2px inset";
}else{
this.html.style.border="0px";
}
};
ToolGeneric.prototype.setEnabled=function(flag){
this.enabled=flag;
if(this.getImageUrl()!=null){
this.html.style.backgroundImage="url("+this.getImageUrl()+")";
}else{
this.html.style.backgroundImage="";
}
};
ToolGeneric.prototype.setDimension=function(w,h){
this.width=w;
this.height=h;
if(this.html==null){
return;
}
this.html.style.width=this.width+"px";
this.html.style.height=this.height+"px";
};
ToolGeneric.prototype.setPosition=function(xPos,yPos){
this.x=Math.max(0,xPos);
this.y=Math.max(0,yPos);
if(this.html==null){
return;
}
this.html.style.left=this.x+"px";
this.html.style.top=this.y+"px";
};
ToolGeneric.prototype.getWidth=function(){
return this.width;
};
ToolGeneric.prototype.getHeight=function(){
return this.height;
};
ToolGeneric.prototype.getY=function(){
return this.y;
};
ToolGeneric.prototype.getX=function(){
return this.x;
};
ToolGeneric.prototype.getPosition=function(){
return new Point(this.x,this.y);
};
ToolPalette=function(title){
Window.call(this,title);
this.setDimension(75,400);
this.activeTool=null;
this.children=new Object();
};
ToolPalette.prototype=new Window;
ToolPalette.prototype.type="ToolPalette";
ToolPalette.prototype.dispose=function(){
Window.prototype.dispose.call(this);
};
ToolPalette.prototype.createHTMLElement=function(){
var item=Window.prototype.createHTMLElement.call(this);
this.scrollarea=document.createElement("div");
this.scrollarea.style.position="absolute";
this.scrollarea.style.left="0px";
if(this.hasTitleBar()){
this.scrollarea.style.top="15px";
}else{
this.scrollarea.style.top="0px";
}
this.scrollarea.style.width=this.getWidth()+"px";
this.scrollarea.style.height="15px";
this.scrollarea.style.margin="0px";
this.scrollarea.style.padding="0px";
this.scrollarea.style.font="normal 10px verdana";
this.scrollarea.style.borderBottom="2px solid gray";
this.scrollarea.style.whiteSpace="nowrap";
this.scrollarea.style.textAlign="center";
this.scrollarea.style.overflowX="auto";
this.scrollarea.style.overflowY="auto";
this.scrollarea.style.overflow="auto";
item.appendChild(this.scrollarea);
return item;
};
ToolPalette.prototype.setDimension=function(w,h){
Window.prototype.setDimension.call(this,w,h);
if(this.scrollarea!=null){
this.scrollarea.style.width=this.getWidth()+"px";
if(this.hasTitleBar()){
this.scrollarea.style.height=(this.getHeight()-15)+"px";
}else{
this.scrollarea.style.height=this.getHeight()+"px";
}
}
};
ToolPalette.prototype.addChild=function(item){
this.children[item.id]=item;
this.scrollarea.appendChild(item.getHTMLElement());
};
ToolPalette.prototype.getChild=function(id){
return this.children[id];
};
ToolPalette.prototype.getActiveTool=function(){
return this.activeTool;
};
ToolPalette.prototype.setActiveTool=function(tool){
if(this.activeTool!=tool&&this.activeTool!=null){
this.activeTool.setActive(false);
}
if(tool!=null){
tool.setActive(true);
}
this.activeTool=tool;
};
Dialog=function(title){
this.buttonbar=null;
if(title){
Window.call(this,title);
}else{
Window.call(this,"Dialog");
}
this.setDimension(400,300);
};
Dialog.prototype=new Window;
Dialog.prototype.type="Dialog";
Dialog.prototype.createHTMLElement=function(){
var item=Window.prototype.createHTMLElement.call(this);
var oThis=this;
this.buttonbar=document.createElement("div");
this.buttonbar.style.position="absolute";
this.buttonbar.style.left="0px";
this.buttonbar.style.bottom="0px";
this.buttonbar.style.width=this.getWidth()+"px";
this.buttonbar.style.height="30px";
this.buttonbar.style.margin="0px";
this.buttonbar.style.padding="0px";
this.buttonbar.style.font="normal 10px verdana";
this.buttonbar.style.backgroundColor="#c0c0c0";
this.buttonbar.style.borderBottom="2px solid gray";
this.buttonbar.style.whiteSpace="nowrap";
this.buttonbar.style.textAlign="center";
this.okbutton=document.createElement("button");
this.okbutton.style.border="1px solid gray";
this.okbutton.style.font="normal 10px verdana";
this.okbutton.style.width="80px";
this.okbutton.style.margin="5px";
this.okbutton.innerHTML="Ok";
this.okbutton.onclick=function(){
oThis.onOk();
};
this.buttonbar.appendChild(this.okbutton);
this.cancelbutton=document.createElement("button");
this.cancelbutton.innerHTML="Cancel";
this.cancelbutton.style.font="normal 10px verdana";
this.cancelbutton.style.border="1px solid gray";
this.cancelbutton.style.width="80px";
this.cancelbutton.style.margin="5px";
this.cancelbutton.onclick=function(){
oThis.onCancel();
};
this.buttonbar.appendChild(this.cancelbutton);
item.appendChild(this.buttonbar);
return item;
};
Dialog.prototype.onOk=function(){
this.workflow.removeFigure(this);
};
Dialog.prototype.onCancel=function(){
this.workflow.removeFigure(this);
};
Dialog.prototype.setDimension=function(w,h){
Window.prototype.setDimension.call(this,w,h);
if(this.buttonbar!=null){
this.buttonbar.style.width=this.getWidth()+"px";
}
};
Dialog.prototype.setWorkflow=function(_2c26){
Window.prototype.setWorkflow.call(this,_2c26);
this.setFocus();
};
Dialog.prototype.setFocus=function(){
};
Dialog.prototype.onSetDocumentDirty=function(){
};
InputDialog=function(){
Dialog.call(this);
this.setDimension(400,100);
};
InputDialog.prototype=new Dialog;
InputDialog.prototype.type="InputDialog";
InputDialog.prototype.createHTMLElement=function(){
var item=Dialog.prototype.createHTMLElement.call(this);
return item;
};
InputDialog.prototype.onOk=function(){
this.workflow.removeFigure(this);
};
InputDialog.prototype.onCancel=function(){
this.workflow.removeFigure(this);
};
PropertyDialog=function(_392d,_392e,label){
this.figure=_392d;
this.propertyName=_392e;
this.label=label;
Dialog.call(this);
this.setDimension(400,120);
};
PropertyDialog.prototype=new Dialog;
PropertyDialog.prototype.type="PropertyDialog";
PropertyDialog.prototype.createHTMLElement=function(){
var item=Dialog.prototype.createHTMLElement.call(this);
var _3931=document.createElement("form");
_3931.style.position="absolute";
_3931.style.left="10px";
_3931.style.top="30px";
_3931.style.width="375px";
_3931.style.font="normal 10px verdana";
item.appendChild(_3931);
this.label=document.createTextNode(this.label);
this.disableTextSelection(this.label);
_3931.appendChild(this.label);
this.input=document.createElement("input");
this.input.style.border="1px solid gray";
this.input.style.font="normal 10px verdana";
this.input.type="text";
var value=this.figure.getProperty(this.propertyName);
if(value){
this.input.value=value;
}else{
this.input.value="";
}
this.input.style.width="100%";
_3931.appendChild(this.input);
this.input.focus();
return item;
};
PropertyDialog.prototype.onOk=function(){
Dialog.prototype.onOk.call(this);
this.figure.setProperty(this.propertyName,this.input.value);
};
AnnotationDialog=function(_28da){
this.figure=_28da;
Dialog.call(this);
this.setDimension(400,100);
};
AnnotationDialog.prototype=new Dialog;
AnnotationDialog.prototype.type="AnnotationDialog";
AnnotationDialog.prototype.createHTMLElement=function(){
var item=Dialog.prototype.createHTMLElement.call(this);
var _28dc=document.createElement("form");
_28dc.style.position="absolute";
_28dc.style.left="10px";
_28dc.style.top="30px";
_28dc.style.width="375px";
_28dc.style.font="normal 10px verdana";
item.appendChild(_28dc);
this.label=document.createTextNode("Text");
alert("hello2");
_28dc.appendChild(this.label);
this.input=document.createElement("input");
this.input.style.border="1px solid gray";
this.input.style.font="normal 10px verdana";
this.input.type="text";
var value=this.figure.getText();
if(value){
this.input.value=value;
}else{
this.input.value="";
}
this.input.style.width="100%";
_28dc.appendChild(this.input);
this.input.focus();
return item;
};
AnnotationDialog.prototype.onOk=function(){
this.workflow.getCommandStack().execute(new CommandSetText(this.figure,this.input.value));
this.workflow.removeFigure(this);
};
PropertyWindow=function(){
this.currentSelection=null;
Window.call(this,"Property Window");
this.setDimension(200,100);
};
PropertyWindow.prototype=new Window;
PropertyWindow.prototype.type="PropertyWindow";
PropertyWindow.prototype.dispose=function(){
Window.prototype.dispose.call(this);
};
PropertyWindow.prototype.createHTMLElement=function(){
var item=Window.prototype.createHTMLElement.call(this);
item.appendChild(this.createLabel("Type:",15,25));
item.appendChild(this.createLabel("X :",15,50));
item.appendChild(this.createLabel("Y :",15,70));
item.appendChild(this.createLabel("Width :",85,50));
item.appendChild(this.createLabel("Height :",85,70));
this.labelType=this.createLabel("",50,25);
this.labelX=this.createLabel("",40,50);
this.labelY=this.createLabel("",40,70);
this.labelWidth=this.createLabel("",135,50);
this.labelHeight=this.createLabel("",135,70);
this.labelType.style.fontWeight="normal";
this.labelX.style.fontWeight="normal";
this.labelY.style.fontWeight="normal";
this.labelWidth.style.fontWeight="normal";
this.labelHeight.style.fontWeight="normal";
item.appendChild(this.labelType);
item.appendChild(this.labelX);
item.appendChild(this.labelY);
item.appendChild(this.labelWidth);
item.appendChild(this.labelHeight);
return item;
};
PropertyWindow.prototype.onSelectionChanged=function(_2c35){
Window.prototype.onSelectionChanged.call(this,_2c35);
if(this.currentSelection!=null){
this.currentSelection.detachMoveListener(this);
}
this.currentSelection=_2c35;
if(_2c35!=null&&_2c35!=this){
this.labelType.innerHTML=_2c35.type;
if(_2c35.getX){
this.labelX.innerHTML=_2c35.getX();
this.labelY.innerHTML=_2c35.getY();
this.labelWidth.innerHTML=_2c35.getWidth();
this.labelHeight.innerHTML=_2c35.getHeight();
this.currentSelection=_2c35;
this.currentSelection.attachMoveListener(this);
}else{
this.labelX.innerHTML="";
this.labelY.innerHTML="";
this.labelWidth.innerHTML="";
this.labelHeight.innerHTML="";
}
}else{
this.labelType.innerHTML="&lt;none&gt;";
this.labelX.innerHTML="";
this.labelY.innerHTML="";
this.labelWidth.innerHTML="";
this.labelHeight.innerHTML="";
}
};
PropertyWindow.prototype.getCurrentSelection=function(){
return this.currentSelection;
};
PropertyWindow.prototype.onOtherFigureMoved=function(_2c36){
if(_2c36==this.currentSelection){
this.onSelectionChanged(_2c36);
}
};
PropertyWindow.prototype.createLabel=function(text,x,y){
var l=document.createElement("div");
l.style.position="absolute";
l.style.left=x+"px";
l.style.top=y+"px";
l.style.font="normal 10px verdana";
l.style.whiteSpace="nowrap";
l.style.fontWeight="bold";
l.innerHTML=text;
return l;
};
ColorDialog=function(){
this.maxValue={"h":"359","s":"100","v":"100"};
this.HSV={0:359,1:100,2:100};
this.slideHSV={0:359,1:100,2:100};
this.SVHeight=165;
this.wSV=162;
this.wH=162;
Dialog.call(this,"Color Chooser");
this.loadSV();
this.setColor(new Color(255,0,0));
this.setDimension(219,244);
};
ColorDialog.prototype=new Dialog;
ColorDialog.prototype.type="ColorDialog";
ColorDialog.prototype.createHTMLElement=function(){
var oThis=this;
var item=Dialog.prototype.createHTMLElement.call(this);
this.outerDiv=document.createElement("div");
this.outerDiv.id="plugin";
this.outerDiv.style.top="15px";
this.outerDiv.style.left="0px";
this.outerDiv.style.width="201px";
this.outerDiv.style.position="absolute";
this.outerDiv.style.padding="9px";
this.outerDiv.display="block";
this.outerDiv.style.background="#0d0d0d";
this.plugHEX=document.createElement("div");
this.plugHEX.id="plugHEX";
this.plugHEX.innerHTML="F1FFCC";
this.plugHEX.style.color="white";
this.plugHEX.style.font="normal 10px verdana";
this.outerDiv.appendChild(this.plugHEX);
this.SV=document.createElement("div");
this.SV.onmousedown=function(event){
oThis.mouseDownSV(oThis.SVslide,event);
};
this.SV.id="SV";
this.SV.style.cursor="crosshair";
this.SV.style.background="#FF0000 url(SatVal.png)";
this.SV.style.position="absolute";
this.SV.style.height="166px";
this.SV.style.width="167px";
this.SV.style.marginRight="10px";
this.SV.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='SatVal.png', sizingMethod='scale')";
this.SV.style["float"]="left";
this.outerDiv.appendChild(this.SV);
this.SVslide=document.createElement("div");
this.SVslide.onmousedown=function(event){
oThis.mouseDownSV(event);
};
this.SVslide.style.top="40px";
this.SVslide.style.left="40px";
this.SVslide.style.position="absolute";
this.SVslide.style.cursor="crosshair";
this.SVslide.style.background="url(slide.gif)";
this.SVslide.style.height="9px";
this.SVslide.style.width="9px";
this.SVslide.style.lineHeight="1px";
this.outerDiv.appendChild(this.SVslide);
this.H=document.createElement("form");
this.H.id="H";
this.H.onmousedown=function(event){
oThis.mouseDownH(event);
};
this.H.style.border="1px solid #000000";
this.H.style.cursor="crosshair";
this.H.style.position="absolute";
this.H.style.width="19px";
this.H.style.top="28px";
this.H.style.left="191px";
this.outerDiv.appendChild(this.H);
this.Hslide=document.createElement("div");
this.Hslide.style.top="-7px";
this.Hslide.style.left="-8px";
this.Hslide.style.background="url(slideHue.gif)";
this.Hslide.style.height="5px";
this.Hslide.style.width="33px";
this.Hslide.style.position="absolute";
this.Hslide.style.lineHeight="1px";
this.H.appendChild(this.Hslide);
this.Hmodel=document.createElement("div");
this.Hmodel.style.height="1px";
this.Hmodel.style.width="19px";
this.Hmodel.style.lineHeight="1px";
this.Hmodel.style.margin="0px";
this.Hmodel.style.padding="0px";
this.Hmodel.style.fontSize="1px";
this.H.appendChild(this.Hmodel);
item.appendChild(this.outerDiv);
return item;
};
ColorDialog.prototype.onOk=function(){
Dialog.prototype.onOk.call(this);
};
browser=function(v){
return (Math.max(navigator.userAgent.toLowerCase().indexOf(v),0));
};
ColorDialog.prototype.showColor=function(c){
this.plugHEX.style.background="#"+c;
this.plugHEX.innerHTML=c;
};
ColorDialog.prototype.getSelectedColor=function(){
var rgb=this.hex2rgb(this.plugHEX.innerHTML);
return new Color(rgb[0],rgb[1],rgb[2]);
};
ColorDialog.prototype.setColor=function(color){
if(color==null){
color=new Color(100,100,100);
}
var hex=this.rgb2hex(Array(color.getRed(),color.getGreen(),color.getBlue()));
this.updateH(hex);
};
ColorDialog.prototype.XY=function(e,v){
var z=browser("msie")?Array(event.clientX+document.body.scrollLeft,event.clientY+document.body.scrollTop):Array(e.pageX,e.pageY);
return z[v];
};
ColorDialog.prototype.mkHSV=function(a,b,c){
return (Math.min(a,Math.max(0,Math.ceil((parseInt(c)/b)*a))));
};
ColorDialog.prototype.ckHSV=function(a,b){
if(a>=0&&a<=b){
return (a);
}else{
if(a>b){
return (b);
}else{
if(a<0){
return ("-"+oo);
}
}
}
};
ColorDialog.prototype.mouseDownH=function(e){
this.slideHSV[0]=this.HSV[0];
var oThis=this;
this.H.onmousemove=function(e){
oThis.dragH(e);
};
this.H.onmouseup=function(e){
oThis.H.onmousemove="";
oThis.H.onmouseup="";
};
this.dragH(e);
};
ColorDialog.prototype.dragH=function(e){
var y=this.XY(e,1)-this.getY()-40;
this.Hslide.style.top=(this.ckHSV(y,this.wH)-5)+"px";
this.slideHSV[0]=this.mkHSV(359,this.wH,this.Hslide.style.top);
this.updateSV();
this.showColor(this.commit());
this.SV.style.backgroundColor="#"+this.hsv2hex(Array(this.HSV[0],100,100));
};
ColorDialog.prototype.mouseDownSV=function(o,e){
this.slideHSV[0]=this.HSV[0];
var oThis=this;
function reset(){
oThis.SV.onmousemove="";
oThis.SV.onmouseup="";
oThis.SVslide.onmousemove="";
oThis.SVslide.onmouseup="";
}
this.SV.onmousemove=function(e){
oThis.dragSV(e);
};
this.SV.onmouseup=reset;
this.SVslide.onmousemove=function(e){
oThis.dragSV(e);
};
this.SVslide.onmouseup=reset;
this.dragSV(e);
};
ColorDialog.prototype.dragSV=function(e){
var x=this.XY(e,0)-this.getX()-1;
var y=this.XY(e,1)-this.getY()-20;
this.SVslide.style.left=this.ckHSV(x,this.wSV)+"px";
this.SVslide.style.top=this.ckHSV(y,this.wSV)+"px";
this.slideHSV[1]=this.mkHSV(100,this.wSV,this.SVslide.style.left);
this.slideHSV[2]=100-this.mkHSV(100,this.wSV,this.SVslide.style.top);
this.updateSV();
};
ColorDialog.prototype.commit=function(){
var r="hsv";
var z={};
var j="";
for(var i=0;i<=r.length-1;i++){
j=r.substr(i,1);
z[i]=(j=="h")?this.maxValue[j]-this.mkHSV(this.maxValue[j],this.wH,this.Hslide.style.top):this.HSV[i];
}
return (this.updateSV(this.hsv2hex(z)));
};
ColorDialog.prototype.updateSV=function(v){
this.HSV=v?this.hex2hsv(v):Array(this.slideHSV[0],this.slideHSV[1],this.slideHSV[2]);
if(!v){
v=this.hsv2hex(Array(this.slideHSV[0],this.slideHSV[1],this.slideHSV[2]));
}
this.showColor(v);
return v;
};
ColorDialog.prototype.loadSV=function(){
var z="";
for(var i=this.SVHeight;i>=0;i--){
z+="<div style=\"background:#"+this.hsv2hex(Array(Math.round((359/this.SVHeight)*i),100,100))+";\"><br/></div>";
}
this.Hmodel.innerHTML=z;
};
ColorDialog.prototype.updateH=function(v){
this.plugHEX.innerHTML=v;
this.HSV=this.hex2hsv(v);
this.SV.style.backgroundColor="#"+this.hsv2hex(Array(this.HSV[0],100,100));
this.SVslide.style.top=(parseInt(this.wSV-this.wSV*(this.HSV[1]/100))+20)+"px";
this.SVslide.style.left=(parseInt(this.wSV*(this.HSV[1]/100))+5)+"px";
this.Hslide.style.top=(parseInt(this.wH*((this.maxValue["h"]-this.HSV[0])/this.maxValue["h"]))-7)+"px";
};
ColorDialog.prototype.toHex=function(v){
v=Math.round(Math.min(Math.max(0,v),255));
return ("0123456789ABCDEF".charAt((v-v%16)/16)+"0123456789ABCDEF".charAt(v%16));
};
ColorDialog.prototype.hex2rgb=function(r){
return ({0:parseInt(r.substr(0,2),16),1:parseInt(r.substr(2,2),16),2:parseInt(r.substr(4,2),16)});
};
ColorDialog.prototype.rgb2hex=function(r){
return (this.toHex(r[0])+this.toHex(r[1])+this.toHex(r[2]));
};
ColorDialog.prototype.hsv2hex=function(h){
return (this.rgb2hex(this.hsv2rgb(h)));
};
ColorDialog.prototype.hex2hsv=function(v){
return (this.rgb2hsv(this.hex2rgb(v)));
};
ColorDialog.prototype.rgb2hsv=function(r){
var max=Math.max(r[0],r[1],r[2]);
var delta=max-Math.min(r[0],r[1],r[2]);
var H;
var S;
var V;
if(max!=0){
S=Math.round(delta/max*100);
if(r[0]==max){
H=(r[1]-r[2])/delta;
}else{
if(r[1]==max){
H=2+(r[2]-r[0])/delta;
}else{
if(r[2]==max){
H=4+(r[0]-r[1])/delta;
}
}
}
var H=Math.min(Math.round(H*60),360);
if(H<0){
H+=360;
}
}
return ({0:H?H:0,1:S?S:0,2:Math.round((max/255)*100)});
};
ColorDialog.prototype.hsv2rgb=function(r){
var R;
var B;
var G;
var S=r[1]/100;
var V=r[2]/100;
var H=r[0]/360;
if(S>0){
if(H>=1){
H=0;
}
H=6*H;
F=H-Math.floor(H);
A=Math.round(255*V*(1-S));
B=Math.round(255*V*(1-(S*F)));
C=Math.round(255*V*(1-(S*(1-F))));
V=Math.round(255*V);
switch(Math.floor(H)){
case 0:
R=V;
G=C;
B=A;
break;
case 1:
R=B;
G=V;
B=A;
break;
case 2:
R=A;
G=V;
B=C;
break;
case 3:
R=A;
G=B;
B=V;
break;
case 4:
R=C;
G=A;
B=V;
break;
case 5:
R=V;
G=A;
B=B;
break;
}
return ({0:R?R:0,1:G?G:0,2:B?B:0});
}else{
return ({0:(V=Math.round(V*255)),1:V,2:V});
}
};
LineColorDialog=function(_28d3){
ColorDialog.call(this);
this.figure=_28d3;
var color=_28d3.getColor();
this.updateH(this.rgb2hex(color.getRed(),color.getGreen(),color.getBlue()));
};
LineColorDialog.prototype=new ColorDialog;
LineColorDialog.prototype.type="LineColorDialog";
LineColorDialog.prototype.onOk=function(){
var _28d5=this.workflow;
ColorDialog.prototype.onOk.call(this);
if(typeof this.figure.setColor=="function"){
_28d5.getCommandStack().execute(new CommandSetColor(this.figure,this.getSelectedColor()));
if(_28d5.getCurrentSelection()==this.figure){
_28d5.setCurrentSelection(this.figure);
}
}
};
BackgroundColorDialog=function(_3a75){
ColorDialog.call(this);
this.figure=_3a75;
var color=_3a75.getBackgroundColor();
if(color!=null){
this.updateH(this.rgb2hex(color.getRed(),color.getGreen(),color.getBlue()));
}
};
BackgroundColorDialog.prototype=new ColorDialog;
BackgroundColorDialog.prototype.type="BackgroundColorDialog";
BackgroundColorDialog.prototype.onOk=function(){
var _3a77=this.workflow;
ColorDialog.prototype.onOk.call(this);
if(typeof this.figure.setBackgroundColor=="function"){
_3a77.getCommandStack().execute(new CommandSetBackgroundColor(this.figure,this.getSelectedColor()));
if(_3a77.getCurrentSelection()==this.figure){
_3a77.setCurrentSelection(this.figure);
}
}
};
AnnotationDialog=function(_28da){
this.figure=_28da;
Dialog.call(this);
this.setDimension(400,100);
};
AnnotationDialog.prototype=new Dialog;
AnnotationDialog.prototype.type="AnnotationDialog";
AnnotationDialog.prototype.createHTMLElement=function(){
var item=Dialog.prototype.createHTMLElement.call(this);
var _28dc=document.createElement("form");
_28dc.style.position="absolute";
_28dc.style.left="10px";
_28dc.style.top="30px";
_28dc.style.width="375px";
_28dc.style.font="normal 10px verdana";
item.appendChild(_28dc);
this.label=document.createTextNode("Text");
//alert("hello1");
_28dc.appendChild(this.label);
this.input=document.createElement("input");
this.input.style.border="1px solid gray";
this.input.style.font="normal 10px verdana";
this.input.type="text";
var value=this.figure.getText();
if(value){
this.input.value=value;
}else{
this.input.value="";
}
this.input.style.width="100%";
_28dc.appendChild(this.input);
this.input.focus();
this.input.select();
return item;
};
AnnotationDialog.prototype.onOk=function(){
this.workflow.getCommandStack().execute(new CommandSetText(this.figure,this.input.value));
this.workflow.removeFigure(this);
};
Command=function(label){
this.label=label;
};
Command.prototype.type="Command";
Command.prototype.getLabel=function(){
};
Command.prototype.canExecute=function(){
return true;
};
Command.prototype.execute=function(){
};
Command.prototype.undo=function(){
};
Command.prototype.redo=function(){
};
CommandStack=function(){
this.undostack=new Array();
this.redostack=new Array();
this.maxundo=50;
};
CommandStack.prototype.type="CommandStack";
CommandStack.prototype.setUndoLimit=function(count){
this.maxundo=count;
};
CommandStack.prototype.markSaveLocation=function(){
this.undostack=new Array();
this.redostack=new Array();
};
CommandStack.prototype.execute=function(_3947){
if(_3947.canExecute()==false){
return;
}
this.undostack.push(_3947);
_3947.execute();
this.redostack=new Array();
if(this.undostack.length>this.maxundo){
this.undostack=this.undostack.slice(this.undostack.length-this.maxundo);
}
};
CommandStack.prototype.undo=function(){
var _3948=this.undostack.pop();
if(_3948){
this.redostack.push(_3948);
_3948.undo();
}
};
CommandStack.prototype.redo=function(){
var _3949=this.redostack.pop();
if(_3949){
this.undostack.push(_3949);
_3949.redo();
}
};
CommandStack.prototype.canRedo=function(){
return this.redostack.length>0;
};
CommandStack.prototype.canUndo=function(){
return this.undostack.length>0;
};
CommandAdd=function(_3a5d,_3a5e,x,y,_3a61){
Command.call(this,"add figure");
this.parent=_3a61;
this.figure=_3a5e;
this.x=x;
this.y=y;
this.workflow=_3a5d;
};
CommandAdd.prototype=new Command;
CommandAdd.prototype.type="CommandAdd";
CommandAdd.prototype.execute=function(){
this.redo();
};
CommandAdd.prototype.redo=function(){
if(this.x&&this.y){
this.workflow.addFigure(this.figure,this.x,this.y);
}else{
this.workflow.addFigure(this.figure);
}
this.workflow.setCurrentSelection(this.figure);
if(this.parent!=null){
this.parent.addChild(this.figure);
}
};
CommandAdd.prototype.undo=function(){
this.workflow.removeFigure(this.figure);
this.workflow.setCurrentSelection(null);
if(this.parent!=null){
this.parent.removeChild(this.figure);
}
};
CommandDelete=function(_3905){
Command.call(this,"delete figure");
this.parent=_3905.parent;
this.figure=_3905;
this.workflow=_3905.workflow;
this.connections=null;
};
CommandDelete.prototype=new Command;
CommandDelete.prototype.type="CommandDelete";
CommandDelete.prototype.execute=function(){
this.redo();
};
CommandDelete.prototype.undo=function(){
this.workflow.addFigure(this.figure);
if(this.figure instanceof Connection){
this.figure.reconnect();
}
this.workflow.setCurrentSelection(this.figure);
if(this.parent!=null){
this.parent.addChild(this.figure);
}
for(var i=0;i<this.connections.length;++i){
this.workflow.addFigure(this.connections[i]);
this.connections[i].reconnect();
}
};
CommandDelete.prototype.redo=function(){
this.workflow.removeFigure(this.figure);
this.workflow.setCurrentSelection(null);
if(this.figure.getPorts&&this.connections==null){
this.connections=new Array();
var ports=this.figure.getPorts();
for(var i=0;i<ports.length;i++){
if(ports[i].getConnections){
this.connections=this.connections.concat(ports[i].getConnections());
}
}
}
if(this.connections==null){
this.connections=new Array();
}
if(this.parent!=null){
this.parent.removeChild(this.figure);
}
for(var i=0;i<this.connections.length;++i){
this.workflow.removeFigure(this.connections[i]);
}
};
CommandMove=function(_390f,x,y){
Command.call(this,"move figure");
this.figure=_390f;
this.oldX=x;
this.oldY=y;
this.oldCompartment=_390f.getParent();
};
CommandMove.prototype=new Command;
CommandMove.prototype.type="CommandMove";
CommandMove.prototype.setPosition=function(x,y){
this.newX=x;
this.newY=y;
this.newCompartment=this.figure.workflow.getBestCompartmentFigure(x,y,this.figure);
};
CommandMove.prototype.canExecute=function(){
return this.newX!=this.oldX||this.newY!=this.oldY;
};
CommandMove.prototype.execute=function(){
this.redo();
};
CommandMove.prototype.undo=function(){
this.figure.setPosition(this.oldX,this.oldY);
if(this.newCompartment!=null){
this.newCompartment.removeChild(this.figure);
}
if(this.oldCompartment!=null){
this.oldCompartment.addChild(this.figure);
}
this.figure.workflow.moveResizeHandles(this.figure);
};
CommandMove.prototype.redo=function(){
this.figure.setPosition(this.newX,this.newY);
if(this.oldCompartment!=null){
this.oldCompartment.removeChild(this.figure);
}
if(this.newCompartment!=null){
this.newCompartment.addChild(this.figure);
}
this.figure.workflow.moveResizeHandles(this.figure);
};
CommandResize=function(_388a,width,_388c){
Command.call(this,"resize figure");
this.figure=_388a;
this.oldWidth=width;
this.oldHeight=_388c;
};
CommandResize.prototype=new Command;
CommandResize.prototype.type="CommandResize";
CommandResize.prototype.setDimension=function(width,_388e){
this.newWidth=width;
this.newHeight=_388e;
};
CommandResize.prototype.canExecute=function(){
return this.newWidth!=this.oldWidth||this.newHeight!=this.oldHeight;
};
CommandResize.prototype.execute=function(){
this.redo();
};
CommandResize.prototype.undo=function(){
this.figure.setDimension(this.oldWidth,this.oldHeight);
this.figure.workflow.moveResizeHandles(this.figure);
};
CommandResize.prototype.redo=function(){
this.figure.setDimension(this.newWidth,this.newHeight);
this.figure.workflow.moveResizeHandles(this.figure);
};
CommandSetText=function(figure, text){
Command.call(this,"set text");
this.figure=figure;
this.newText=text;
this.oldText=figure.getText();
};
CommandSetText.prototype=new Command;
CommandSetText.prototype.type="CommandSetText";
CommandSetText.prototype.execute=function(){
this.redo();
};
CommandSetText.prototype.redo=function(){
this.figure.setText(this.newText);
};
CommandSetText.prototype.undo=function(){
this.figure.setText(this.oldText);
};
CommandSetColor=function(_3477,color){
Command.call(this,"set color");
this.figure=_3477;
this.newColor=color;
this.oldColor=_3477.getColor();
};
CommandSetColor.prototype=new Command;
CommandSetColor.prototype.type="CommandSetColor";
CommandSetColor.prototype.execute=function(){
this.redo();
};
CommandSetColor.prototype.undo=function(){
this.figure.setColor(this.oldColor);
};
CommandSetColor.prototype.redo=function(){
this.figure.setColor(this.newColor);
};
CommandSetBackgroundColor=function(_287f,color){
Command.call(this,"set background color");
this.figure=_287f;
this.newColor=color;
this.oldColor=_287f.getBackgroundColor();
};
CommandSetBackgroundColor.prototype=new Command;
CommandSetBackgroundColor.prototype.type="CommandSetBackgroundColor";
CommandSetBackgroundColor.prototype.execute=function(){
this.redo();
};
CommandSetBackgroundColor.prototype.undo=function(){
this.figure.setBackgroundColor(this.oldColor);
};
CommandSetBackgroundColor.prototype.redo=function(){
this.figure.setBackgroundColor(this.newColor);
};
CommandConnect=function(_3a38,_3a39,_3a3a){
Command.call(this,"create connection");
this.workflow=_3a38;
this.source=_3a39;
this.target=_3a3a;
this.connection=null;
};
CommandConnect.prototype=new Command;
CommandConnect.prototype.type="CommandConnect";
CommandConnect.prototype.setConnection=function(_3a3b){
this.connection=_3a3b;
};
CommandConnect.prototype.execute=function(){
if(this.connection==null){
this.connection=new Connection();
}
this.connection.setSource(this.source);
this.connection.setTarget(this.target);
this.workflow.addFigure(this.connection);
};
CommandConnect.prototype.redo=function(){
this.workflow.addFigure(this.connection);
this.connection.reconnect();
};
CommandConnect.prototype.undo=function(){
this.workflow.removeFigure(this.connection);
};
CommandMoveLine=function(line,_2ff3,_2ff4,endX,endY){
Command.call(this,"move line");
this.line=line;
this.startX1=_2ff3;
this.startY1=_2ff4;
this.endX1=endX;
this.endY1=endY;
};
CommandMoveLine.prototype=new Command;
CommandMoveLine.prototype.type="CommandMoveLine";
CommandMoveLine.prototype.canExecute=function(){
return this.startX1!=this.startX2||this.startY1!=this.startY2||this.endX1!=this.endX2||this.endY1!=this.endY2;
};
CommandMoveLine.prototype.setEndPoints=function(_2ff7,_2ff8,endX,endY){
this.startX2=_2ff7;
this.startY2=_2ff8;
this.endX2=endX;
this.endY2=endY;
};
CommandMoveLine.prototype.execute=function(){
this.redo();
};
CommandMoveLine.prototype.undo=function(){
this.line.setStartPoint(this.startX1,this.startY1);
this.line.setEndPoint(this.endX1,this.endY1);
if(this.line.workflow.getCurrentSelection()==this.line){
this.line.workflow.showLineResizeHandles(this.line);
}
};
CommandMoveLine.prototype.redo=function(){
this.line.setStartPoint(this.startX2,this.startY2);
this.line.setEndPoint(this.endX2,this.endY2);
if(this.line.workflow.getCurrentSelection()==this.line){
this.line.workflow.showLineResizeHandles(this.line);
}
};
Menu=function(){
this.menuItems=new Array();
Figure.call(this);
this.setSelectable(false);
this.setDeleteable(false);
this.setCanDrag(false);
this.setResizeable(false);
this.setSelectable(false);
this.setZOrder(10000);
this.dirty=false;
};
Menu.prototype=new Figure;
Menu.prototype.type="Menu";
Menu.prototype.createHTMLElement=function(){
var item=document.createElement("div");
item.style.position="absolute";
item.style.left=this.x+"px";
item.style.top=this.y+"px";
item.style.margin="0px";
item.style.padding="0px";
item.style.zIndex=""+Figure.ZOrderBaseIndex;
item.style.border="1px solid gray";
item.style.background="lavender";
item.style.cursor="pointer";
return item;
};
Menu.prototype.setWorkflow=function(_3bac){
this.workflow=_3bac;
};
Menu.prototype.appendMenuItem=function(item){
this.menuItems.push(item);
item.parentMenu=this;
this.dirty=true;
};
Menu.prototype.getHTMLElement=function(){
var html=Figure.prototype.getHTMLElement.call(this);
if(this.dirty){
this.createList();
}
return html;
};
Menu.prototype.createList=function(){
this.dirty=false;
this.html.innerHTML="";
var oThis=this;
for(var i=0;i<this.menuItems.length;i++){
var item=this.menuItems[i];
var li=document.createElement("a");
li.innerHTML=item.getLabel();
li.style.display="block";
li.style.fontFamily="Verdana, Arial, Helvetica, sans-serif";
li.style.fontSize="9pt";
li.style.color="dimgray";
li.style.borderBottom="1px solid silver";
li.style.paddingLeft="5px";
li.style.paddingRight="5px";
li.style.cursor="pointer";
this.html.appendChild(li);
li.menuItem=item;
if(li.addEventListener){
li.addEventListener("click",function(event){
var _3bb4=arguments[0]||window.event;
_3bb4.cancelBubble=true;
_3bb4.returnValue=false;
var diffX=_3bb4.clientX;
var diffY=_3bb4.clientY;
var _3bb7=document.body.parentNode.scrollLeft;
var _3bb8=document.body.parentNode.scrollTop;
this.menuItem.execute(diffX+_3bb7,diffY+_3bb8);
},false);
li.addEventListener("mouseup",function(event){
event.cancelBubble=true;
event.returnValue=false;
},false);
li.addEventListener("mousedown",function(event){
event.cancelBubble=true;
event.returnValue=false;
},false);
li.addEventListener("mouseover",function(event){
this.style.backgroundColor="silver";
},false);
li.addEventListener("mouseout",function(event){
this.style.backgroundColor="transparent";
},false);
}else{
if(li.attachEvent){
li.attachEvent("onclick",function(event){
var _3bbe=arguments[0]||window.event;
_3bbe.cancelBubble=true;
_3bbe.returnValue=false;
var diffX=_3bbe.clientX;
var diffY=_3bbe.clientY;
var _3bc1=document.body.parentNode.scrollLeft;
var _3bc2=document.body.parentNode.scrollTop;
event.srcElement.menuItem.execute(diffX+_3bc1,diffY+_3bc2);
});
li.attachEvent("onmousedown",function(event){
event.cancelBubble=true;
event.returnValue=false;
});
li.attachEvent("onmouseup",function(event){
event.cancelBubble=true;
event.returnValue=false;
});
li.attachEvent("onmouseover",function(event){
event.srcElement.style.backgroundColor="silver";
});
li.attachEvent("onmouseout",function(event){
event.srcElement.style.backgroundColor="transparent";
});
}
}
}
};
MenuItem=function(label,_3935,_3936){
this.label=label;
this.iconUrl=_3935;
this.parentMenu=null;
this.action=_3936;
};
MenuItem.prototype.type="MenuItem";
MenuItem.prototype.isEnabled=function(){
return true;
};
MenuItem.prototype.getLabel=function(){
return this.label;
};
MenuItem.prototype.execute=function(x,y){
this.parentMenu.workflow.showMenu(null);
this.action(x,y);
};
