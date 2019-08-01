'use strict';

const Tools = require('../tools');


let forkname = ' ';
if (process.forkname) {
    forkname = ' ' + process.forkname.trim() + ' ';
}


/**
 * 拼接日志名称
 * @param str
 */
function _logName(str) {
    const time = Tools.timeFormat();
    return time + forkname + process.pid + str;
}


module.exports = {
    log() {
        console.log(_logName(' INFO:'), ...arguments);
    },

    info() {
        console.log(_logName(' INFO:'), ...arguments);
    },

    error() {
        console.error(_logName(' ERROR:'), ...arguments);

        /* if (arguments.length === 1) {
            const err = arguments[0];
            if (err instanceof Error) {
                console.error(_logName(''), err);
            } else {
                console.error(_logName(''), Error(typeof err === 'object' ? JSON.stringify(err) : err));
            }
        } else {
            console.error(_logName(' ERROR:'), ...arguments);
        } */
    },

    warn() {
        console.warn(_logName(' WARN:'), ...arguments);
    },

    debug() {
        if (process.env.DEBUG) {
            console.log(_logName(' DEBUG:'), ...arguments);
        }
    },
};
