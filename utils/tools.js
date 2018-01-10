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
    static timeFormat(dateTime, format) {
        function fix(str) {
            str = str + '';
            return str.length < 2 ? '0' + str : str;
        }

        const date = dateTime ? new Date(dateTime) : new Date();
        let year = date.getFullYear() + '';
        let month = fix(date.getMonth() + 1);
        let day = fix(date.getDate());
        let hour = fix(date.getHours());
        let minute = fix(date.getMinutes());
        let second = fix(date.getSeconds());
        let output = '';
        if (format) {
            let maps = {
                'yyyy': year,
                'MM': month,
                'dd': day,
                'HH': hour,
                'mm': minute,
                'ss': second
            };
            let trunk = new RegExp(Object.keys(maps).join('|'), 'g');
            output = format.replace(trunk, function (capture) {
                return maps[capture] ? maps[capture] : '';
            });
        } else {
            output = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
        }
        return output;
    }


    /**
     * 数组随机排序
     * @param array []
     */
    static shuffle(array) {
        for (let i = 0, len = array.length; i < len; i++) {
            let randomIndex = parseInt(Math.random() * len);
            let temp = array[randomIndex];
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
        for (let i = 0; i < arr.length; ++i) {
            arr[i] = Number(arr[i]);
        }
        return arr;
    }


    /**
     * 对object数组按照关键key排序
     * @param key
     * @param array   [{}]
     */
    static sortByKey(key, array) {
        array.sort(function (a, b) {
            if (a[key] && b[key]) {
                if (a[key] == b[key]) {
                    return 0;
                }
                return (a[key] < b[key]) ? 1 : -1;
            } else {
                return 0;
            }
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
     * 返回当前时间戳，单位秒
     */
    static now() {
        return Math.ceil(Date.now() / 1000);
    }


    /**
     * 生成指定长度随机字符串
     * @param length
     */
    static randString(length) {
        const str = "0123456789abcdefghijklmnopqrstuvwyxz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
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
        let hash = crypto.createHash('md5');
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
        let hash = crypto.createHash('md5');
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
        for (let item of list) {
            let kv = item.trim().split('=');
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
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                resolve();
            }, time);
        });
    }
}


module.exports = Tools;