/**
 * Qooxdoo json rpc server for nodejs express framework
 * Author: Jeffry L. <paragasu@gmail.com>
 * Website: paragasu.github.io
 * License: MIT
 */

'use strict';

module.exports = Qooxdoo;

function Qooxdoo(req, res){
  this.qx = req.body;   
}


Qooxdoo.prototype.service =  function(name, fn){
   
}

Qooxdoo.prototype._handle_method: function(){
}

