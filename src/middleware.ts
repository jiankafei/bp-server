import {
  Context,
  Next,
} from 'koa';
import {
  STATUS_CODES,
} from 'http';

type middleware = (ctx: Context, next: Next) => Promise<any>;

export const send: middleware = async (ctx, next) => {
  ctx.send = (options = {}) => {
    const { status = 200, message, body, type, length } = options;
    const msg = message ?? STATUS_CODES[status] ?? '';
    if (status >= 200 && status < 300 || status === 304) {
      ctx.status = status;
      msg && (ctx.message = msg);
      type && (ctx.type = type);
      length && (ctx.length = length);
      body && (ctx.body = body);
    } else {
      ctx.throw(status, msg);
    }
  };
  await next();
};
