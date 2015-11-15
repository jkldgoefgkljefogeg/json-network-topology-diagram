var Prototype={Version:"1.5.0",BrowserFeatures:{XPath:!!document.evaluate},ScriptFragment:"(?:<script.*?>)((\n|\r|.)*?)(?:</script>)",emptyFunction:function(){
},K:function(x){
return x;
}};
var Class={create:function(){
return function(){
this.initialize.apply(this,arguments);
};
}};
var Abstract=new Object();
Object.extend=function(_35e2,_35e3){
for(var _35e4 in _35e3){
_35e2[_35e4]=_35e3[_35e4];
}
return _35e2;
};
Object.extend(Object,{inspect:function(_35e5){
try{
if(_35e5===undefined){
return "undefined";
}
if(_35e5===null){
return "null";
}
return _35e5.inspect?_35e5.inspect():_35e5.toString();
}
catch(e){
if(e instanceof RangeError){
return "...";
}
throw e;
}
},keys:function(_35e6){
var keys=[];
for(var _35e8 in _35e6){
keys.push(_35e8);
}
return keys;
},values:function(_35e9){
var _35ea=[];
for(var _35eb in _35e9){
_35ea.push(_35e9[_35eb]);
}
return _35ea;
},clone:function(_35ec){
return Object.extend({},_35ec);
}});
Function.prototype.bind=function(){
var _35ed=this,args=$A(arguments),object=args.shift();
return function(){
return _35ed.apply(object,args.concat($A(arguments)));
};
};
Function.prototype.bindAsEventListener=function(_35ee){
var _35ef=this,args=$A(arguments),_35ee=args.shift();
return function(event){
return _35ef.apply(_35ee,[(event||window.event)].concat(args).concat($A(arguments)));
};
};
Object.extend(Number.prototype,{toColorPart:function(){
var _35f1=this.toString(16);
if(this<16){
return "0"+_35f1;
}
return _35f1;
},succ:function(){
return this+1;
},times:function(_35f2){
$R(0,this,true).each(_35f2);
return this;
}});
var Try={these:function(){
var _35f3;
for(var i=0,length=arguments.length;i<length;i++){
var _35f5=arguments[i];
try{
_35f3=_35f5();
break;
}
catch(e){
}
}
return _35f3;
}};
var PeriodicalExecuter=Class.create();
PeriodicalExecuter.prototype={initialize:function(_35f6,_35f7){
this.callback=_35f6;
this.frequency=_35f7;
this.currentlyExecuting=false;
this.registerCallback();
},registerCallback:function(){
this.timer=setInterval(this.onTimerEvent.bind(this),this.frequency*1000);
},stop:function(){
if(!this.timer){
return;
}
clearInterval(this.timer);
this.timer=null;
},onTimerEvent:function(){
if(!this.currentlyExecuting){
try{
this.currentlyExecuting=true;
this.callback(this);
}
finally{
this.currentlyExecuting=false;
}
}
}};
String.interpret=function(value){
return value==null?"":String(value);
};
Object.extend(String.prototype,{gsub:function(_35f9,_35fa){
var _35fb="",source=this,match;
_35fa=arguments.callee.prepareReplacement(_35fa);
while(source.length>0){
if(match=source.match(_35f9)){
_35fb+=source.slice(0,match.index);
_35fb+=String.interpret(_35fa(match));
source=source.slice(match.index+match[0].length);
}else{
_35fb+=source,source="";
}
}
return _35fb;
},sub:function(_35fc,_35fd,count){
_35fd=this.gsub.prepareReplacement(_35fd);
count=count===undefined?1:count;
return this.gsub(_35fc,function(match){
if(--count<0){
return match[0];
}
return _35fd(match);
});
},scan:function(_3600,_3601){
this.gsub(_3600,_3601);
return this;
},truncate:function(_3602,_3603){
_3602=_3602||30;
_3603=_3603===undefined?"...":_3603;
return this.length>_3602?this.slice(0,_3602-_3603.length)+_3603:this;
},strip:function(){
return this.replace(/^\s+/,"").replace(/\s+$/,"");
},stripTags:function(){
return this.replace(/<\/?[^>]+>/gi,"");
},stripScripts:function(){
return this.replace(new RegExp(Prototype.ScriptFragment,"img"),"");
},extractScripts:function(){
var _3604=new RegExp(Prototype.ScriptFragment,"img");
var _3605=new RegExp(Prototype.ScriptFragment,"im");
return (this.match(_3604)||[]).map(function(_3606){
return (_3606.match(_3605)||["",""])[1];
});
},evalScripts:function(){
return this.extractScripts().map(function(_3607){
return eval(_3607);
});
},escapeHTML:function(){
var div=document.createElement("div");
var text=document.createTextNode(this);
div.appendChild(text);
return div.innerHTML;
},unescapeHTML:function(){
var div=document.createElement("div");
div.innerHTML=this.stripTags();
return div.childNodes[0]?(div.childNodes.length>1?$A(div.childNodes).inject("",function(memo,node){
return memo+node.nodeValue;
}):div.childNodes[0].nodeValue):"";
},toQueryParams:function(_360d){
var match=this.strip().match(/([^?#]*)(#.*)?$/);
if(!match){
return {};
}
return match[1].split(_360d||"&").inject({},function(hash,pair){
if((pair=pair.split("="))[0]){
var name=decodeURIComponent(pair[0]);
var value=pair[1]?decodeURIComponent(pair[1]):undefined;
if(hash[name]!==undefined){
if(hash[name].constructor!=Array){
hash[name]=[hash[name]];
}
if(value){
hash[name].push(value);
}
}else{
hash[name]=value;
}
}
return hash;
});
},toArray:function(){
return this.split("");
},succ:function(){
return this.slice(0,this.length-1)+String.fromCharCode(this.charCodeAt(this.length-1)+1);
},camelize:function(){
var parts=this.split("-"),len=parts.length;
if(len==1){
return parts[0];
}
var _3614=this.charAt(0)=="-"?parts[0].charAt(0).toUpperCase()+parts[0].substring(1):parts[0];
for(var i=1;i<len;i++){
_3614+=parts[i].charAt(0).toUpperCase()+parts[i].substring(1);
}
return _3614;
},capitalize:function(){
return this.charAt(0).toUpperCase()+this.substring(1).toLowerCase();
},underscore:function(){
return this.gsub(/::/,"/").gsub(/([A-Z]+)([A-Z][a-z])/,"#{1}_#{2}").gsub(/([a-z\d])([A-Z])/,"#{1}_#{2}").gsub(/-/,"_").toLowerCase();
},dasherize:function(){
return this.gsub(/_/,"-");
},inspect:function(_3616){
var _3617=this.replace(/\\/g,"\\\\");
if(_3616){
return "\""+_3617.replace(/"/g,"\\\"")+"\"";
}else{
return "'"+_3617.replace(/'/g,"\\'")+"'";
}
}});
String.prototype.gsub.prepareReplacement=function(_3618){
if(typeof _3618=="function"){
return _3618;
}
var _3619=new Template(_3618);
return function(match){
return _3619.evaluate(match);
};
};
String.prototype.parseQuery=String.prototype.toQueryParams;
var Template=Class.create();
Template.Pattern=/(^|.|\r|\n)(#\{(.*?)\})/;
Template.prototype={initialize:function(_361b,_361c){
this.template=_361b.toString();
this.pattern=_361c||Template.Pattern;
},evaluate:function(_361d){
return this.template.gsub(this.pattern,function(match){
var _361f=match[1];
if(_361f=="\\"){
return match[2];
}
return _361f+String.interpret(_361d[match[3]]);
});
}};
var $break=new Object();
var $continue=new Object();
var Enumerable={each:function(_3620){
var index=0;
try{
this._each(function(value){
try{
_3620(value,index++);
}
catch(e){
if(e!=$continue){
throw e;
}
}
});
}
catch(e){
if(e!=$break){
throw e;
}
}
return this;
},eachSlice:function(_3623,_3624){
var index=-_3623,slices=[],array=this.toArray();
while((index+=_3623)<array.length){
slices.push(array.slice(index,index+_3623));
}
return slices.map(_3624);
},all:function(_3626){
var _3627=true;
this.each(function(value,index){
_3627=_3627&&!!(_3626||Prototype.K)(value,index);
if(!_3627){
throw $break;
}
});
return _3627;
},any:function(_362a){
var _362b=false;
this.each(function(value,index){
if(_362b=!!(_362a||Prototype.K)(value,index)){
throw $break;
}
});
return _362b;
},collect:function(_362e){
var _362f=[];
this.each(function(value,index){
_362f.push((_362e||Prototype.K)(value,index));
});
return _362f;
},detect:function(_3632){
var _3633;
this.each(function(value,index){
if(_3632(value,index)){
_3633=value;
throw $break;
}
});
return _3633;
},findAll:function(_3636){
var _3637=[];
this.each(function(value,index){
if(_3636(value,index)){
_3637.push(value);
}
});
return _3637;
},grep:function(_363a,_363b){
var _363c=[];
this.each(function(value,index){
var _363f=value.toString();
if(_363f.match(_363a)){
_363c.push((_363b||Prototype.K)(value,index));
}
});
return _363c;
},include:function(_3640){
var found=false;
this.each(function(value){
if(value==_3640){
found=true;
throw $break;
}
});
return found;
},inGroupsOf:function(_3643,_3644){
_3644=_3644===undefined?null:_3644;
return this.eachSlice(_3643,function(slice){
while(slice.length<_3643){
slice.push(_3644);
}
return slice;
});
},inject:function(memo,_3647){
this.each(function(value,index){
memo=_3647(memo,value,index);
});
return memo;
},invoke:function(_364a){
var args=$A(arguments).slice(1);
return this.map(function(value){
return value[_364a].apply(value,args);
});
},max:function(_364d){
var _364e;
this.each(function(value,index){
value=(_364d||Prototype.K)(value,index);
if(_364e==undefined||value>=_364e){
_364e=value;
}
});
return _364e;
},min:function(_3651){
var _3652;
this.each(function(value,index){
value=(_3651||Prototype.K)(value,index);
if(_3652==undefined||value<_3652){
_3652=value;
}
});
return _3652;
},partition:function(_3655){
var trues=[],falses=[];
this.each(function(value,index){
((_3655||Prototype.K)(value,index)?trues:falses).push(value);
});
return [trues,falses];
},pluck:function(_3659){
var _365a=[];
this.each(function(value,index){
_365a.push(value[_3659]);
});
return _365a;
},reject:function(_365d){
var _365e=[];
this.each(function(value,index){
if(!_365d(value,index)){
_365e.push(value);
}
});
return _365e;
},sortBy:function(_3661){
return this.map(function(value,index){
return {value:value,criteria:_3661(value,index)};
}).sort(function(left,right){
var a=left.criteria,b=right.criteria;
return a<b?-1:a>b?1:0;
}).pluck("value");
},toArray:function(){
return this.map();
},zip:function(){
var _3667=Prototype.K,args=$A(arguments);
if(typeof args.last()=="function"){
_3667=args.pop();
}
var _3668=[this].concat(args).map($A);
return this.map(function(value,index){
return _3667(_3668.pluck(index));
});
},size:function(){
return this.toArray().length;
},inspect:function(){
return "#<Enumerable:"+this.toArray().inspect()+">";
}};
Object.extend(Enumerable,{map:Enumerable.collect,find:Enumerable.detect,select:Enumerable.findAll,member:Enumerable.include,entries:Enumerable.toArray});
var $A=Array.from=function(_366b){
if(!_366b){
return [];
}
if(_366b.toArray){
return _366b.toArray();
}else{
var _366c=[];
for(var i=0,length=_366b.length;i<length;i++){
_366c.push(_366b[i]);
}
return _366c;
}
};
Object.extend(Array.prototype,Enumerable);
if(!Array.prototype._reverse){
Array.prototype._reverse=Array.prototype.reverse;
}
Object.extend(Array.prototype,{_each:function(_366e){
for(var i=0,length=this.length;i<length;i++){
_366e(this[i]);
}
},clear:function(){
this.length=0;
return this;
},first:function(){
return this[0];
},last:function(){
return this[this.length-1];
},compact:function(){
return this.select(function(value){
return value!=null;
});
},flatten:function(){
return this.inject([],function(array,value){
return array.concat(value&&value.constructor==Array?value.flatten():[value]);
});
},without:function(){
var _3673=$A(arguments);
return this.select(function(value){
return !_3673.include(value);
});
},indexOf:function(_3675){
for(var i=0,length=this.length;i<length;i++){
if(this[i]==_3675){
return i;
}
}
return -1;
},reverse:function(_3677){
return (_3677!==false?this:this.toArray())._reverse();
},reduce:function(){
return this.length>1?this:this[0];
},uniq:function(){
return this.inject([],function(array,value){
return array.include(value)?array:array.concat([value]);
});
},clone:function(){
return [].concat(this);
},size:function(){
return this.length;
},inspect:function(){
return "["+this.map(Object.inspect).join(", ")+"]";
}});
Array.prototype.toArray=Array.prototype.clone;
function $w(_367a){
_367a=_367a.strip();
return _367a?_367a.split(/\s+/):[];
}
if(window.opera){
Array.prototype.concat=function(){
var array=[];
for(var i=0,length=this.length;i<length;i++){
array.push(this[i]);
}
for(var i=0,length=arguments.length;i<length;i++){
if(arguments[i].constructor==Array){
for(var j=0,arrayLength=arguments[i].length;j<arrayLength;j++){
array.push(arguments[i][j]);
}
}else{
array.push(arguments[i]);
}
}
return array;
};
}
var Hash=function(obj){
Object.extend(this,obj||{});
};
Object.extend(Hash,{toQueryString:function(obj){
var parts=[];
this.prototype._each.call(obj,function(pair){
if(!pair.key){
return;
}
if(pair.value&&pair.value.constructor==Array){
var _3682=pair.value.compact();
if(_3682.length<2){
pair.value=_3682.reduce();
}else{
key=encodeURIComponent(pair.key);
_3682.each(function(value){
value=value!=undefined?encodeURIComponent(value):"";
parts.push(key+"="+encodeURIComponent(value));
});
return;
}
}
if(pair.value==undefined){
pair[1]="";
}
parts.push(pair.map(encodeURIComponent).join("="));
});
return parts.join("&");
}});
Object.extend(Hash.prototype,Enumerable);
Object.extend(Hash.prototype,{_each:function(_3684){
for(var key in this){
var value=this[key];
if(value&&value==Hash.prototype[key]){
continue;
}
var pair=[key,value];
pair.key=key;
pair.value=value;
_3684(pair);
}
},keys:function(){
return this.pluck("key");
},values:function(){
return this.pluck("value");
},merge:function(hash){
return $H(hash).inject(this,function(_3689,pair){
_3689[pair.key]=pair.value;
return _3689;
});
},remove:function(){
var _368b;
for(var i=0,length=arguments.length;i<length;i++){
var value=this[arguments[i]];
if(value!==undefined){
if(_368b===undefined){
_368b=value;
}else{
if(_368b.constructor!=Array){
_368b=[_368b];
}
_368b.push(value);
}
}
delete this[arguments[i]];
}
return _368b;
},toQueryString:function(){
return Hash.toQueryString(this);
},inspect:function(){
return "#<Hash:{"+this.map(function(pair){
return pair.map(Object.inspect).join(": ");
}).join(", ")+"}>";
}});
function $H(_368f){
if(_368f&&_368f.constructor==Hash){
return _368f;
}
return new Hash(_368f);
}
ObjectRange=Class.create();
Object.extend(ObjectRange.prototype,Enumerable);
Object.extend(ObjectRange.prototype,{initialize:function(start,end,_3692){
this.start=start;
this.end=end;
this.exclusive=_3692;
},_each:function(_3693){
var value=this.start;
while(this.include(value)){
_3693(value);
value=value.succ();
}
},include:function(value){
if(value<this.start){
return false;
}
if(this.exclusive){
return value<this.end;
}
return value<=this.end;
}});
var $R=function(start,end,_3698){
return new ObjectRange(start,end,_3698);
};
var Ajax={getTransport:function(){
return Try.these(function(){
return new XMLHttpRequest();
},function(){
return new ActiveXObject("Msxml2.XMLHTTP");
},function(){
return new ActiveXObject("Microsoft.XMLHTTP");
})||false;
},activeRequestCount:0};
Ajax.Responders={responders:[],_each:function(_3699){
this.responders._each(_3699);
},register:function(_369a){
if(!this.include(_369a)){
this.responders.push(_369a);
}
},unregister:function(_369b){
this.responders=this.responders.without(_369b);
},dispatch:function(_369c,_369d,_369e,json){
this.each(function(_36a0){
if(typeof _36a0[_369c]=="function"){
try{
_36a0[_369c].apply(_36a0,[_369d,_369e,json]);
}
catch(e){
}
}
});
}};
Object.extend(Ajax.Responders,Enumerable);
Ajax.Responders.register({onCreate:function(){
Ajax.activeRequestCount++;
},onComplete:function(){
Ajax.activeRequestCount--;
}});
Ajax.Base=function(){
};
Ajax.Base.prototype={setOptions:function(_36a1){
this.options={method:"post",asynchronous:true,contentType:"application/x-www-form-urlencoded",encoding:"UTF-8",parameters:""};
Object.extend(this.options,_36a1||{});
this.options.method=this.options.method.toLowerCase();
if(typeof this.options.parameters=="string"){
this.options.parameters=this.options.parameters.toQueryParams();
}
}};
Ajax.Request=Class.create();
Ajax.Request.Events=["Uninitialized","Loading","Loaded","Interactive","Complete"];
Ajax.Request.prototype=Object.extend(new Ajax.Base(),{_complete:false,initialize:function(url,_36a3){
this.transport=Ajax.getTransport();
this.setOptions(_36a3);
this.request(url);
},request:function(url){
this.url=url;
this.method=this.options.method;
var _36a5=this.options.parameters;
if(!["get","post"].include(this.method)){
_36a5["_method"]=this.method;
this.method="post";
}
_36a5=Hash.toQueryString(_36a5);
if(_36a5&&/Konqueror|Safari|KHTML/.test(navigator.userAgent)){
_36a5+="&_=";
}
if(this.method=="get"&&_36a5){
this.url+=(this.url.indexOf("?")>-1?"&":"?")+_36a5;
}
try{
Ajax.Responders.dispatch("onCreate",this,this.transport);
this.transport.open(this.method.toUpperCase(),this.url,this.options.asynchronous);
if(this.options.asynchronous){
setTimeout(function(){
this.respondToReadyState(1);
}.bind(this),10);
}
this.transport.onreadystatechange=this.onStateChange.bind(this);
this.setRequestHeaders();
var body=this.method=="post"?(this.options.postBody||_36a5):null;
this.transport.send(body);
if(!this.options.asynchronous&&this.transport.overrideMimeType){
this.onStateChange();
}
}
catch(e){
this.dispatchException(e);
}
},onStateChange:function(){
var _36a7=this.transport.readyState;
if(_36a7>1&&!((_36a7==4)&&this._complete)){
this.respondToReadyState(this.transport.readyState);
}
},setRequestHeaders:function(){
var _36a8={"X-Requested-With":"XMLHttpRequest","X-Prototype-Version":Prototype.Version,"Accept":"text/javascript, text/html, application/xml, text/xml, */*"};
if(this.method=="post"){
_36a8["Content-type"]=this.options.contentType+(this.options.encoding?"; charset="+this.options.encoding:"");
if(this.transport.overrideMimeType&&(navigator.userAgent.match(/Gecko\/(\d{4})/)||[0,2005])[1]<2005){
_36a8["Connection"]="close";
}
}
if(typeof this.options.requestHeaders=="object"){
var _36a9=this.options.requestHeaders;
if(typeof _36a9.push=="function"){
for(var i=0,length=_36a9.length;i<length;i+=2){
_36a8[_36a9[i]]=_36a9[i+1];
}
}else{
$H(_36a9).each(function(pair){
_36a8[pair.key]=pair.value;
});
}
}
for(var name in _36a8){
this.transport.setRequestHeader(name,_36a8[name]);
}
},success:function(){
return !this.transport.status||(this.transport.status>=200&&this.transport.status<300);
},respondToReadyState:function(_36ad){
var state=Ajax.Request.Events[_36ad];
var _36af=this.transport,json=this.evalJSON();
if(state=="Complete"){
try{
this._complete=true;
(this.options["on"+this.transport.status]||this.options["on"+(this.success()?"Success":"Failure")]||Prototype.emptyFunction)(_36af,json);
}
catch(e){
this.dispatchException(e);
}
if((this.getHeader("Content-type")||"text/javascript").strip().match(/^(text|application)\/(x-)?(java|ecma)script(;.*)?$/i)){
this.evalResponse();
}
}
try{
(this.options["on"+state]||Prototype.emptyFunction)(_36af,json);
Ajax.Responders.dispatch("on"+state,this,_36af,json);
}
catch(e){
this.dispatchException(e);
}
if(state=="Complete"){
this.transport.onreadystatechange=Prototype.emptyFunction;
}
},getHeader:function(name){
try{
return this.transport.getResponseHeader(name);
}
catch(e){
return null;
}
},evalJSON:function(){
try{
var json=this.getHeader("X-JSON");
return json?eval("("+json+")"):null;
}
catch(e){
return null;
}
},evalResponse:function(){
try{
return eval(this.transport.responseText);
}
catch(e){
this.dispatchException(e);
}
},dispatchException:function(_36b2){
(this.options.onException||Prototype.emptyFunction)(this,_36b2);
Ajax.Responders.dispatch("onException",this,_36b2);
}});
Ajax.Updater=Class.create();
Object.extend(Object.extend(Ajax.Updater.prototype,Ajax.Request.prototype),{initialize:function(_36b3,url,_36b5){
this.container={success:(_36b3.success||_36b3),failure:(_36b3.failure||(_36b3.success?null:_36b3))};
this.transport=Ajax.getTransport();
this.setOptions(_36b5);
var _36b6=this.options.onComplete||Prototype.emptyFunction;
this.options.onComplete=(function(_36b7,param){
this.updateContent();
_36b6(_36b7,param);
}).bind(this);
this.request(url);
},updateContent:function(){
var _36b9=this.container[this.success()?"success":"failure"];
var _36ba=this.transport.responseText;
if(!this.options.evalScripts){
_36ba=_36ba.stripScripts();
}
if(_36b9=$(_36b9)){
if(this.options.insertion){
new this.options.insertion(_36b9,_36ba);
}else{
_36b9.update(_36ba);
}
}
if(this.success()){
if(this.onComplete){
setTimeout(this.onComplete.bind(this),10);
}
}
}});
Ajax.PeriodicalUpdater=Class.create();
Ajax.PeriodicalUpdater.prototype=Object.extend(new Ajax.Base(),{initialize:function(_36bb,url,_36bd){
this.setOptions(_36bd);
this.onComplete=this.options.onComplete;
this.frequency=(this.options.frequency||2);
this.decay=(this.options.decay||1);
this.updater={};
this.container=_36bb;
this.url=url;
this.start();
},start:function(){
this.options.onComplete=this.updateComplete.bind(this);
this.onTimerEvent();
},stop:function(){
this.updater.options.onComplete=undefined;
clearTimeout(this.timer);
(this.onComplete||Prototype.emptyFunction).apply(this,arguments);
},updateComplete:function(_36be){
if(this.options.decay){
this.decay=(_36be.responseText==this.lastText?this.decay*this.options.decay:1);
this.lastText=_36be.responseText;
}
this.timer=setTimeout(this.onTimerEvent.bind(this),this.decay*this.frequency*1000);
},onTimerEvent:function(){
this.updater=new Ajax.Updater(this.container,this.url,this.options);
}});
function $(_36bf){
if(arguments.length>1){
for(var i=0,elements=[],length=arguments.length;i<length;i++){
elements.push($(arguments[i]));
}
return elements;
}
if(typeof _36bf=="string"){
_36bf=document.getElementById(_36bf);
}
return Element.extend(_36bf);
}
if(Prototype.BrowserFeatures.XPath){
document._getElementsByXPath=function(_36c1,_36c2){
var _36c3=[];
var query=document.evaluate(_36c1,$(_36c2)||document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0,length=query.snapshotLength;i<length;i++){
_36c3.push(query.snapshotItem(i));
}
return _36c3;
};
}
document.getElementsByClassName=function(_36c6,_36c7){
if(Prototype.BrowserFeatures.XPath){
var q=".//*[contains(concat(' ', @class, ' '), ' "+_36c6+" ')]";
return document._getElementsByXPath(q,_36c7);
}else{
var _36c9=($(_36c7)||document.body).getElementsByTagName("*");
var _36ca=[],child;
for(var i=0,length=_36c9.length;i<length;i++){
child=_36c9[i];
if(Element.hasClassName(child,_36c6)){
_36ca.push(Element.extend(child));
}
}
return _36ca;
}
};
if(!window.Element){
var Element=new Object();
}
Element.extend=function(_36cc){
if(!_36cc||_nativeExtensions||_36cc.nodeType==3){
return _36cc;
}
if(!_36cc._extended&&_36cc.tagName&&_36cc!=window){
var _36cd=Object.clone(Element.Methods),cache=Element.extend.cache;
if(_36cc.tagName=="FORM"){
Object.extend(_36cd,Form.Methods);
}
if(["INPUT","TEXTAREA","SELECT"].include(_36cc.tagName)){
Object.extend(_36cd,Form.Element.Methods);
}
Object.extend(_36cd,Element.Methods.Simulated);
for(var _36ce in _36cd){
var value=_36cd[_36ce];
if(typeof value=="function"&&!(_36ce in _36cc)){
_36cc[_36ce]=cache.findOrStore(value);
}
}
}
_36cc._extended=true;
return _36cc;
};
Element.extend.cache={findOrStore:function(value){
return this[value]=this[value]||function(){
return value.apply(null,[this].concat($A(arguments)));
};
}};
Element.Methods={visible:function(_36d1){
return $(_36d1).style.display!="none";
},toggle:function(_36d2){
_36d2=$(_36d2);
Element[Element.visible(_36d2)?"hide":"show"](_36d2);
return _36d2;
},hide:function(_36d3){
$(_36d3).style.display="none";
return _36d3;
},show:function(_36d4){
$(_36d4).style.display="";
return _36d4;
},remove:function(_36d5){
_36d5=$(_36d5);
_36d5.parentNode.removeChild(_36d5);
return _36d5;
},update:function(_36d6,html){
html=typeof html=="undefined"?"":html.toString();
$(_36d6).innerHTML=html.stripScripts();
setTimeout(function(){
html.evalScripts();
},10);
return _36d6;
},replace:function(_36d8,html){
_36d8=$(_36d8);
html=typeof html=="undefined"?"":html.toString();
if(_36d8.outerHTML){
_36d8.outerHTML=html.stripScripts();
}else{
var range=_36d8.ownerDocument.createRange();
range.selectNodeContents(_36d8);
_36d8.parentNode.replaceChild(range.createContextualFragment(html.stripScripts()),_36d8);
}
setTimeout(function(){
html.evalScripts();
},10);
return _36d8;
},inspect:function(_36db){
_36db=$(_36db);
var _36dc="<"+_36db.tagName.toLowerCase();
$H({"id":"id","className":"class"}).each(function(pair){
var _36de=pair.first(),attribute=pair.last();
var value=(_36db[_36de]||"").toString();
if(value){
_36dc+=" "+attribute+"="+value.inspect(true);
}
});
return _36dc+">";
},recursivelyCollect:function(_36e0,_36e1){
_36e0=$(_36e0);
var _36e2=[];
while(_36e0=_36e0[_36e1]){
if(_36e0.nodeType==1){
_36e2.push(Element.extend(_36e0));
}
}
return _36e2;
},ancestors:function(_36e3){
return $(_36e3).recursivelyCollect("parentNode");
},descendants:function(_36e4){
return $A($(_36e4).getElementsByTagName("*"));
},immediateDescendants:function(_36e5){
if(!(_36e5=$(_36e5).firstChild)){
return [];
}
while(_36e5&&_36e5.nodeType!=1){
_36e5=_36e5.nextSibling;
}
if(_36e5){
return [_36e5].concat($(_36e5).nextSiblings());
}
return [];
},previousSiblings:function(_36e6){
return $(_36e6).recursivelyCollect("previousSibling");
},nextSiblings:function(_36e7){
return $(_36e7).recursivelyCollect("nextSibling");
},siblings:function(_36e8){
_36e8=$(_36e8);
return _36e8.previousSiblings().reverse().concat(_36e8.nextSiblings());
},match:function(_36e9,_36ea){
if(typeof _36ea=="string"){
_36ea=new Selector(_36ea);
}
return _36ea.match($(_36e9));
},up:function(_36eb,_36ec,index){
return Selector.findElement($(_36eb).ancestors(),_36ec,index);
},down:function(_36ee,_36ef,index){
return Selector.findElement($(_36ee).descendants(),_36ef,index);
},previous:function(_36f1,_36f2,index){
return Selector.findElement($(_36f1).previousSiblings(),_36f2,index);
},next:function(_36f4,_36f5,index){
return Selector.findElement($(_36f4).nextSiblings(),_36f5,index);
},getElementsBySelector:function(){
var args=$A(arguments),element=$(args.shift());
return Selector.findChildElements(element,args);
},getElementsByClassName:function(_36f8,_36f9){
return document.getElementsByClassName(_36f9,_36f8);
},readAttribute:function(_36fa,name){
_36fa=$(_36fa);
if(document.all&&!window.opera){
var t=Element._attributeTranslations;
if(t.values[name]){
return t.values[name](_36fa,name);
}
if(t.names[name]){
name=t.names[name];
}
var _36fd=_36fa.attributes[name];
if(_36fd){
return _36fd.nodeValue;
}
}
return _36fa.getAttribute(name);
},getHeight:function(_36fe){
return $(_36fe).getDimensions().height;
},getWidth:function(_36ff){
return $(_36ff).getDimensions().width;
},classNames:function(_3700){
return new Element.ClassNames(_3700);
},hasClassName:function(_3701,_3702){
if(!(_3701=$(_3701))){
return;
}
var _3703=_3701.className;
if(_3703.length==0){
return false;
}
if(_3703==_3702||_3703.match(new RegExp("(^|\\s)"+_3702+"(\\s|$)"))){
return true;
}
return false;
},addClassName:function(_3704,_3705){
if(!(_3704=$(_3704))){
return;
}
Element.classNames(_3704).add(_3705);
return _3704;
},removeClassName:function(_3706,_3707){
if(!(_3706=$(_3706))){
return;
}
Element.classNames(_3706).remove(_3707);
return _3706;
},toggleClassName:function(_3708,_3709){
if(!(_3708=$(_3708))){
return;
}
Element.classNames(_3708)[_3708.hasClassName(_3709)?"remove":"add"](_3709);
return _3708;
},observe:function(){
Event.observe.apply(Event,arguments);
return $A(arguments).first();
},stopObserving:function(){
Event.stopObserving.apply(Event,arguments);
return $A(arguments).first();
},cleanWhitespace:function(_370a){
_370a=$(_370a);
var node=_370a.firstChild;
while(node){
var _370c=node.nextSibling;
if(node.nodeType==3&&!/\S/.test(node.nodeValue)){
_370a.removeChild(node);
}
node=_370c;
}
return _370a;
},empty:function(_370d){
return $(_370d).innerHTML.match(/^\s*$/);
},descendantOf:function(_370e,_370f){
_370e=$(_370e),_370f=$(_370f);
while(_370e=_370e.parentNode){
if(_370e==_370f){
return true;
}
}
return false;
},scrollTo:function(_3710){
_3710=$(_3710);
var pos=Position.cumulativeOffset(_3710);
window.scrollTo(pos[0],pos[1]);
return _3710;
},getStyle:function(_3712,style){
_3712=$(_3712);
if(["float","cssFloat"].include(style)){
style=(typeof _3712.style.styleFloat!="undefined"?"styleFloat":"cssFloat");
}
style=style.camelize();
var value=_3712.style[style];
if(!value){
if(document.defaultView&&document.defaultView.getComputedStyle){
var css=document.defaultView.getComputedStyle(_3712,null);
value=css?css[style]:null;
}else{
if(_3712.currentStyle){
value=_3712.currentStyle[style];
}
}
}
if((value=="auto")&&["width","height"].include(style)&&(_3712.getStyle("display")!="none")){
value=_3712["offset"+style.capitalize()]+"px";
}
if(window.opera&&["left","top","right","bottom"].include(style)){
if(Element.getStyle(_3712,"position")=="static"){
value="auto";
}
}
if(style=="opacity"){
if(value){
return parseFloat(value);
}
if(value=(_3712.getStyle("filter")||"").match(/alpha\(opacity=(.*)\)/)){
if(value[1]){
return parseFloat(value[1])/100;
}
}
return 1;
}
return value=="auto"?null:value;
},setStyle:function(_3716,style){
_3716=$(_3716);
for(var name in style){
var value=style[name];
if(name=="opacity"){
if(value==1){
value=(/Gecko/.test(navigator.userAgent)&&!/Konqueror|Safari|KHTML/.test(navigator.userAgent))?0.999999:1;
if(/MSIE/.test(navigator.userAgent)&&!window.opera){
_3716.style.filter=_3716.getStyle("filter").replace(/alpha\([^\)]*\)/gi,"");
}
}else{
if(value===""){
if(/MSIE/.test(navigator.userAgent)&&!window.opera){
_3716.style.filter=_3716.getStyle("filter").replace(/alpha\([^\)]*\)/gi,"");
}
}else{
if(value<0.00001){
value=0;
}
if(/MSIE/.test(navigator.userAgent)&&!window.opera){
_3716.style.filter=_3716.getStyle("filter").replace(/alpha\([^\)]*\)/gi,"")+"alpha(opacity="+value*100+")";
}
}
}
}else{
if(["float","cssFloat"].include(name)){
name=(typeof _3716.style.styleFloat!="undefined")?"styleFloat":"cssFloat";
}
}
_3716.style[name.camelize()]=value;
}
return _3716;
},getDimensions:function(_371a){
_371a=$(_371a);
var _371b=$(_371a).getStyle("display");
if(_371b!="none"&&_371b!=null){
return {width:_371a.offsetWidth,height:_371a.offsetHeight};
}
var els=_371a.style;
var _371d=els.visibility;
var _371e=els.position;
var _371f=els.display;
els.visibility="hidden";
els.position="absolute";
els.display="block";
var _3720=_371a.clientWidth;
var _3721=_371a.clientHeight;
els.display=_371f;
els.position=_371e;
els.visibility=_371d;
return {width:_3720,height:_3721};
},makePositioned:function(_3722){
_3722=$(_3722);
var pos=Element.getStyle(_3722,"position");
if(pos=="static"||!pos){
_3722._madePositioned=true;
_3722.style.position="relative";
if(window.opera){
_3722.style.top=0;
_3722.style.left=0;
}
}
return _3722;
},undoPositioned:function(_3724){
_3724=$(_3724);
if(_3724._madePositioned){
_3724._madePositioned=undefined;
_3724.style.position=_3724.style.top=_3724.style.left=_3724.style.bottom=_3724.style.right="";
}
return _3724;
},makeClipping:function(_3725){
_3725=$(_3725);
if(_3725._overflow){
return _3725;
}
_3725._overflow=_3725.style.overflow||"auto";
if((Element.getStyle(_3725,"overflow")||"visible")!="hidden"){
_3725.style.overflow="hidden";
}
return _3725;
},undoClipping:function(_3726){
_3726=$(_3726);
if(!_3726._overflow){
return _3726;
}
_3726.style.overflow=_3726._overflow=="auto"?"":_3726._overflow;
_3726._overflow=null;
return _3726;
}};
Object.extend(Element.Methods,{childOf:Element.Methods.descendantOf});
Element._attributeTranslations={};
Element._attributeTranslations.names={colspan:"colSpan",rowspan:"rowSpan",valign:"vAlign",datetime:"dateTime",accesskey:"accessKey",tabindex:"tabIndex",enctype:"encType",maxlength:"maxLength",readonly:"readOnly",longdesc:"longDesc"};
Element._attributeTranslations.values={_getAttr:function(_3727,_3728){
return _3727.getAttribute(_3728,2);
},_flag:function(_3729,_372a){
return $(_3729).hasAttribute(_372a)?_372a:null;
},style:function(_372b){
return _372b.style.cssText.toLowerCase();
},title:function(_372c){
var node=_372c.getAttributeNode("title");
return node.specified?node.nodeValue:null;
}};
Object.extend(Element._attributeTranslations.values,{href:Element._attributeTranslations.values._getAttr,src:Element._attributeTranslations.values._getAttr,disabled:Element._attributeTranslations.values._flag,checked:Element._attributeTranslations.values._flag,readonly:Element._attributeTranslations.values._flag,multiple:Element._attributeTranslations.values._flag});
Element.Methods.Simulated={hasAttribute:function(_372e,_372f){
var t=Element._attributeTranslations;
_372f=t.names[_372f]||_372f;
return $(_372e).getAttributeNode(_372f).specified;
}};
if(document.all&&!window.opera){
Element.Methods.update=function(_3731,html){
_3731=$(_3731);
html=typeof html=="undefined"?"":html.toString();
var _3733=_3731.tagName.toUpperCase();
if(["THEAD","TBODY","TR","TD"].include(_3733)){
var div=document.createElement("div");
switch(_3733){
case "THEAD":
case "TBODY":
div.innerHTML="<table><tbody>"+html.stripScripts()+"</tbody></table>";
depth=2;
break;
case "TR":
div.innerHTML="<table><tbody><tr>"+html.stripScripts()+"</tr></tbody></table>";
depth=3;
break;
case "TD":
div.innerHTML="<table><tbody><tr><td>"+html.stripScripts()+"</td></tr></tbody></table>";
depth=4;
}
$A(_3731.childNodes).each(function(node){
_3731.removeChild(node);
});
depth.times(function(){
div=div.firstChild;
});
$A(div.childNodes).each(function(node){
_3731.appendChild(node);
});
}else{
_3731.innerHTML=html.stripScripts();
}
setTimeout(function(){
html.evalScripts();
},10);
return _3731;
};
}
Object.extend(Element,Element.Methods);
var _nativeExtensions=false;
if(/Konqueror|Safari|KHTML/.test(navigator.userAgent)){
["","Form","Input","TextArea","Select"].each(function(tag){
var _3738="HTML"+tag+"Element";
if(window[_3738]){
return;
}
var klass=window[_3738]={};
klass.prototype=document.createElement(tag?tag.toLowerCase():"div").__proto__;
});
}
Element.addMethods=function(_373a){
Object.extend(Element.Methods,_373a||{});
function copy(_373b,_373c,_373d){
_373d=_373d||false;
var cache=Element.extend.cache;
for(var _373f in _373b){
var value=_373b[_373f];
if(!_373d||!(_373f in _373c)){
_373c[_373f]=cache.findOrStore(value);
}
}
}
if(typeof HTMLElement!="undefined"){
copy(Element.Methods,HTMLElement.prototype);
copy(Element.Methods.Simulated,HTMLElement.prototype,true);
copy(Form.Methods,HTMLFormElement.prototype);
[HTMLInputElement,HTMLTextAreaElement,HTMLSelectElement].each(function(klass){
copy(Form.Element.Methods,klass.prototype);
});
_nativeExtensions=true;
}
};
var Toggle=new Object();
Toggle.display=Element.toggle;
Abstract.Insertion=function(_3742){
this.adjacency=_3742;
};
Abstract.Insertion.prototype={initialize:function(_3743,_3744){
this.element=$(_3743);
this.content=_3744.stripScripts();
if(this.adjacency&&this.element.insertAdjacentHTML){
try{
this.element.insertAdjacentHTML(this.adjacency,this.content);
}
catch(e){
var _3745=this.element.tagName.toUpperCase();
if(["TBODY","TR"].include(_3745)){
this.insertContent(this.contentFromAnonymousTable());
}else{
throw e;
}
}
}else{
this.range=this.element.ownerDocument.createRange();
if(this.initializeRange){
this.initializeRange();
}
this.insertContent([this.range.createContextualFragment(this.content)]);
}
setTimeout(function(){
_3744.evalScripts();
},10);
},contentFromAnonymousTable:function(){
var div=document.createElement("div");
div.innerHTML="<table><tbody>"+this.content+"</tbody></table>";
return $A(div.childNodes[0].childNodes[0].childNodes);
}};
var Insertion=new Object();
Insertion.Before=Class.create();
Insertion.Before.prototype=Object.extend(new Abstract.Insertion("beforeBegin"),{initializeRange:function(){
this.range.setStartBefore(this.element);
},insertContent:function(_3747){
_3747.each((function(_3748){
this.element.parentNode.insertBefore(_3748,this.element);
}).bind(this));
}});
Insertion.Top=Class.create();
Insertion.Top.prototype=Object.extend(new Abstract.Insertion("afterBegin"),{initializeRange:function(){
this.range.selectNodeContents(this.element);
this.range.collapse(true);
},insertContent:function(_3749){
_3749.reverse(false).each((function(_374a){
this.element.insertBefore(_374a,this.element.firstChild);
}).bind(this));
}});
Insertion.Bottom=Class.create();
Insertion.Bottom.prototype=Object.extend(new Abstract.Insertion("beforeEnd"),{initializeRange:function(){
this.range.selectNodeContents(this.element);
this.range.collapse(this.element);
},insertContent:function(_374b){
_374b.each((function(_374c){
this.element.appendChild(_374c);
}).bind(this));
}});
Insertion.After=Class.create();
Insertion.After.prototype=Object.extend(new Abstract.Insertion("afterEnd"),{initializeRange:function(){
this.range.setStartAfter(this.element);
},insertContent:function(_374d){
_374d.each((function(_374e){
this.element.parentNode.insertBefore(_374e,this.element.nextSibling);
}).bind(this));
}});
Element.ClassNames=Class.create();
Element.ClassNames.prototype={initialize:function(_374f){
this.element=$(_374f);
},_each:function(_3750){
this.element.className.split(/\s+/).select(function(name){
return name.length>0;
})._each(_3750);
},set:function(_3752){
this.element.className=_3752;
},add:function(_3753){
if(this.include(_3753)){
return;
}
this.set($A(this).concat(_3753).join(" "));
},remove:function(_3754){
if(!this.include(_3754)){
return;
}
this.set($A(this).without(_3754).join(" "));
},toString:function(){
return $A(this).join(" ");
}};
Object.extend(Element.ClassNames.prototype,Enumerable);
var Selector=Class.create();
Selector.prototype={initialize:function(_3755){
this.params={classNames:[]};
this.expression=_3755.toString().strip();
this.parseExpression();
this.compileMatcher();
},parseExpression:function(){
function abort(_3756){
throw "Parse error in selector: "+_3756;
}
if(this.expression==""){
abort("empty expression");
}
var _3757=this.params,expr=this.expression,match,modifier,clause,rest;
while(match=expr.match(/^(.*)\[([a-z0-9_:-]+?)(?:([~\|!]?=)(?:"([^"]*)"|([^\]\s]*)))?\]$/i)){
_3757.attributes=_3757.attributes||[];
_3757.attributes.push({name:match[2],operator:match[3],value:match[4]||match[5]||""});
expr=match[1];
}
if(expr=="*"){
return this.params.wildcard=true;
}
while(match=expr.match(/^([^a-z0-9_-])?([a-z0-9_-]+)(.*)/i)){
modifier=match[1],clause=match[2],rest=match[3];
switch(modifier){
case "#":
_3757.id=clause;
break;
case ".":
_3757.classNames.push(clause);
break;
case "":
case undefined:
_3757.tagName=clause.toUpperCase();
break;
default:
abort(expr.inspect());
}
expr=rest;
}
if(expr.length>0){
abort(expr.inspect());
}
},buildMatchExpression:function(){
var _3758=this.params,conditions=[],clause;
if(_3758.wildcard){
conditions.push("true");
}
if(clause=_3758.id){
conditions.push("element.readAttribute(\"id\") == "+clause.inspect());
}
if(clause=_3758.tagName){
conditions.push("element.tagName.toUpperCase() == "+clause.inspect());
}
if((clause=_3758.classNames).length>0){
for(var i=0,length=clause.length;i<length;i++){
conditions.push("element.hasClassName("+clause[i].inspect()+")");
}
}
if(clause=_3758.attributes){
clause.each(function(_375a){
var value="element.readAttribute("+_375a.name.inspect()+")";
var _375c=function(_375d){
return value+" && "+value+".split("+_375d.inspect()+")";
};
switch(_375a.operator){
case "=":
conditions.push(value+" == "+_375a.value.inspect());
break;
case "~=":
conditions.push(_375c(" ")+".include("+_375a.value.inspect()+")");
break;
case "|=":
conditions.push(_375c("-")+".first().toUpperCase() == "+_375a.value.toUpperCase().inspect());
break;
case "!=":
conditions.push(value+" != "+_375a.value.inspect());
break;
case "":
case undefined:
conditions.push("element.hasAttribute("+_375a.name.inspect()+")");
break;
default:
throw "Unknown operator "+_375a.operator+" in selector";
}
});
}
return conditions.join(" && ");
},compileMatcher:function(){
this.match=new Function("element","if (!element.tagName) return false;       element = $(element);       return "+this.buildMatchExpression());
},findElements:function(scope){
var _375f;
if(_375f=$(this.params.id)){
if(this.match(_375f)){
if(!scope||Element.childOf(_375f,scope)){
return [_375f];
}
}
}
scope=(scope||document).getElementsByTagName(this.params.tagName||"*");
var _3760=[];
for(var i=0,length=scope.length;i<length;i++){
if(this.match(_375f=scope[i])){
_3760.push(Element.extend(_375f));
}
}
return _3760;
},toString:function(){
return this.expression;
}};
Object.extend(Selector,{matchElements:function(_3762,_3763){
var _3764=new Selector(_3763);
return _3762.select(_3764.match.bind(_3764)).map(Element.extend);
},findElement:function(_3765,_3766,index){
if(typeof _3766=="number"){
index=_3766,_3766=false;
}
return Selector.matchElements(_3765,_3766||"*")[index||0];
},findChildElements:function(_3768,_3769){
return _3769.map(function(_376a){
return _376a.match(/[^\s"]+(?:"[^"]*"[^\s"]+)*/g).inject([null],function(_376b,expr){
var _376d=new Selector(expr);
return _376b.inject([],function(_376e,_376f){
return _376e.concat(_376d.findElements(_376f||_3768));
});
});
}).flatten();
}});
function $$(){
return Selector.findChildElements(document,$A(arguments));
}
var Form={reset:function(form){
$(form).reset();
return form;
},serializeElements:function(_3771,_3772){
var data=_3771.inject({},function(_3774,_3775){
if(!_3775.disabled&&_3775.name){
var key=_3775.name,value=$(_3775).getValue();
if(value!=undefined){
if(_3774[key]){
if(_3774[key].constructor!=Array){
_3774[key]=[_3774[key]];
}
_3774[key].push(value);
}else{
_3774[key]=value;
}
}
}
return _3774;
});
return _3772?data:Hash.toQueryString(data);
}};
Form.Methods={serialize:function(form,_3778){
return Form.serializeElements(Form.getElements(form),_3778);
},getElements:function(form){
return $A($(form).getElementsByTagName("*")).inject([],function(_377a,child){
if(Form.Element.Serializers[child.tagName.toLowerCase()]){
_377a.push(Element.extend(child));
}
return _377a;
});
},getInputs:function(form,_377d,name){
form=$(form);
var _377f=form.getElementsByTagName("input");
if(!_377d&&!name){
return $A(_377f).map(Element.extend);
}
for(var i=0,matchingInputs=[],length=_377f.length;i<length;i++){
var input=_377f[i];
if((_377d&&input.type!=_377d)||(name&&input.name!=name)){
continue;
}
matchingInputs.push(Element.extend(input));
}
return matchingInputs;
},disable:function(form){
form=$(form);
form.getElements().each(function(_3783){
_3783.blur();
_3783.disabled="true";
});
return form;
},enable:function(form){
form=$(form);
form.getElements().each(function(_3785){
_3785.disabled="";
});
return form;
},findFirstElement:function(form){
return $(form).getElements().find(function(_3787){
return _3787.type!="hidden"&&!_3787.disabled&&["input","select","textarea"].include(_3787.tagName.toLowerCase());
});
},focusFirstElement:function(form){
form=$(form);
form.findFirstElement().activate();
return form;
}};
Object.extend(Form,Form.Methods);
Form.Element={focus:function(_3789){
$(_3789).focus();
return _3789;
},select:function(_378a){
$(_378a).select();
return _378a;
}};
Form.Element.Methods={serialize:function(_378b){
_378b=$(_378b);
if(!_378b.disabled&&_378b.name){
var value=_378b.getValue();
if(value!=undefined){
var pair={};
pair[_378b.name]=value;
return Hash.toQueryString(pair);
}
}
return "";
},getValue:function(_378e){
_378e=$(_378e);
var _378f=_378e.tagName.toLowerCase();
return Form.Element.Serializers[_378f](_378e);
},clear:function(_3790){
$(_3790).value="";
return _3790;
},present:function(_3791){
return $(_3791).value!="";
},activate:function(_3792){
_3792=$(_3792);
_3792.focus();
if(_3792.select&&(_3792.tagName.toLowerCase()!="input"||!["button","reset","submit"].include(_3792.type))){
_3792.select();
}
return _3792;
},disable:function(_3793){
_3793=$(_3793);
_3793.disabled=true;
return _3793;
},enable:function(_3794){
_3794=$(_3794);
_3794.blur();
_3794.disabled=false;
return _3794;
}};
Object.extend(Form.Element,Form.Element.Methods);
var Field=Form.Element;
var $F=Form.Element.getValue;
Form.Element.Serializers={input:function(_3795){
switch(_3795.type.toLowerCase()){
case "checkbox":
case "radio":
return Form.Element.Serializers.inputSelector(_3795);
default:
return Form.Element.Serializers.textarea(_3795);
}
},inputSelector:function(_3796){
return _3796.checked?_3796.value:null;
},textarea:function(_3797){
return _3797.value;
},select:function(_3798){
return this[_3798.type=="select-one"?"selectOne":"selectMany"](_3798);
},selectOne:function(_3799){
var index=_3799.selectedIndex;
return index>=0?this.optionValue(_3799.options[index]):null;
},selectMany:function(_379b){
var _379c,length=_379b.length;
if(!length){
return null;
}
for(var i=0,_379c=[];i<length;i++){
var opt=_379b.options[i];
if(opt.selected){
_379c.push(this.optionValue(opt));
}
}
return _379c;
},optionValue:function(opt){
return Element.extend(opt).hasAttribute("value")?opt.value:opt.text;
}};
Abstract.TimedObserver=function(){
};
Abstract.TimedObserver.prototype={initialize:function(_37a0,_37a1,_37a2){
this.frequency=_37a1;
this.element=$(_37a0);
this.callback=_37a2;
this.lastValue=this.getValue();
this.registerCallback();
},registerCallback:function(){
setInterval(this.onTimerEvent.bind(this),this.frequency*1000);
},onTimerEvent:function(){
var value=this.getValue();
var _37a4=("string"==typeof this.lastValue&&"string"==typeof value?this.lastValue!=value:String(this.lastValue)!=String(value));
if(_37a4){
this.callback(this.element,value);
this.lastValue=value;
}
}};
Form.Element.Observer=Class.create();
Form.Element.Observer.prototype=Object.extend(new Abstract.TimedObserver(),{getValue:function(){
return Form.Element.getValue(this.element);
}});
Form.Observer=Class.create();
Form.Observer.prototype=Object.extend(new Abstract.TimedObserver(),{getValue:function(){
return Form.serialize(this.element);
}});
Abstract.EventObserver=function(){
};
Abstract.EventObserver.prototype={initialize:function(_37a5,_37a6){
this.element=$(_37a5);
this.callback=_37a6;
this.lastValue=this.getValue();
if(this.element.tagName.toLowerCase()=="form"){
this.registerFormCallbacks();
}else{
this.registerCallback(this.element);
}
},onElementEvent:function(){
var value=this.getValue();
if(this.lastValue!=value){
this.callback(this.element,value);
this.lastValue=value;
}
},registerFormCallbacks:function(){
Form.getElements(this.element).each(this.registerCallback.bind(this));
},registerCallback:function(_37a8){
if(_37a8.type){
switch(_37a8.type.toLowerCase()){
case "checkbox":
case "radio":
Event.observe(_37a8,"click",this.onElementEvent.bind(this));
break;
default:
Event.observe(_37a8,"change",this.onElementEvent.bind(this));
break;
}
}
}};
Form.Element.EventObserver=Class.create();
Form.Element.EventObserver.prototype=Object.extend(new Abstract.EventObserver(),{getValue:function(){
return Form.Element.getValue(this.element);
}});
Form.EventObserver=Class.create();
Form.EventObserver.prototype=Object.extend(new Abstract.EventObserver(),{getValue:function(){
return Form.serialize(this.element);
}});
if(!window.Event){
var Event=new Object();
}
Object.extend(Event,{KEY_BACKSPACE:8,KEY_TAB:9,KEY_RETURN:13,KEY_ESC:27,KEY_LEFT:37,KEY_UP:38,KEY_RIGHT:39,KEY_DOWN:40,KEY_DELETE:46,KEY_HOME:36,KEY_END:35,KEY_PAGEUP:33,KEY_PAGEDOWN:34,element:function(event){
return event.target||event.srcElement;
},isLeftClick:function(event){
return (((event.which)&&(event.which==1))||((event.button)&&(event.button==1)));
},pointerX:function(event){
return event.pageX||(event.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft));
},pointerY:function(event){
return event.pageY||(event.clientY+(document.documentElement.scrollTop||document.body.scrollTop));
},stop:function(event){
if(event.preventDefault){
event.preventDefault();
event.stopPropagation();
}else{
event.returnValue=false;
event.cancelBubble=true;
}
},findElement:function(event,_37af){
var _37b0=Event.element(event);
while(_37b0.parentNode&&(!_37b0.tagName||(_37b0.tagName.toUpperCase()!=_37af.toUpperCase()))){
_37b0=_37b0.parentNode;
}
return _37b0;
},observers:false,_observeAndCache:function(_37b1,name,_37b3,_37b4){
if(!this.observers){
this.observers=[];
}
if(_37b1.addEventListener){
this.observers.push([_37b1,name,_37b3,_37b4]);
_37b1.addEventListener(name,_37b3,_37b4);
}else{
if(_37b1.attachEvent){
this.observers.push([_37b1,name,_37b3,_37b4]);
_37b1.attachEvent("on"+name,_37b3);
}
}
},unloadCache:function(){
if(!Event.observers){
return;
}
for(var i=0,length=Event.observers.length;i<length;i++){
Event.stopObserving.apply(this,Event.observers[i]);
Event.observers[i][0]=null;
}
Event.observers=false;
},observe:function(_37b6,name,_37b8,_37b9){
_37b6=$(_37b6);
_37b9=_37b9||false;
if(name=="keypress"&&(navigator.appVersion.match(/Konqueror|Safari|KHTML/)||_37b6.attachEvent)){
name="keydown";
}
Event._observeAndCache(_37b6,name,_37b8,_37b9);
},stopObserving:function(_37ba,name,_37bc,_37bd){
_37ba=$(_37ba);
_37bd=_37bd||false;
if(name=="keypress"&&(navigator.appVersion.match(/Konqueror|Safari|KHTML/)||_37ba.detachEvent)){
name="keydown";
}
if(_37ba.removeEventListener){
_37ba.removeEventListener(name,_37bc,_37bd);
}else{
if(_37ba.detachEvent){
try{
_37ba.detachEvent("on"+name,_37bc);
}
catch(e){
}
}
}
}});
if(navigator.appVersion.match(/\bMSIE\b/)){
Event.observe(window,"unload",Event.unloadCache,false);
}
var Position={includeScrollOffsets:false,prepare:function(){
this.deltaX=window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0;
this.deltaY=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;
},realOffset:function(_37be){
var _37bf=0,valueL=0;
do{
_37bf+=_37be.scrollTop||0;
valueL+=_37be.scrollLeft||0;
_37be=_37be.parentNode;
}while(_37be);
return [valueL,_37bf];
},cumulativeOffset:function(_37c0){
var _37c1=0,valueL=0;
do{
_37c1+=_37c0.offsetTop||0;
valueL+=_37c0.offsetLeft||0;
_37c0=_37c0.offsetParent;
}while(_37c0);
return [valueL,_37c1];
},positionedOffset:function(_37c2){
var _37c3=0,valueL=0;
do{
_37c3+=_37c2.offsetTop||0;
valueL+=_37c2.offsetLeft||0;
_37c2=_37c2.offsetParent;
if(_37c2){
if(_37c2.tagName=="BODY"){
break;
}
var p=Element.getStyle(_37c2,"position");
if(p=="relative"||p=="absolute"){
break;
}
}
}while(_37c2);
return [valueL,_37c3];
},offsetParent:function(_37c5){
if(_37c5.offsetParent){
return _37c5.offsetParent;
}
if(_37c5==document.body){
return _37c5;
}
while((_37c5=_37c5.parentNode)&&_37c5!=document.body){
if(Element.getStyle(_37c5,"position")!="static"){
return _37c5;
}
}
return document.body;
},within:function(_37c6,x,y){
if(this.includeScrollOffsets){
return this.withinIncludingScrolloffsets(_37c6,x,y);
}
this.xcomp=x;
this.ycomp=y;
this.offset=this.cumulativeOffset(_37c6);
return (y>=this.offset[1]&&y<this.offset[1]+_37c6.offsetHeight&&x>=this.offset[0]&&x<this.offset[0]+_37c6.offsetWidth);
},withinIncludingScrolloffsets:function(_37c9,x,y){
var _37cc=this.realOffset(_37c9);
this.xcomp=x+_37cc[0]-this.deltaX;
this.ycomp=y+_37cc[1]-this.deltaY;
this.offset=this.cumulativeOffset(_37c9);
return (this.ycomp>=this.offset[1]&&this.ycomp<this.offset[1]+_37c9.offsetHeight&&this.xcomp>=this.offset[0]&&this.xcomp<this.offset[0]+_37c9.offsetWidth);
},overlap:function(mode,_37ce){
if(!mode){
return 0;
}
if(mode=="vertical"){
return ((this.offset[1]+_37ce.offsetHeight)-this.ycomp)/_37ce.offsetHeight;
}
if(mode=="horizontal"){
return ((this.offset[0]+_37ce.offsetWidth)-this.xcomp)/_37ce.offsetWidth;
}
},page:function(_37cf){
var _37d0=0,valueL=0;
var _37d1=_37cf;
do{
_37d0+=_37d1.offsetTop||0;
valueL+=_37d1.offsetLeft||0;
if(_37d1.offsetParent==document.body){
if(Element.getStyle(_37d1,"position")=="absolute"){
break;
}
}
}while(_37d1=_37d1.offsetParent);
_37d1=_37cf;
do{
if(!window.opera||_37d1.tagName=="BODY"){
_37d0-=_37d1.scrollTop||0;
valueL-=_37d1.scrollLeft||0;
}
}while(_37d1=_37d1.parentNode);
return [valueL,_37d0];
},clone:function(_37d2,_37d3){
var _37d4=Object.extend({setLeft:true,setTop:true,setWidth:true,setHeight:true,offsetTop:0,offsetLeft:0},arguments[2]||{});
_37d2=$(_37d2);
var p=Position.page(_37d2);
_37d3=$(_37d3);
var delta=[0,0];
var _37d7=null;
if(Element.getStyle(_37d3,"position")=="absolute"){
_37d7=Position.offsetParent(_37d3);
delta=Position.page(_37d7);
}
if(_37d7==document.body){
delta[0]-=document.body.offsetLeft;
delta[1]-=document.body.offsetTop;
}
if(_37d4.setLeft){
_37d3.style.left=(p[0]-delta[0]+_37d4.offsetLeft)+"px";
}
if(_37d4.setTop){
_37d3.style.top=(p[1]-delta[1]+_37d4.offsetTop)+"px";
}
if(_37d4.setWidth){
_37d3.style.width=_37d2.offsetWidth+"px";
}
if(_37d4.setHeight){
_37d3.style.height=_37d2.offsetHeight+"px";
}
},absolutize:function(_37d8){
_37d8=$(_37d8);
if(_37d8.style.position=="absolute"){
return;
}
Position.prepare();
var _37d9=Position.positionedOffset(_37d8);
var top=_37d9[1];
var left=_37d9[0];
var width=_37d8.clientWidth;
var _37dd=_37d8.clientHeight;
_37d8._originalLeft=left-parseFloat(_37d8.style.left||0);
_37d8._originalTop=top-parseFloat(_37d8.style.top||0);
_37d8._originalWidth=_37d8.style.width;
_37d8._originalHeight=_37d8.style.height;
_37d8.style.position="absolute";
_37d8.style.top=top+"px";
_37d8.style.left=left+"px";
_37d8.style.width=width+"px";
_37d8.style.height=_37dd+"px";
},relativize:function(_37de){
_37de=$(_37de);
if(_37de.style.position=="relative"){
return;
}
Position.prepare();
_37de.style.position="relative";
var top=parseFloat(_37de.style.top||0)-(_37de._originalTop||0);
var left=parseFloat(_37de.style.left||0)-(_37de._originalLeft||0);
_37de.style.top=top+"px";
_37de.style.left=left+"px";
_37de.style.height=_37de._originalHeight;
_37de.style.width=_37de._originalWidth;
}};
if(/Konqueror|Safari|KHTML/.test(navigator.userAgent)){
Position.cumulativeOffset=function(_37e1){
var _37e2=0,valueL=0;
do{
_37e2+=_37e1.offsetTop||0;
valueL+=_37e1.offsetLeft||0;
if(_37e1.offsetParent==document.body){
if(Element.getStyle(_37e1,"position")=="absolute"){
break;
}
}
_37e1=_37e1.offsetParent;
}while(_37e1);
return [valueL,_37e2];
};
}
Element.addMethods();
