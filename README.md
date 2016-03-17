# Qooxdoo RPC

Qooxdoo json rpc for nodejs express framework.


# Usage example

    var qxrpc = require('qooxdoo-rpc')
    var app   = express()

    app.use(qxrpc.express)
    
    app.get('/', function(req, res, next){
    
      //req.qx.service
      //req.qx.method
      //req.qx.params

      /*       
      res.body = {
        result:
        error:
        id: 
      }
      */
    }

Reference  
[Qooxdoo JSON RPC spec](http://qooxdoo.org/docs/general/rpc/jsonrpc_server_specs)
