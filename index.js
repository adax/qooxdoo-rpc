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

  var result, error, query;
  var type = req.get('Content-Type');

  try{
    switch(type){
      //XmlHTTPTransport
      case 'application/json':
        query = req.body;
        break;

      //IFrameTransport
      case 'application/x-www-form-urlencoded':
        if(req.body['_data_']){
          query = req.body._data_;
        }else{
          throw ('Other Error');
        }
        break;

      //not supported
      default:
        throw ('Other Error');
        break;      
    }
 
 
    var service = query.service;
    var method  = query.method;
    var params  = query.params;
    var id      = query.id;
    var cls     = services[service];
  
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
  
  }catch(e){
    error  = e;
    result = null;
  }

  res.json({
    id: id,
    result: result,
    error: error
  })
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
