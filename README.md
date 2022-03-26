# bp-server

## preset-props

1. Props.ts: 用于定义预置属性。
2. Scheme.ts: 用于定义预置属性模型。

## ecosystem.config.js

pm2 配置文件

## global.d.ts

定义对外暴露的js文件的类型和第三方库的类型扩展

## [API文档](./API.md)

## 路径别名 (@src)

```ts
// 示例
import aaa from '@src/aaa';
```

## env

环境变量通过根目录 .env[.NODE_ENV] 文件设置即可

环境变量文件
```env
.env
.env.[NODE_ENV]
```

当前环境变量
```env
DB_USERNAME
DB_PASSWORD
DB_IP
DB_PORT
DB_DATEBASE
PORT
ROUTER_PREFIX # 服务路由前缀
```

## scripts

1. build-ts: 编译ts到输出目录
2. watch-ts: 监听改动动态编辑
3. node: node 启动服务
4. nodemon: nodemon 启动服务
5. pm2-dev: pm2 development 环境启动
6. pm2-prod: pm2 production 环境启动
7. pm2-stop: 停止 pm2 服务
8. pm2-kill: 停止 所有服务并停止 pm2 守护进程
