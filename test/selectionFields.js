var express = require('express'),
  request = require('supertest'),
  fields = require('../fields');

var app = express();


app.use(function(req, res, next){
  req.result=[
    {
      "name":"toto",
      "username":"titi",
      "address": {
        "street":"5, avenue ...",
        "city":"Alenya",
        "zipcode" : "66200"
      },
      "vehicle" : [
        "velo rockrider",
        {
          marque : "Citroen",
          modele : "Xsara"
        },
        {
          marque : "Citroen",
          modele : "C4"
        },
        {
          modele : "306"
        },
      ]
    }
  ];
  next();
});

app.use(fields.selectionFields);

app.use(function(req, res, next){
  res.end(JSON.stringify(req.result));
});

describe('selection fields', function(){
    it('should extract name', function(done){
      request(app)
      .get('/test?fields=name')
      .expect('[{"name":"toto"}]', done);
    });

    it('should extract address.city + address.street', function(done){
      request(app)
      .get('/test?fields=address(city;street)')
      .expect('[{"address":{"city":"Alenya","street":"5, avenue ..."}}]', done);
    });

    it('should extract vehicle(marque)', function(done){
      request(app)
      .get('/test?fields=vehicle(marque)')
      .expect('[{"vehicle":[{"marque":"Citroen"},{"marque":"Citroen"}]}]', done);
    });

    it('should extract vehicle(modele) + address.zipcode + username', function(done){
      request(app)
      .get('/test?fields=vehicle(modele),address(zipcode),username')
      .expect('[{"vehicle":[{"modele":"Xsara"},{"modele":"C4"},{"modele":"306"}],"address":{"zipcode":"66200"},"username":"titi"}]', done);
    });


});
