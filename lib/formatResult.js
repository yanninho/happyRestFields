var _ = require('underscore');

var searchItemOnArray = function(arrayItem, vals) {
	var itemsResult = [];
	_.each(arrayItem, function(elem) {
		if (_.isObject(elem)) {
			var keysElem = _.keys[elem];
			var existVals = _.union(keysElem, vals);
			if (existVals.length > 0) {
				newItem = {};
				_.each(existVals, function(existVal) {
					if (elem[existVal] !== undefined) {
						newItem[existVal] = elem[existVal];
					}					
				});
				if (_.keys(newItem).length > 0) itemsResult.push(newItem);
			}
		}
	});
	return itemsResult;
};

var searchItem = function(item, key, vals) {
	var itemsResult = {};	
		_.each(vals, function(val) {										
			if (!_.isUndefined(item[key][val])) {
				if (_.isUndefined(itemsResult[key]))  {
					itemsResult[key] = {};
				}
				itemsResult[key][val] = item[key][val];
			}
		});
	return itemsResult;	
};

exports.getDatasSelected = function(datas,fieldSelection) {
	// for each datas => item
	return _.map(datas, function(item) {
		var itemsResult = {};
		// for each selection items => field
		_.each(fieldSelection, function(field) {
			// if field is an object with keys / values
			if (_.isObject(field)) {
				// pour chaque clé / valeur de field selection
				_.mapObject(field, function(vals, key) {
					if (!_.isUndefined(item[key])) {							
						if (_.isArray(item[key])) {							
							itemsResult[key] = searchItemOnArray(item[key], vals);
						}
						else if (_.isObject(item[key])) {
							var newSearchedItem = searchItem(item, key, vals);
							for (var attr in newSearchedItem) {
								itemsResult[attr] = newSearchedItem[attr];
							}
						}		
					}													  
				});						
			}
			// if field is a string
			else if (typeof field === "string") {				
				if (!_.isUndefined(item[field])) {
					itemsResult[field] = item[field];
				}
			}
			
		});
		return itemsResult;
	});
};