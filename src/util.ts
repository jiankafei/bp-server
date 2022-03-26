import {
  networkInterfaces,
  NetworkInterfaceInfoIPv4,
} from 'os';
import {
  resolve,
} from 'path';
import {
  stat,
  readFile,
} from 'fs/promises';
import mime from 'mime/lite';
import {
  URLSearchParams,
} from 'url';

const cwd = process.cwd();

// 类型
export const tyof = (obj: any): string => Object.prototype.toString.call(obj).slice(8, -1);

// 无效值 invalid value
export const isInvalid = (val: any): boolean => {
  if (Array.isArray(val)) return val.length === 0;
  if (typeof val === 'string') {
    val = val.trim();
    return val === '' || val === 'undefined' || val === 'null';
  }
  return val === undefined || val === null;
};

// 有效值 valid value
export const isValid = (val: any): boolean => !isInvalid(val);

// 获取ipv4地址
type ipv4 = {
  local: NetworkInterfaceInfoIPv4 | null,
  net: NetworkInterfaceInfoIPv4 | null,
  wsl: NetworkInterfaceInfoIPv4 | null,
};
export const getIPv4 = (): ipv4 => {
  const netInfos = networkInterfaces();
  const ips = <ipv4>{
    local: null,
    net: null,
    wsl: null,
  };
  for (const [key, addrs = []] of Object.entries(netInfos)) {
    if (/wsl/i.test(key)) {
      for (const addr of addrs) {
        if (addr.family === 'IPv4') {
          ips.wsl = addr;
        }
      }
    } else {
      for (const addr of addrs) {
        if (addr.family === 'IPv4') {
          if (addr.internal) {
            ips.local = addr;
          } else {
            ips.net = addr;
          }
        }
      }
    }
  }
  return ips;
};

// 获取有效查询字段
export const getQuerys = (outerQuerys: Object): {[k: string]: any} => {
  const querys: {[k: string]: any} = {};
  for (const [key, value] of Object.entries(outerQuerys)) {
    if (isValid(value)) querys[key] = value;
  }
  return querys;
};

// 获取带有分页的有效查询字段
type pagerQuerys = {
  page: number,
  pageSize: number,
  querys: Object,
};
export const getPagerQuerys = (outerQuerys: Object): pagerQuerys => {
  const {
    page,
    pageSize,
    ...querys
  } = Object.assign({
    page: 1,
    pageSize: 20,
  }, getQuerys(outerQuerys));
  return {
    page,
    pageSize,
    querys,
  };
};

// 获取bp.gif相关信息
type gifInfo = {
  file: Buffer,
  fileMime: string,
  fileSize: number,
};
export const getGifInfo = async (): Promise<gifInfo> => {
  const filePath = resolve(cwd, './public/image/bp.gif');
  const file = await readFile(filePath);
  const { size: fileSize } = await stat(filePath);
  const fileMime = mime.getType(filePath) ?? 'image/gif';
  return {
    file,
    fileMime,
    fileSize,
  };
};

// 从查询字符串获取数据
export const getDataFromUSP = (str: string): {[key: string]: any} => {
  const data: {[key: string]: any} = Object.create(null);
  const usp = new URLSearchParams(str);
  for (const key of new Set(usp.keys())) {
    const value  = usp.getAll(key);
    data[key] = value.length === 1 ? value[0] : value;
  }
  return data;
};
