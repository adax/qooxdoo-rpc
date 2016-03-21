/**
 * Qooxdoo json rpc server for nodejs express framework
 * Author: Jeffry L. <paragasu@gmail.com>
 * Website: paragasu.github.io
 * License: MIT
 */

'use strict';

const msg = require('./lib/error');

module.exports = function(req, res, next){

  req.service = function(){
    console.log(req.body); 
  }
/* 
  var qx = new Qooxdoo();

  qx.id      = res.body.id;
  qx.service = res.body.service;
  qx.method  = res.body.method;
  qx.params  = res.body.params;  
*/
  next()
}

function Qooxdoo(req, res, next){

  console.log(req.body);

  req.qx = req.body;   
  req.service = function(){
    console.log('hello');
  }

  next()
}


/**
 * Add service to match with the service request and
 * try to execute object method based on the request
 * @param string name service route
 * @param object cb callback object
 */
Qooxdoo.prototype.services = function(name, cb){

  let method = this.qx.method;

  try{ 

    if(typeof cb != 'object'){
      throw new Error(msg.code.CLASS_NOT_FOUND);
    }

    if(typeof cb[method] != 'function'){
      throw new Error(msg.code.METHOD_NOT_FOUND);
    }

    res.json({
      id: req.qx.id,
      error: null,
      result: cb[method].apply(this.qx.params)
    })

  }catch(e){

    res.json({
      id: req.qx.id,
      error: e,
      result: null
    })  
  }
}
