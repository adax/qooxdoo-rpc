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
      res.body.result.should.equal(0.33333)
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
      params: [1,2,3,4]
    })    

    request
    .post(QX_URL)
    .send(param)
    .end(function(err, res){
      res.body.result.should.equal([1,2,3,4])
      done() 
    })
  })

  it('getArrayString', function(done){

    var param = qx_param({
      method: "getArrayString",
      params: ["one", "two", "three", "four"]
    })    

    request
    .post(QX_URL)
    .send(param)
    .end(function(err, res){
      res.body.result.should.equal(["one", "two", "three", "four"])
      done() 
    })
  })

  it('getObject', function(done){

    var param = qx_param({
      method: "getObject",
      params: {}
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
    request
    .post(QX_URL)
    .send(param)
    .end(function(err, res){
      //240s delay
      done() 
    })
  })

  it('getFalse', function(done){
    request
    .post(QX_URL)
    .send(param)
    .end(function(err, res){
      //240s delay
      done() 
    })
  })

  it('getNull', function(done){
    request
    .post(QX_URL)
    .send(param)
    .end(function(err, res){
      //240s delay
      done() 
    })
  })

  it('isInteger', function(done){
    request
    .post(QX_URL)
    .send(param)
    .end(function(err, res){
      //240s delay
      done() 
    })
  })

  it('isFloat', function(done){
    request
    .post(QX_URL)
    .send(param)
    .end(function(err, res){
      //240s delay
      done() 
    })
  })

  it('isString', function(done){
    request
    .post(QX_URL)
    .send(param)
    .end(function(err, res){
      //240s delay
      done() 
    })
  })

  it('isBoolean', function(done){
    request
    .post(QX_URL)
    .send(param)
    .end(function(err, res){
      //240s delay
      done() 
    })
  })

  it('isArray', function(done){
    request
    .post(QX_URL)
    .send(param)
    .end(function(err, res){
      //240s delay
      done() 
    })
  })

  it('isObject', function(done){
    request
    .post(QX_URL)
    .send(param)
    .end(function(err, res){
      //240s delay
      done() 
    })
  })

  it('isNull', function(done){
    request
    .post(QX_URL)
    .send(param)
    .end(function(err, res){
      //240s delay
      done() 
    })
  })

  it('getParams', function(done){
    request
    .post(QX_URL)
    .send(param)
    .end(function(err, res){
      //240s delay
      done() 
    })
  })

  it('getParam', function(done){
    request
    .post(QX_URL)
    .send(param)
    .end(function(err, res){
      //240s delay
      done() 
    })
  })

  it('getCurrentTimestamp', function(done){
    request
    .post(QX_URL)
    .send(param)
    .end(function(err, res){
      //240s delay
      done() 
    })
  })
})
