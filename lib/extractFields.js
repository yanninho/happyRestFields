
var _ = require('underscore');

var extractField = function(field) {
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
};

exports.getSelection = function(fields) {	
	var rangeFields = fields.split(',');
	return _.map(rangeFields, function(field) {
		var newField = extractField(field);			
		return newField;
	});	
};