/**
 * Qooxdoo json rpc server for nodejs express framework
 * Author: Jeffry L. <paragasu@gmail.com>
 * Website: paragasu.github.io
 * License: MIT
 */

'use strict';

const err    = require('./lib/error');
var services = {};

/**
 * interface with express middleware
 * @param object req request object
 * @param object res response object
 * @param next 
 */
function runService(req, res, next){
  var result, error, q;

  try{
    q = getRequest(req);

    if(!services[q.service]){
      throw (err.code.SERVICE_NOT_FOUND);
    }

    switch(typeof services[q.service]){
      case 'object':
        result = handle_object(q.service, q.method, q.params);
        break;

      case 'function':
        result = handle_function(q.method, q.params);
        break;

      default:
        throw (err.code.ILLEGAL_SERVICE);
        break;      
    }
  
  }catch(e){
    result = null;
    error  = e;
  }

  res.json({
    id: q.id,
    result: result,
    error: error
  })
}


/**
 * get request param based on supported content-type
 * @param object req
 * @return object qooxdoo rpc request
 */
function getRequest(req){
  var type = req.get('Content-Type');
  var query;

  switch(type){
    case 'application/json': //XmlHTTPTransport
      query = req.body;
      break;

    case 'application/x-www-form-urlencoded': //IFrameTransport
      if(req.body['_data_']){
        query = req.body._data_;
      }else{
        throw ('Other Error');
      }
      break;

    default: //not supported
      throw ('Other Error');
      break;      
  }

  return query;
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
