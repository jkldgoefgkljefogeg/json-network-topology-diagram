MyOutputPort=function(_2d21){
OutputPort.call(this,_2d21);
};
MyOutputPort.prototype=new OutputPort;
MyOutputPort.prototype.type="MyOutputPort";
MyOutputPort.prototype.onDrop=function(port){
if(this.getMaxFanOut()<=this.getFanOut()){
return;
}
if(this.parentNode.id==port.parentNode.id){
}else{
var _2d23=new CommandConnect(this.parentNode.workflow,this,port);
_2d23.setConnection(new ContextmenuConnection());
this.parentNode.workflow.getCommandStack().execute(_2d23);
}
};
