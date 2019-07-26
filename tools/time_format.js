'use strict';


module.exports = {
    /**
    * 1481074902627 => '2016-12-07 09:41:42'
    * '2016-12-13T09:10:25.000Z' => '2016-12-13 17:10:25'
    * @returns {string}
    * 调用:
    *    timeFormat(1481074902627);
    *    timeFormat(Date.now());
    *
    * @param dateTime
    * @param format     yyyyMMddHHmmss   默认  yyyy-MM-dd HH:mm:ss
    */
    timeFormat(dateTime, format, timeZone = 'local') {

        const date = dateTime ? new Date(dateTime) : new Date();

        let year;
        let month;
        let day;
        let hour;
        let minute;
        let second;
        // let millisecond;

        if (timeZone === 'local') {
            year = this.zeroPad(date.getFullYear(), 4);
            month = this.zeroPad(date.getMonth() + 1, 2);
            day = this.zeroPad(date.getDate(), 2);
            hour = this.zeroPad(date.getHours(), 2);
            minute = this.zeroPad(date.getMinutes(), 2);
            second = this.zeroPad(date.getSeconds(), 2);
        // millisecond = zeroPad(date.getMilliseconds(), 3);
        } else {
            const tz = this.convertTimezone(timeZone);

            if (tz !== false && tz !== 0) {
                date.setTime(date.getTime() + (tz * 60000));
            }

            year = this.zeroPad(date.getUTCFullYear(), 4);
            month = this.zeroPad(date.getUTCMonth() + 1, 2);
            day = this.zeroPad(date.getUTCDate(), 2);
            hour = this.zeroPad(date.getUTCHours(), 2);
            minute = this.zeroPad(date.getUTCMinutes(), 2);
            second = this.zeroPad(date.getUTCSeconds(), 2);
        // millisecond = zeroPad(date.getUTCMilliseconds(), 3);
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
    },

    /**
     * 填充0
     */
    zeroPad(number, length) {
        number = number + '';
        while (number.length < length) {
            number = '0' + number;
        }
        return number;
    },

    /**
     * 时区转换
     * @param {Number} tz 'Z', +08:00, -08:00, +HH:MM or -HH:MM
     * @return {Number} 相对于UTC的分钟数
     */
    convertTimezone(tz) {
        if (tz === 'Z') {
            return 0;
        }
        const m = tz.match(/([\+\-\s])(\d\d):?(\d\d)?/);
        if (m) {
            return (m[1] === '-' ? -1 : 1) * (parseInt(m[2], 10) + ((m[3] ? parseInt(m[3], 10) : 0) / 60)) * 60;
        }
        return false;
    },
};
