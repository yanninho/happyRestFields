# happyRestFields
Express middleware which extract fields from request

# Example : 

	request : /test?fields=name,mail,address(city)
	result : req.happyRest.fields = ["name", "mail", { "address" : ["city"] }]

# install

npm install happyrestfields

# How to use ?

like all others Express middleware : 

## Application-level : 

var express = require('express')
  , happyRestFields = require('happyRestFields');

var app = express();

app.use(extractFields());

app.use('/test?fields=name,mail,address(city)', function (req, res, next) {
  console.log('Filters:', req.happyRest.fields);
  next();
});

## Route-level : 

var express = require('express')
  , happyRestFields = require('happyRestFields');

var router = express.Router();

router.get('/test?fields=name,mail,address(city)', extractFilters(), function (req, res, next) {
	  console.log('Filters:', req.happyRest.fields);
	  next();
	})
