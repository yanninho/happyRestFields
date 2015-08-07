'use strict';

var _ = require('underscore');

exports.getDatasSelected = function(datas,fieldSelection) {
	return _.map(datas, function(item) {
		var itemsResult = {};
		_.each(fieldSelection, function(field) {
			if (_.isObject(field)) {
				_.mapObject(field, function(vals, key) {
					if (!_.isUndefined(item[key])) {								
						if (_.isArray(vals)) {									
							_.each(vals, function(val) {										
								if (!_.isUndefined(item[key][val])) {
									if (_.isUndefined(itemsResult[key]))  {
										itemsResult[key] = {};
									}
									itemsResult[key][val] = item[key][val];
								}
							});
						}								
					}
				  
				});						
			}
			else {
				if (!_.isUndefined(item[field])) {
					itemsResult[field] = item[field];
				}
			}
			
		});
		return itemsResult;
	})	
}