'use strict';

const lodash = require('lodash');

const original_get = lodash.get;

lodash.get = function(object, path, defaultValue) {
    const value = original_get(...arguments);
    if (defaultValue === undefined) {
        return value;
    }
    return value || defaultValue;
};

module.exports = lodash;
