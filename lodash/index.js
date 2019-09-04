'use strict';

const lodash = require('lodash');
const sy_lodash = {};

for (const key in lodash) {
    if (lodash.hasOwnProperty(key) && typeof lodash[key] === 'function') {
        sy_lodash[key] = function() {
            return lodash[key](...arguments);
        };
    }
}

sy_lodash.get = function(object, path, defaultValue) {
    const value = lodash.get(...arguments);
    if (value === undefined || value === null) {
        return defaultValue;
    }
    return value;
};

module.exports = sy_lodash;
