/**
 * Qooxdoo json rpc server for nodejs express framework
 * Author: Jeffry L. <paragasu@gmail.com>
 * Website: paragasu.github.io
 * License: MIT
 */

'use strict';

const msg = require('./lib/error');

var services = {};

function runService(req, res, next){
  
  var service = req.body.service;
  var method  = req.body.method;
  var params  = req.body.params;
  var id      = req.body.id;
  var result  = null;

  try{

    switch(typeof services[service]){

      case 'object':
        result = handle_object(service, method, params);
        break;

      case 'function':
        result = handle_function(method, params);
        break;

      default:
        throw new Error ('Invalid callback function ' + service);
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
      error: e.toString() 
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
    throw new Error('Invalid class method ' +  method + ' in ' + service);
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
 *        if function method will be ignored and function will be executed
 *        if object, method will be executed
 */
function addService(name, cb){
  services[name] = cb;
}

module.exports.services = runService;
module.exports.service  = addService;
