/**
 * Qooxdoo json rpc server for nodejs express framework
 * Author: Jeffry L. <paragasu@gmail.com>
 * Website: paragasu.github.io
 * License: MIT
 */

'use strict';

module.exports = function(req, res, next){

  req.qx = req.body;

  res.end();
}
