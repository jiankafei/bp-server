import 'module-alias/register';
import './env/set';
import ora from 'ora';
import chalk from 'chalk';
import app from './app';
import {
  getIPv4,
} from './util';

const {
  PORT,
} = process.env;

app.on('error', (error) => {
  console.log(chalk.red(error.message));
});

const serverSpn = ora('启动服务').start();
app.listen(PORT, () => {
  serverSpn.succeed('服务启动成功').stop();
  const { local, net } = getIPv4();
  local && console.log(chalk.blue(`local: http://${local.address}:${PORT}`));
  net && console.log(chalk.blue(`net: http://${net.address}:${PORT}`));
});
