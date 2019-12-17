'use strict';

const crypto = require('crypto');
const { timeFormat, zeroPad, convertTimezone } = require('./time_format');
const render = require('./render');

module.exports = {

    timeFormat,
    zeroPad,
    convertTimezone,

    render,

    /**
     * 数组随机排序
     * @param array []
     */
    shuffle(array) {
        for (let i = 0, len = array.length; i < len; i++) {
            const randomIndex = parseInt(Math.random() * len);
            const temp = array[randomIndex];
            array[randomIndex] = array[i];
            array[i] = temp;
        }
        return array;
    },


    /**
     * 随机取值
     * @param array 提供 一组数据值 随机获取
     */
    randomArray(array) {
        return array[Math.floor(Math.random() * array.length)];
    },

    /**
     * 随机范围内的整数
     * 包含 start 和 end 的值
     */
    randomInt(start, end) {
        return start + Math.floor(Math.random() * (end - start + 1));
    },

    /**
     * string数组转换number数组
     * @param arr
     */
    arrayParseInt(arr) {
        return arr.map(i => {
            return Number(i);
        });
    },


    /**
     * 交集
     */
    intersect(arr1, arr2) {
        const set2 = new Set(arr2);
        return arr1.filter(x => set2.has(x));
    },


    /**
     * 并集
     */
    union(arr1, arr2) {
        return [ ...new Set(arr1.concat(arr2)) ];
    },


    /**
     * 对object数组按照关键key排序
     * @param key
     * @param array   [{}]
     */
    sortByKey(key, array) {
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
    },


    /**
     * 删除数组中的某个值  只删除一个
     * @param array
     * @param value
     */
    ArrayDelete(array, value) {
        for (let i = 0; i < array.length; ++i) {
            if (array[i] == value) {
                array.splice(i, 1);
                break;
            }
        }
    },


    /**
     * 时间戳，单位秒
     */
    now(date) {
        if (date) {
            return Math.floor(new Date(date).getTime() / 1000);
        }
        return Math.floor(Date.now() / 1000);
    },


    /**
     * 生成指定长度随机字符串
     * @param length
     */
    randString(length) {
        const str = '0123456789abcdefghijklmnopqrstuvwyxz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const str_len = str.length;
        let rand = '';
        for (let i = 0; i < length; i++) {
            rand = rand + str.charAt(Math.random() * str_len);
        }
        return rand;
    },


    /**
     * 生成随机摘要
     * @param str
     */
    createHash(str) {
        const hash = crypto.createHash('md5');
        hash.update(this.randString(20) + Date.now() + (str ? JSON.stringify(str) : ''), 'utf8');
        return hash.digest('hex').toUpperCase();
    },


    /**
     * 异常封装
     * @param err
     * @return {Error}
     * @constructor
     */
    error(err) {
        return err instanceof Error ? err : Error(err);
    },


    /**
     * MD5
     * @param str
     * @param raw
     */
    MD5(str, raw) {
        const hash = crypto.createHash('md5');
        hash.update(str, 'utf8');
        return hash.digest(raw);
    },


    /**
     * cookie解析
     * @param str
     * @return {{}}
     */
    cookieParser(str) {
        const body = {};
        const list = str.split(';');
        for (const item of list) {
            const kv = item.trim().split('=');
            body[kv[0]] = kv[1];
        }
        return body;
    },


    /**
     * 时间阻塞
     * @param time
     * @return {Promise}
     */
    sleep(time) {
        return new Promise(resolve => {
            setTimeout(function() {
                resolve();
            }, time);
        });
    },

    /**
     * 延迟
     */
    delay() {
        return new Promise(resolve => {
            setImmediate(function() {
                resolve();
            });
        });
    },

    /**
     * 是否空对象
     * @return {Boolean} [description]
     */
    isEmptyObj(obj) {
        for (const i in obj) {
            return false;
        }

        return true;
    },
};
