import {
  configure,
  getLogger,
} from 'log4js';

/**
 * trace
 * debug
 * info
 * warn
 * error
 * fatal
 */

configure({
  pm2: true,
  pm2InstanceVar: 'INSTANCE_ID',
  appenders: {
    // request: {
    //   type: 'dateFile',
    //   filename: '/var/log/request.log',
    //   alwaysIncludePattern: true,
    // },
    // response: {
    //   type: 'dateFile',
    //   filename: '/var/log/response.log',
    // },
    out: {
      type: 'console',
    },
    warn: {
      type: 'dateFile',
      filename: '/var/log/warn.log',
    },
    error: {
      type: 'dateFile',
      filename: '/var/log/error.log',
    },
  },
  categories: {
    // request: {
    //   appenders: ['request'],
    //   level: 'trace',
    // },
    // response: {
    //   appenders: ['response'],
    //   level: 'trace',
    // },
    warn: {
      appenders: ['warn'],
      level: 'warn',
    },
    error: {
      appenders: ['error'],
      level: 'error',
    },
    default: {
      appenders: ['out'],
      level: 'debug',
    },
  },
});

export default getLogger;
