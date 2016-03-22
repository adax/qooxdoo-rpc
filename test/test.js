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
const QX_URL  = 'http://localhost:6000/rpc';

function qx_param(conf){
  return {
    id: 0,
    service: conf.service || 'test',
    method: conf.method,
    params: conf.params || null  
  }
}

describe('Standard API', function(){

  before(function(){

    var qx      = require('../index')
    var bp      = require('body-parser')
    var app     = require('express')();

    app.use(bp.urlencoded({extended:false}))
    app.use(bp.json())

    qx.service('test', 
    {
      echo: function(args){
        return args;
      },

      getInteger: function(args){
        return parseInt(args); 
      },

      getFloat: function(args){
        return parseFloat(args); 
      },

      getString: function(args){
        return args.toString();
      },

      getArrayInteger: function(args){
        return args;
      },
  
      getArrayString: function(args){
        return args;
      },

      getTrue: function(args){
        return args;
      },

      getFalse: function(args){
        return args;
      },

      getNull: function(args){
        return args;
      },

      isInteger: function(n){
        return n === +n && n === (n|0);
      },

      isFloat: function(n){
        return n === +n && n !== (n|0);
      },

      isString: function(str){
        return typeof str === "string";
      },

      isBoolean: function(value){
        return typeof value === "boolean";
      },

      isArray: function(obj){
        return Array.isArray(obj);
      },

      isObject: function(obj){
        return typeof obj === 'object';
      },

      isNull: function(obj){
        return obj === null;
      },

      getParams: function(param){
        return param;
      },

      getParam: function(param){
        return param;
      },
      
      getCurrentTimestamp: function(param){
        return  'new Date(Date.UTC(2006,5,20,22,18,42,223))';
      }
    })

    app.use('/rpc', qx.services)
    app.listen(6000)
  })

  it('echo', function(done){

    var param = qx_param({
      method: "echo",
      params: ["hello world"]
    })    

    request
    .post(QX_URL)
    .send(param)
    .end(function(err, res){
      res.body.result.should.equal('hello world');
      done() 
    })
  })

  it('sink', function(done){

    var param = qx_param({
      method: 'sink'
    })    

    request
    .post(QX_URL)
    .send(param)
    .end(function(err, res){
      //240s delay
      done() 
    })
  })
  
  it('sleep', function(done){

    var param = qx_param({
      method: 'sleep',
      param: [5]
    })    

    request
    .post(QX_URL)
    .send(param)
    .end(function(err, res){
      done() 
    })
  })

  it('getInteger', function(done){

    var param = qx_param({
      method: 'getInteger',
      params: [1]
    })    

    request
    .post(QX_URL)
    .send(param)
    .end(function(err, res){
      res.body.result.should.equal(1)
      done() 
    })
  })

  it('getFloat', function(done){

    var param = qx_param({
      method: 'getFloat',
      params: [1/3]
    })    

    request
    .post(QX_URL)
    .send(param)
    .end(function(err, res){
      res.body.result.should.equal(0.3333333333333333)
      done() 
    })
  })

  it('getString', function(done){

    var param = qx_param({
      method: 'getString',
      params: ["Hello World"]
    })    

    request
    .post(QX_URL)
    .send(param)
    .end(function(err, res){
      res.body.result.should.equal("Hello World")
      done() 
    })
  })

  it('getArrayInteger', function(done){

    var param = qx_param({
      method: 'getArrayInteger',
      params: [[1,2,3,4]]
    })    

    request
    .post(QX_URL)
    .send(param)
    .end(function(err, res){
      res.body.result.toString().should.equal([1,2,3,4].toString())
      done() 
    })
  })

  it('getArrayString', function(done){

    var param = qx_param({
      method: "getArrayString",
      params: [["one", "two", "three", "four"]]
    })    

    request
    .post(QX_URL)
    .send(param)
    .end(function(err, res){
      res.body.result.toString().should.equal(["one", "two", "three", "four"].toString())
      done() 
    })
  })

  it('getObject', function(done){

    var param = qx_param({
      method: "getObject",
      params: [{}]
    })

    request
    .post(QX_URL)
    .send(param)
    .end(function(err, res){
      assert.equal(typeof res.body.result, "object")  
      done() 
    })
  })

  it('getTrue', function(done){
  
    var param = qx_param({
      method: "getTrue",
      params: [true]
    })

    request
    .post(QX_URL)
    .send(param)
    .end(function(err, res){
      assert.equal(res.body.result, true);
      done() 
    })
  })

  it('getFalse', function(done){
    var param = qx_param({
      method: "getFalse",
      params: [false]
    })
    request
    .post(QX_URL)
    .send(param)
    .end(function(err, res){
      assert.equal(res.body.result, false);
      done() 
    })
  })

  it('getNull', function(done){
    var param = qx_param({
      method: "getNull",
      params: [null]
    })
    request
    .post(QX_URL)
    .send(param)
    .end(function(err, res){
      assert.equal(res.body.result, null);
      done() 
    })
  })

  it('isInteger', function(done){
    var param = qx_param({
      method: "isInteger",
      params: [1]
    })
    request
    .post(QX_URL)
    .send(param)
    .end(function(err, res){
      assert.equal(res.body.result, true);
      done() 
    })
  })

  it('isFloat', function(done){
    var param = qx_param({
      method: "isFloat",
      params: [1.4]
    })
    request
    .post(QX_URL)
    .send(param)
    .end(function(err, res){
      assert.equal(res.body.result, true);
      done() 
    })
  })

  it('isString', function(done){
    var param = qx_param({
      method: "isString",
      params: ["hello world"]
    })

    request
    .post(QX_URL)
    .send(param)
    .end(function(err, res){
      assert.equal(res.body.result, true);
      done() 
    })
  })

  it('isBoolean', function(done){
    var param = qx_param({
      method: "isBoolean",
      params: [true]
    })

    request
    .post(QX_URL)
    .send(param)
    .end(function(err, res){
      assert.equal(res.body.result, true);
      done() 
    })
  })

  it('isArray', function(done){
    var param = qx_param({
      method: "isArray",
      params: [[1,2,3]]
    })

    request
    .post(QX_URL)
    .send(param)
    .end(function(err, res){
      assert.equal(res.body.result, true);
      done() 
    })
  })

  it('isObject', function(done){
    var param = qx_param({
      method: "isObject",
      params: [{}]
    })

    request
    .post(QX_URL)
    .send(param)
    .end(function(err, res){
      assert.equal(res.body.result, true);
      done() 
    })
  })

  it('isNull', function(done){
    var param = qx_param({
      method: "isNull",
      params: [null]
    })
    request
    .post(QX_URL)
    .send(param)
    .end(function(err, res){
      assert.equal(res.body.result, true);
      done() 
    })
  })

  it('getParams', function(done){
    var param = qx_param({
      method: "getParams",
      params: ["somewhere"]
    })

    request
    .post(QX_URL)
    .send(param)
    .end(function(err, res){
      assert.equal(res.body.result.toString(), param.params.toString());
      done() 
    })
  })

  it('getParam', function(done){
    var param = qx_param({
      method: "getParam",
      params: ["somewhere", "in", "the", "world"]
    })
    request
    .post(QX_URL)
    .send(param)
    .end(function(err, res){
      assert.equal(res.body.result.toString(), "somewhere");
      done() 
    })
  })

  it('getCurrentTimestamp', function(done){
    var param = qx_param({
      method: "getCurrentTimestamp",
    })

    request
    .post(QX_URL)
    .send(param)
    .end(function(err, res){
      assert.equal(res.body.result.toString(), "new Date(Date.UTC(2006,5,20,22,18,42,223))");
      done() 
    })
  })
})

describe("Error message", function(){
  it("Invalid service", function(done){
    var param = qx_param({
      service: "notValidService" 
    })
    
    request
    .post(QX_URL)
    .end(function(err, res){
      assert.equal(res.body.error.code, 2);
      done() 
    }) 
  })

  it("Invalid method", function(done){
    var param = qx_param({
      method: "notValidMethod" 
    })
    
    request
    .post(QX_URL)
    .send(param)
    .end(function(err, res){
      assert.equal(res.body.error.code, 4);
      done() 
    }) 
  })
})
