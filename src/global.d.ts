import {
  ExtendableContext,
} from 'koa';

declare module 'koa' {
  export interface ExtendableContext {
    send(opts?: {
      status?: number,
      message?: string,
      type?: string,
      length?: number,
      body?: any,
    }): void;
  };
}
