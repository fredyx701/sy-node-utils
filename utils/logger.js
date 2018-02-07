const Tools = require('./tools');


let forkname = '';
if (process.forkname) {
    forkname = ' ' + process.forkname.trim() + ' ';
}


/**
 * 日志类
 */
class Logger {

    static log() {
        console.log(_logName(' INFO:'), ...arguments);
    }

    static info() {
        console.log(_logName(' INFO:'), ...arguments);
    }

    static error() {
        if (arguments.length === 1) {
            const err = arguments[0];
            if (err instanceof Error) {
                console.error(_logName(''), Error('where the error location').stack, '\n============>', err.stack);
            } else {
                console.error(_logName(''), Error(err).stack);
            }
        } else {
            console.error(_logName(' ERROR:'), ...arguments);
        }
    }

    static warn() {
        console.warn(_logName(' WARN:'), ...arguments);
    }

    static debug() {
        if (process.env.DEBUG) {
            console.log(_logName(' DEBUG:'), ...arguments);
        }
    }
}


/**
 * 拼接日志名称
 * @param str
 */
function _logName(str) {
    const time = Tools.timeFormat();
    return time + forkname + process.pid + str;
}


module.exports = Logger;
