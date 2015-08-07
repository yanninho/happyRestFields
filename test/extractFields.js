var express = require('express')
  , request = require('supertest')
  , extractFields = require('../extractFields');

var app = express();

app.use(extractFields.extractFields);

app.use(function(req, res, next){
  res.end(JSON.stringify(req.happyRest.fields));
});

describe('extractFields()', function(){
    it('should extract req.query.fields', function(done){
      request(app)
      .get('/test?fields=name,mail,address(city)')
      .expect('["name","mail",{"address":["city"]}]', done);
    })
 
})
