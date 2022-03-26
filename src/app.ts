import Koa from 'koa';
import body from 'koa-body';
import chalk from 'chalk';
// import compress from 'koa-compress';
// import path from 'path';
// import serve from 'koa-static';
import db from './db';
import router from './routes';
import {
  send,
} from './middleware';

const app = new Koa();

app.use(send);

app.use(body());

// app.use(compress({ br: {} }));
// app.use(serve(path.resolve(__dirname, config.webDir)));

app.use(router.routes())
app.use(router.allowedMethods());

const exitHandler = () => {
  console.log(chalk.red('process exit.'));
  db.close((err) => {
    process.exitCode = err ? 1 : 0;
  });
};

process.on('SIGINT', exitHandler)
process.on('SIGTERM', exitHandler)
process.on('SIGQUIT', exitHandler)

export default app;
