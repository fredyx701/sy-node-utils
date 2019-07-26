'use strict';

const { Tools: tools, Logger: logger } = require('../index');

logger.info(tools.createHash());
logger.info(tools.MD5('123', 'hex'));

const str = 'begin {{if a}} if {{a}} {{else if b}} else if {{b}} {{else}} else {{c}} {{/if}} end';
const data = { a: 0, b: 0, c: 1 };
logger.info(tools.render(str, data));
