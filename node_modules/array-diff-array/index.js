'use strict';
module.exports = function (arr1, arr2) {
	if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
		throw new TypeError('Expected an array');
	}

    if (arguments.length > 2) {
        throw new RangeError('Must be 2 length');
    }

    var diff = [];

    for (var i = 0; i < arr1.length; i++) {
        if (arr2.indexOf(arr1[i]) === -1) { diff.push(arr1[i]); }
    }

    for (var i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) === -1) { diff.push(arr2[i]); }
    }

	return diff;
};
