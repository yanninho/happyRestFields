'use strict';
/**
* Extract fields from request
* Example : /test?fields=name,email,address(city) give req.happyRest.fields = ["name","mail",{"address":["city"]}]
**/
var extractFields = require('./lib/extractFields')
	,formatResult = require('./lib/formatResult');

module.exports = {
  selectionFields : function(req, res, next) {
  	if (!req.happyRest) req.happyRest = {};
  	if (req.happyRest.fields) return next();
  	if (!req.result) return next();

  	req.happyRest.fields = {};
  	var fields = req.query.fields;
    if (fields) {
    	var fieldsSelection = extractFields.getSelection(fields);
    	req.result = formatResult.getDatasSelected(req.result, fieldsSelection);
	  }  	
	  next();
  }
};
