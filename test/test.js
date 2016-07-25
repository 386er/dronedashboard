/*global buster*/
define([
'buster'
], function(buster) {


	var assert = buster.assert;

	buster.testCase('A PathFinderView test case', {
		'setUp': function() {
			value = 5;
		},

		'for general setup': function() {
			assert.equals(value, 5);
		}

	});
});