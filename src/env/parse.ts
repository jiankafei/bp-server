import { parse } from './resolve';

export const parseEnv = (NODE_ENV: string) => Object.assign({}, parse(), parse(NODE_ENV));
