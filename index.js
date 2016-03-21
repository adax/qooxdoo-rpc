/**
 * Qooxdoo json rpc server for nodejs express framework
 * Author: Jeffry L. <paragasu@gmail.com>
 * Website: paragasu.github.io
 * License: MIT
 */

'use strict';

const Error = require('lib/error');

module.exports = Qooxdoo;

function Qooxdoo(req, res){

  this.qx = req.body;   
}


/**
 * Add service to match with the service request and
 * try to execute object method based on the request
 * @param string name service route
 * @param object cb callback object
 */
Qooxdoo.prototype.service =  function(name, cb){

  let method = this.qx.method;
 
  if(typeof cb != 'object'){
    throw Error.code.CLASS_NOT_FOUND;
  }

  if(typeof cb[method] != 'function'){
    throw Error.code.METHOD_NOT_FOUND;  
  }

  cb[method].apply(this.qx.params)
}
