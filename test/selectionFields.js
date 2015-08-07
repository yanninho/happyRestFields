var express = require('express')
  , request = require('supertest')
  , fields = require('../fields');

var app = express();


app.use(function(req, res, next){
  req.result=[{"name":"toto","username":"titi"}];
  next();
});

app.use(fields.selectionFields);

app.use(function(req, res, next){
  res.end(JSON.stringify(req.result));
});

describe('resultSelectFields()', function(){
    it('should extract req.query.fields', function(done){
      request(app)
      .get('/test?fields=name')
      .expect('[{"name":"toto"}]', done);
    })
 
})
