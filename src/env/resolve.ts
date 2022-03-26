import {
  resolve,
} from 'path';
import dotenv from 'dotenv';
import {
  readFileSync,
} from 'fs';

const cwd = process.cwd();
const baseEnvFilePath = resolve(cwd, '.env');

export const set = (NODE_ENV?: string) => {
  try {
    const path: string = `${baseEnvFilePath}${NODE_ENV ? `.${NODE_ENV}` : ''}`;
    dotenv.config({ path });
  } catch (error: any) {
    // only ignore error if file is not found
    if (error.toString().indexOf('ENOENT') < 0) {
      console.log(error);
    }
  }
};

export const parse = (NODE_ENV?: string): Object => {
  try {
    const path: string = `${baseEnvFilePath}${NODE_ENV ? `.${NODE_ENV}` : ''}`;
    return dotenv.parse(readFileSync(path));
  } catch (error: any) {
    // only ignore error if file is not found
    if (error.toString().indexOf('ENOENT') < 0) {
      console.log(error);
    }
  }
  return Object.create(null);
};
