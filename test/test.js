/**
 * Qooxdoo json rpc server for nodejs express framework
 * Author: Jeffry L. <paragasu@gmail.com>
 * Website: paragasu.github.io
 * License: MIT
 */

'use strict';

const request = require('superagent');
const assert  = require('assert');
const should  = require('should');

describe('Standard API', function(){
  it('echo', function(done){
    request
    .post('localhost:4000')
    .send(param)
    .end(function(err, res){
      //Client said: [<param>]
      done() 
    })
  })

  it('sink', function(done){
    request
    .post('localhost:4000')
    .send(param)
    .end(function(err, res){
      //240s delay
      done() 
    })
  })
  
  it('sleep', function(done){
    request
    .post('localhost:4000')
    .send(param)
    .end(function(err, res){
      //240s delay
      done() 
    })
  })

  it('getInteger', function(done){
    request
    .post('localhost:4000')
    .send(param)
    .end(function(err, res){
      //240s delay
      done() 
    })
  })

  it('getFloat', function(done){
    request
    .post('localhost:4000')
    .send(param)
    .end(function(err, res){
      //240s delay
      done() 
    })
  })

  it('getString', function(done){
    request
    .post('localhost:4000')
    .send(param)
    .end(function(err, res){
      //240s delay
      done() 
    })
  })

  it('getArrayInteger', function(done){
    request
    .post('localhost:4000')
    .send(param)
    .end(function(err, res){
      //240s delay
      done() 
    })
  })

  it('getArrayString', function(done){
    request
    .post('localhost:4000')
    .send(param)
    .end(function(err, res){
      //240s delay
      done() 
    })
  })

  it('getObject', function(done){
    request
    .post('localhost:4000')
    .send(param)
    .end(function(err, res){
      //240s delay
      done() 
    })
  })

  it('getTrue', function(done){
    request
    .post('localhost:4000')
    .send(param)
    .end(function(err, res){
      //240s delay
      done() 
    })
  })

  it('getFalse', function(done){
    request
    .post('localhost:4000')
    .send(param)
    .end(function(err, res){
      //240s delay
      done() 
    })
  })

  it('getNull', function(done){
    request
    .post('localhost:4000')
    .send(param)
    .end(function(err, res){
      //240s delay
      done() 
    })
  })

  it('isInteger', function(done){
    request
    .post('localhost:4000')
    .send(param)
    .end(function(err, res){
      //240s delay
      done() 
    })
  })

  it('isFloat', function(done){
    request
    .post('localhost:4000')
    .send(param)
    .end(function(err, res){
      //240s delay
      done() 
    })
  })

  it('isString', function(done){
    request
    .post('localhost:4000')
    .send(param)
    .end(function(err, res){
      //240s delay
      done() 
    })
  })

  it('isBoolean', function(done){
    request
    .post('localhost:4000')
    .send(param)
    .end(function(err, res){
      //240s delay
      done() 
    })
  })

  it('isArray', function(done){
    request
    .post('localhost:4000')
    .send(param)
    .end(function(err, res){
      //240s delay
      done() 
    })
  })

  it('isObject', function(done){
    request
    .post('localhost:4000')
    .send(param)
    .end(function(err, res){
      //240s delay
      done() 
    })
  })

  it('isNull', function(done){
    request
    .post('localhost:4000')
    .send(param)
    .end(function(err, res){
      //240s delay
      done() 
    })
  })

  it('getParams', function(done){
    request
    .post('localhost:4000')
    .send(param)
    .end(function(err, res){
      //240s delay
      done() 
    })
  })

  it('getParam', function(done){
    request
    .post('localhost:4000')
    .send(param)
    .end(function(err, res){
      //240s delay
      done() 
    })
  })

  it('getCurrentTimestamp', function(done){
    request
    .post('localhost:4000')
    .send(param)
    .end(function(err, res){
      //240s delay
      done() 
    })
  })
})
