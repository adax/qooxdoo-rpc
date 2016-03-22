# Qooxdoo RPC

Qooxdoo json rpc for nodejs express framework.


## Usage example

    var app = express()
    var bp  = require('body-parser')
    var qx  = require('qooxdoo-rpc')

Service mapped to function.

    qx.service('user', function(){
      console.log("hello world")
    });

Service mapped to an object.

    qx.service('world', {

      hello: function(args){
        console.log('hello');
      },

      world: function(args){
        console.log('world');
      }
    })


Add as middleware to expressjs

    app.use('/rpc', qx);
    app.listen(3000);



Reference  
[Qooxdoo JSON RPC spec](http://qooxdoo.org/docs/general/rpc/jsonrpc_server_specs)
