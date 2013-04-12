var util= require('util');
var u= require('./cargarinterfaces');
var mongo = require('mongodb');
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('snmpdb', server, {safe: true});

var intervalo=(1)*60*1000;
setInterval(doStuff,intervalo);
function doStuff(){
u.leerInterfaces(function(data){
   var equipo=
   {
   	hostname:"equipo",
   	ip:"10.0.0.12",
   	comunidad:"ifs"
   }
   var informacion={};
   informacion.data=data;
   informacion.equipo=equipo;
   db.collection('informacion',function(err,collection){
      collection.insert(informacion,{safe:true},function(err,result){
      	   if(err){
      	          console.log("Error al intentar obtener ");
      	    }else{
      	    	console.log("Se guardo exitosamente");
      	    }
      });
     
   });
   //console.log("Session: "+util.inspect(data));

});
}