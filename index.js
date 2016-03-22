/**
 * Qooxdoo json rpc server for nodejs express framework
 * Author: Jeffry L. <paragasu@gmail.com>
 * Website: paragasu.github.io
 * License: MIT
 */

'use strict';

const err = require('./lib/error');

var services = {};

function runService(req, res, next){
  
  var service = req.body.service;
  var method  = req.body.method;
  var params  = req.body.params;
  var id      = req.body.id;
  var result  = null;

  try{
    var cls = services[service];
  
    if(!cls){
      throw (err.code.SERVICE_NOT_FOUND);
    }

    switch(typeof cls){

      case 'object':
        result = handle_object(service, method, params);
        break;

      case 'function':
        result = handle_function(method, params);
        break;

      default:
        throw (err.code.ILLEGAL_SERVICE);
        break;      
    }

    res.json({ 
      id: id, 
      result: result, 
      error: null 
    })
  
  }catch(e){
    res.json({ 
      id: id, 
      result: null, 
      error: e
    })
  }
}


/**
 * handle object callback
 * @param string service service name
 * @param string method method name to call
 * @param string params method function args
 */
function handle_object(service, method, params){
  var obj = services[service];
  if(obj[method]){
    return obj[method].apply(this, params);
  }else{
    throw (err.code.METHOD_NOT_FOUND);
  }
}


/**
 * handle function callback
 * @param string method method name
 * @param string params function arguments
 */
function handle_function(method, params){
  return services[method].apply(this, params);
}


/**
 * run callback object or function
 * @param string name service name
 * @param mixed  function or object
 */
function addService(name, cb){

  if(typeof cb == 'function' || typeof cb == 'object'){
    services[name] = cb;
  }else{
    throw ('Callback for ' + name + ' is not a function or object');
  }
}

module.exports.services = runService;
module.exports.service  = addService;
