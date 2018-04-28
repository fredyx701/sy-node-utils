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
        const date = dateTime ? new Date(dateTime) : new Date();
        let year = Tools.zeroPad(date.getFullYear(), 4);
        let month = Tools.zeroPad(date.getMonth() + 1, 2);
        let day = Tools.zeroPad(date.getDate(), 2);
        let hour = Tools.zeroPad(date.getHours(), 2);
        let minute = Tools.zeroPad(date.getMinutes(), 2);
        let second = Tools.zeroPad(date.getSeconds(), 2);
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
     * 填充0
     */
    static zeroPad(str, length) {
        str = str + '';
        while (str.length < length) {
            str = '0' + str;
        }
        return str;
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
        return arr.map((i) => {
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
        return [...new Set(arr1.concat(arr2))];
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

    /**
     * 是否空对象
     * @return {Boolean} [description]
     */
    static isEmptyObj(obj) {
        for (let i in obj) {
            return false;
        }

        return true;
    }

    /**
     * 深度克隆对象
     * @param  {[type]} obj [description]
     * @return {[type]}     [description]
     */
    static cloneObj(obj) {
        let o;
        switch (typeof obj) {
            case 'undefined':
                break;
            case 'string':
                o = obj + '';
                break;
            case 'number':
                o = obj - 0;
                break;
            case 'boolean':
                o = obj;
                break;
            case 'object':
                if (obj === null) {
                    o = null;
                } else {
                    if (obj instanceof Array) {
                        o = [];
                        for (let i = 0, len = obj.length; i < len; i++) {
                            o.push(clone(obj[i]));
                        }
                    } else {
                        o = {};
                        for (let k in obj) {
                            o[k] = clone(obj[k]);
                        }
                    }
                }
                break;
            default:
                o = obj;
                break;
        }
        return o;
    }

    /**
     * 对象数组排序，根据指定的属性值(一个或多个)及其排序方式(正序/倒序)，依次排序
     *               如果一个条件相同，则根据下一个条件进行排序，以此类推，直到条件用完，或是某一条件不同
     *
     * 参数：arr  - 需要排序的数据
     *       sort - 排序方式
     * 示例: fSortArr(arr, '属性名', { by: '属性名', bAsc: true }, { by: '属性名', bAsc: true }. { by: function(obj){ 一些逻辑处理; return 一个数值 }, bAsc: false }, ...);
     *                               by: 要排序的属性名，bAsc: true/正序、false/倒序
     *                               by: 也可以是一个方法，接收数组中当前的一个值（对象），然后返回一个数值
     */
    static fSortArr() {
        let sortArr = [];
        for (let i = 1, len = arguments.length; i < len; i++) {
            if ('string' == $.type(arguments[i])) {
                arguments[i] = {by: arguments[i], bAsc: true}
            }
            sortArr.push(arguments[i]);
        }
        arr.sort(function (a, b) {
            return fSort(a, b, 0);
        });

        function fSort(a, b, index) {
            let sort = sortArr[index];
            if (!sort) {
                return 0;
            }
            if ('string' == $.type(sort.by)) {
                return fCompare(a[sort.by], b[sort.by]);
            } else {
                let av = sort.by(a),
                    bv = sort.by(b);
                return fCompare(av, bv);
            }

            function fCompare(av, bv) {
                if (av != bv) {
                    return sort.bAsc ? av - bv : bv - av;
                } else {
                    index++;
                    return fSort(a, b, index);
                }
            }
        }
    }

    /**
     * 根据输入时间，输出天数
     * @return {[type]} [description]
     * eg: let days = getMiddleDays('2016-10-01 12:12:12', '2016-11-02 12:12:12');
     */
    getMiddleDays() {
        let startDate = new Date(startTime);
        let endMonth = new Date(endTime).getMonth();
        let endDays = new Date(endTime).getDate();

        let days = [],
            date = startDate,
            y, m, d;
        while (true) {
            y = date.getFullYear();
            m = ('00' + (date.getMonth() + 1)).substring(String(date.getMonth() + 1).length);
            d = ('00' + date.getDate()).substring(String(date.getDate() + 1).length);
            days.push(y + '-' + m + '-' + d);
            if ((startDate.getMonth() === endMonth) && (startDate.getDate() === endDays)) {
                console.log('break')
                break;
            }
            date = new Date(startDate.setDate(startDate.getDate() + 1));

        }
        return days;
    }

}


module.exports = Tools;