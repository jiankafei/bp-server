import { set } from './resolve';

process.env.NODE_ENV = process.env.NODE_ENV ?? 'development';

set(process.env.NODE_ENV);
set();
