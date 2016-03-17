/**
 * Qooxdoo json rpc server for nodejs express framework
 * Author: Jeffry L. <paragasu@gmail.com>
 * Website: paragasu.github.io
 * License: MIT
 */

'use strict';

module.exports = {
  origin:{
    SERVER_ERROR: 1,
    METHOD_ERROR: 2 
  },

  code:{
    ILLEGAL_SERVICE:   { code: 1, message: 'Illegal Service' },
    SERVICE_NOT_FOUND: { code: 2, message: 'Service Not Found' },
    CLASS_NOT_FOUND:   { code: 3, message: 'Class Not Found' },
    METHOD_NOT_FOUND:  { code: 4, message: 'Method Not Found' },
    PARAMETER_MISMATCH:{ code: 5, message: 'Parameter Mismatch' },
    PERMISSION_DENIED: { code: 6, message: 'Permission Denied' } 
  }
}
