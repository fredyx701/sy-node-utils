'use strict';

const { tools, logger, Tools, Lodash: _ } = require('../index');

logger.info(tools.createHash());
logger.info(tools.MD5('123', 'hex'));
logger.info(Tools.now());
logger.info(_.get({ a: null }, 'a', 1));

const str = 'begin {{if a}} if {{a}} {{else if b}} else if {{b}} {{else}} else {{c}} {{/if}} end';
const data = { a: 0, b: 0, c: 1 };
logger.info(tools.render(str, data));

logger.info(tools.timeFormat(new Date(), 'yyyyMMddHHmmss', '+01:00'));
logger.info(tools.timeFormat(new Date(), 'yyyyMMddHHmmss'));
