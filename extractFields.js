'use strict';
/**
* Extract fields from request
* Example : /test?fields=name,email,address(city) give req.happyRest.fields = ["name","mail",{"address":["city"]}]
**/
var _ = require('underscore');

module.exports = {
  extractFields: function(req, res, next) {
    if (!req.happyRest) req.happyRest = {};
    if (req.happyRest.fields) return next();

    req.happyRest.fields = {};

    var fields = req.query.fields;
    
    if (fields) {
		var rangeFields = fields.split(',');
		req.happyRest.fields = _.map(rangeFields, function(field) {
			var newField = field;				
			if (field.indexOf('(') > -1 && field.indexOf(')') > -1) {
				var regExp = /(.*)\((.*)\)/g;
				var tabRegExp = regExp.exec(field);
				var nameField = tabRegExp[1];
				var tabUnderField = tabRegExp[2].split(';');
				newField = {};
				newField[nameField] = tabUnderField;					
			}
			return newField;
		});
	}
    next();
  }
};
