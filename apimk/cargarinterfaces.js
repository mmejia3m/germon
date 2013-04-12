//var modulo={ funcname: funcname };
 var constantes={

 interfaces:    '1.3.6.1.2.1.2',

 ifNumber:	'1.3.6.1.2.1.2.1',


 ifTable:	'1.3.6.1.2.1.2.2',
 ifEntry:	'1.3.6.1.2.1.2.2.1',
 ifIndex:	'1.3.6.1.2.1.2.2.1.1',

 ifInOctets:	'1.3.6.1.2.1.2.2.1.10',
 ifInUcastPkts:	'1.3.6.1.2.1.2.2.1.11',
 ifInNUcastPkts:	'1.3.6.1.2.1.2.2.1.12',
 ifInDiscards:	'1.3.6.1.2.1.2.2.1.13',
 ifInErrors:	'1.3.6.1.2.1.2.2.1.14',
 ifInUnknownProtos:	'1.3.6.1.2.1.2.2.1.15',
 ifOutOctets:	'1.3.6.1.2.1.2.2.1.16',
 ifOutUcastPkts:	'1.3.6.1.2.1.2.2.1.17',
 ifOutNUcastPkts:	'1.3.6.1.2.1.2.2.1.18',
 ifOutDiscards:	'1.3.6.1.2.1.2.2.1.19',
 ifDescr:	'1.3.6.1.2.1.2.2.1.2',
 ifOutErrors:	'1.3.6.1.2.1.2.2.1.20',
 ifOutQLen:	'1.3.6.1.2.1.2.2.1.21',
 ifSpecific:	'1.3.6.1.2.1.2.2.1.22',
 ifType:	'1.3.6.1.2.1.2.2.1.3',
 ifMtu:	'1.3.6.1.2.1.2.2.1.4',
 ifSpeed:	'1.3.6.1.2.1.2.2.1.5',
 ifPhysAddress:	'1.3.6.1.2.1.2.2.1.6',
 ifAdminStatus:	'1.3.6.1.2.1.2.2.1.7',
 ifOperStatus:	'1.3.6.1.2.1.2.2.1.8',
 ifLastChange:	'1.3.6.1.2.1.2.2.1.9'
};
var snmp=require('snmp-native');
var _=require('underscore');
var util= require('util');
var pack=require('bufferpack');
function parsearInterface(data,fn){
	//console.log(data);
      var tam= data[constantes.ifNumber +".0"];
      var indices=[];
      // cargar indices
      var newindex=constantes.ifIndex+".";
      newindex=newindex.replace(/\./g,"_");
      console.log(newindex);
      var patron= new RegExp(newindex,"i");
      var  llaves= _.keys(data);
      var filtrados={};
      for(k in data){
      	    var newk=k.replace(/\./g,"_")
            if(patron.test(newk)){
            	filtrados[k]=data[k];
            }
      }
      
     // console.log(obj_indice);
     indices= _.values(filtrados);
     
      var objetos=[];
      for(var i=0;i<indices.length;i++){
      	var indice= indices[i];
      	//console.log("El indice "+indice);
      	var obj={};
 obj.ifInOctets =data[constantes.ifInOctets +"."+indice]||"";
 obj.ifInUcastPkts =data[constantes.ifInNUcastPkts +"."+indice]||"";
 obj.ifInNUcastPkts =data[constantes.ifInNUcastPkts +"."+indice]||"";
 obj.ifInDiscards =data[constantes.ifInDiscards +"."+indice]||"";
 obj.ifInErrors =data[constantes.ifInErrors +"."+indice]||"";
 obj.ifInUnknownProtos =data[constantes.ifInUnknownProtos +"."+indice]||"";
 obj.ifOutOctets =data[constantes.ifOutOctets +"."+indice]||"";
 obj.ifOutUcastPkts =data[constantes.ifOutUcastPkts  +"."+indice]||"";
 obj.ifOutNUcastPkts =data[constantes.ifOutNUcastPkts +"."+indice]||"";
 obj.ifOutDiscards =data[constantes.ifOutDiscards +"."+indice]||"";
 obj.ifDescr =data[constantes.ifDescr +"."+indice]||"";
 obj.ifOutErrors =data[constantes.ifOutErrors +"."+indice]||"";
 obj.ifOutQLen =data[constantes.ifOutQLen +"."+indice]||"";
 obj.ifSpecific =data[constantes.ifSpecific +"."+indice]||"";
 obj.ifType =data[constantes.ifType +"."+indice]||"";
 obj.ifMtu =data[constantes.ifMtu +"."+indice]||"";
 obj.ifSpeed =data[constantes.ifSpeed +"."+indice]||"";
 //var codificada=uniCodeToString(data[constantes.ifPhysAddress +"."+indice]);
 //var sincodificar=data[constantes.ifPhysAddress +"."+indice];
 //console.log("Codificada "+codificada +"  sincodificar "+sincodificar);
 obj.ifPhysAddress =data[constantes.ifPhysAddress +"."+indice]||"";
 obj.ifAdminStatus =data[constantes.ifAdminStatus +"."+indice]||"";
 obj.ifOperStatus =data[constantes.ifOperStatus +"."+indice]||"";
 obj.ifLastChange =data[constantes.ifLastChange +"."+indice]||"";
      
    objetos.push(obj);
      }
      fn(objetos);


}
function uniCodeToString(source){
    //for example, source = "\u5c07\u63a2\u8a0e"
    var escapedSource = escape(source);
    var codeArray = escapedSource.split("%u");
    var str = "";
    for(var i=1; i<codeArray.length; i++){
        str += String.fromCharCode("0x"+codeArray[i]);
    }
    return str;
}
function leerInterfaces(fn){
      console.log("Iniciamos leyendo las interfaces del nodo");
      var oidStr= constantes.interfaces;
      var oid = _.map(_.compact(oidStr.split('.')), function (x) { return parseInt(x, 10); });

       var session2 = new snmp.Session({ host: this.host, community: this.comunidad });
       session2.getSubtree({oid:oid},function(err,varbinds){
           if(err){
           	   fn(err);
           }else {
           	var lectura_tcp={};
           	for(var i=0;i<varbinds.length;i++){
           		   var vb= varbinds[i];
           		  //console.log(vb);
           		  //console.log(vb.value);
           		  var stroid=vb.oid.join().replace(/,/g,".");
                  lectura_tcp[stroid]= vb.value;
                  if(i==varbinds.length-1){ 
                  	           session2.close();
                              parsearInterface(lectura_tcp,fn);
                  }
           	 }
            
           	}
           });

      

}
function leerJSONInterfaces(req,res){
      leerInterfaces(function(data){
      	res.send(data)
      });

}
module.exports= (function(){
	   var host='10.0.0.12';
	   var comunidad='ifs';
	   var oid="";
	  function funcname() { console.log(constantes); }

       var modulo={};
       modulo.host=host;
       modulo.comunidad=comunidad;
       modulo.oid=oid;
       modulo.funcname=funcname;
       modulo.leerJSONInterfaces=leerJSONInterfaces;
       modulo.leerInterfaces=leerInterfaces;
       return modulo; 
  })();

 
//var Class = function() {  }
//Class.prototype.funcname = function() { console.log("Turno");}
//module.exports = Class;