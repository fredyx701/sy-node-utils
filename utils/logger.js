const Tools = require('./tools');


if (!process.forkname) {
    process.forkname = '';
}


/**
 * 日志类
 */
class Logger {

    static log() {
        console.log.apply(console, [_logName(' INFO: ')].concat(Array.prototype.slice.call(arguments)));
    }

    static info() {
        console.log.apply(console, [_logName(' INFO: ')].concat(Array.prototype.slice.call(arguments)));
    }

    static error(err) {
        if (err instanceof Error) {
            console.error(_logName(''), Error('where the error location').stack, '\n============>', err.stack);
        } else {
            console.error(_logName(''), Error(err).stack);
        }
    }

    static warn() {
        console.warn.apply(console, [_logName(' WARN: ')].concat(Array.prototype.slice.call(arguments)));
    }

    static debug() {
        if (process.env.DEBUG) {
            console.log.apply(console, [_logName(' DEBUG: ')].concat(Array.prototype.slice.call(arguments)));
        }
    }
}


/**
 * 拼接日志名称
 * @param str
 */
function _logName(str) {
    const time = Tools.timeFormat();
    return time + ' ' + process.forkname + ' ' + process.pid + str;
}


module.exports = Logger;
