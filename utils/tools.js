'use strict';

const crypto = require('crypto');


/**
 * 工具类
 */
class Tools {

    /**
     * 1481074902627 => '2016-12-07 09:41:42'
     * '2016-12-13T09:10:25.000Z' => '2016-12-13 17:10:25'
     * @returns {string}
     * 调用:
     *    tools.timeFormat(1481074902627);
     *    tools.timeFormat(Date.now());
     *
     * @param dateTime
     * @param format     yyyyMMddHHmmss   默认  yyyy-MM-dd HH:mm:ss
     */
    static timeFormat(dateTime, format, timeZone = 'local') {

        const date = dateTime ? new Date(dateTime) : new Date();

        let year;
        let month;
        let day;
        let hour;
        let minute;
        let second;
        // let millisecond;

        if (timeZone === 'local') {
            year = Tools.zeroPad(date.getFullYear(), 4);
            month = Tools.zeroPad(date.getMonth() + 1, 2);
            day = Tools.zeroPad(date.getDate(), 2);
            hour = Tools.zeroPad(date.getHours(), 2);
            minute = Tools.zeroPad(date.getMinutes(), 2);
            second = Tools.zeroPad(date.getSeconds(), 2);
            // millisecond = Tools.zeroPad(date.getMilliseconds(), 3);
        } else {
            const tz = Tools.convertTimezone(timeZone);

            if (tz !== false && tz !== 0) {
                date.setTime(date.getTime() + (tz * 60000));
            }

            year = Tools.zeroPad(date.getUTCFullYear(), 4);
            month = Tools.zeroPad(date.getUTCMonth() + 1, 2);
            day = Tools.zeroPad(date.getUTCDate(), 2);
            hour = Tools.zeroPad(date.getUTCHours(), 2);
            minute = Tools.zeroPad(date.getUTCMinutes(), 2);
            second = Tools.zeroPad(date.getUTCSeconds(), 2);
            // millisecond = Tools.zeroPad(date.getUTCMilliseconds(), 3);
        }

        let output = '';
        if (format) {
            const maps = {
                yyyy: year,
                MM: month,
                dd: day,
                HH: hour,
                mm: minute,
                ss: second,
            };
            const trunk = new RegExp(Object.keys(maps).join('|'), 'g');
            output = format.replace(trunk, function(capture) {
                return maps[capture] ? maps[capture] : '';
            });
        } else {
            output = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
        }
        return output;
    }


    /**
     * 填充0
     */
    static zeroPad(number, length) {
        number = number + '';
        while (number.length < length) {
            number = '0' + number;
        }
        return number;
    }

    /**
     * 时区转换
     * @param {Number} tz 'Z', +08:00, -08:00, +HH:MM or -HH:MM
     * @return {Number} 相对于UTC的分钟数
     */
    static convertTimezone(tz) {
        if (tz === 'Z') {
            return 0;
        }
        const m = tz.match(/([\+\-\s])(\d\d):?(\d\d)?/);
        if (m) {
            return (m[1] === '-' ? -1 : 1) * (parseInt(m[2], 10) + ((m[3] ? parseInt(m[3], 10) : 0) / 60)) * 60;
        }
        return false;
    }


    /**
     * 数组随机排序
     * @param array []
     */
    static shuffle(array) {
        for (let i = 0, len = array.length; i < len; i++) {
            const randomIndex = parseInt(Math.random() * len);
            const temp = array[randomIndex];
            array[randomIndex] = array[i];
            array[i] = temp;
        }
        return array;
    }


    /**
     * string数组转换number数组
     * @param arr
     */
    static arrayParseInt(arr) {
        return arr.map(i => {
            return Number(i);
        });
    }


    /**
     * 交集
     */
    static intersect(arr1, arr2) {
        const set2 = new Set(arr2);
        return arr1.filter(x => set2.has(x));
    }


    /**
     * 并集
     */
    static union(arr1, arr2) {
        return [ ...new Set(arr1.concat(arr2)) ];
    }


    /**
     * 对object数组按照关键key排序
     * @param key
     * @param array   [{}]
     */
    static sortByKey(key, array) {
        array.sort(function(a, b) {
            if (a[key] && b[key]) {
                if (a[key] == b[key]) {
                    return 0;
                }
                return (a[key] < b[key]) ? 1 : -1;
            }
            return 0;
        });
        return array;
    }


    /**
     * 删除数组中的某个值  只删除一个
     * @param array
     * @param value
     */
    static ArrayDelete(array, value) {
        for (let i = 0; i < array.length; ++i) {
            if (array[i] == value) {
                array.splice(i, 1);
                break;
            }
        }
    }


    /**
     * 时间戳，单位秒
     */
    static now(date) {
        if (date) {
            return Math.floor(new Date(date).getTime() / 1000);
        }
        return Math.floor(Date.now() / 1000);
    }


    /**
     * 生成指定长度随机字符串
     * @param length
     */
    static randString(length) {
        const str = '0123456789abcdefghijklmnopqrstuvwyxz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const str_len = str.length;
        let rand = '';
        for (let i = 0; i < length; i++) {
            rand = rand + str.charAt(Math.random() * str_len);
        }
        return rand;
    }


    /**
     * 生成随机摘要
     * @param str
     */
    static createHash(str) {
        const hash = crypto.createHash('md5');
        hash.update(this.randString(20) + Date.now() + (str ? JSON.stringify(str) : ''), 'utf8');
        return hash.digest('hex').toUpperCase();
    }


    /**
     * 异常封装
     * @param err
     * @return {Error}
     * @constructor
     */
    static error(err) {
        return err instanceof Error ? err : Error(err);
    }


    /**
     * MD5
     * @param str
     * @param raw
     */
    static MD5(str, raw) {
        const hash = crypto.createHash('md5');
        hash.update(str, 'utf8');
        return hash.digest(raw);
    }


    /**
     * cookie解析
     * @param str
     * @return {{}}
     */
    static cookieParser(str) {
        const body = {};
        const list = str.split(';');
        for (const item of list) {
            const kv = item.trim().split('=');
            body[kv[0]] = kv[1];
        }
        return body;
    }


    /**
     * 时间阻塞
     * @param time
     * @return {Promise}
     */
    static sleep(time) {
        return new Promise(resolve => {
            setTimeout(function() {
                resolve();
            }, time);
        });
    }

    /**
     * 是否空对象
     * @return {Boolean} [description]
     */
    static isEmptyObj(obj) {
        for (const i in obj) {
            return false;
        }

        return true;
    }

}


module.exports = Tools;
