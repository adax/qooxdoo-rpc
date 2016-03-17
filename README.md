# Qooxdoo RPC

Qooxdoo json rpc for nodejs express framework.


## Usage example

    var app = express()
    var bp  = require('body-parser')
    var qx  = require('qooxdoo-rpc')

    app.use(qxrpc.express)
    app.post('/rpc', function(req, res, next){
    
      /*       
      req.qx.service
      req.qx.method
      req.qx.params

      res.body = {
        result: {
          origin: 
          code:
        }
        error:
        id: 
      }
      */

      res.body = res.qx.body(); 
      res.type('application/json'); 
      res.end();
    }

    app.listen(3000);

Reference  
[Qooxdoo JSON RPC spec](http://qooxdoo.org/docs/general/rpc/jsonrpc_server_specs)
