import {
  createConnection,
  Connection,
} from 'mongoose';
import ora from 'ora';
import chalk from 'chalk';

const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_IP,
  DB_PORT = 27017,
  DB_DATEBASE = '',
  DB_ADDR_QUERY = '',
} = process.env;

// 连接数据库
const conndbSpn = ora('连接数据库').start();

const auth = DB_USERNAME && DB_PASSWORD ? `${DB_USERNAME}:${DB_PASSWORD}@` : '';

const db: Connection = createConnection(`mongodb://${auth}${DB_IP}:${DB_PORT}${DB_DATEBASE}${DB_ADDR_QUERY}`, {
  loggerLevel: 'warn', // error, warn, info, debug
  autoIndex: false,
  // bufferCommands: false,
  // bufferMaxEntries: 0,
});

db.addListener('connected', () => {
  conndbSpn.succeed('数据库连接成功');
});

db.addListener('error', (error) => {
  conndbSpn.fail('数据库连接失败');
  console.log(chalk.red(error.message));
  db.close((err) => {
    console.log(chalk.red('db close.'));
    process.exitCode = err ? 1 : 0;
  });
});

export default db;
