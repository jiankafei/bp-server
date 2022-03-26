# api 文档

## Project

```ts
type ProjectDoc = {
  proj_name: string, // readonly
  proj_desc?: string,
};
```

### GET /projects
获取项目列表

### POST /projects
新增项目

### GET /projects/:id
获取项目详情

### PUT /projects/:id
修改项目，项目名只读

### DELETE /projects/:id
删除项目


## Event

```ts
type EventPropDoc = {
  name: string, // readonly
  type: string, // readonly
  desc?: string,
};

type EventDoc = {
  proj_id: ObjectId,
  proj_name: string,
  event_type: string, // readonly
  event_desc?: string,
  event_props?: EventPropDoc[],
};
```

### GET /events
获取事件列表，支持以下查询
```js
{
  proj_id,
  proj_name,
  event_type,
  create_time,
  update_time,
}
```

### POST /events
新增事件

### GET /events/:id
获取事件详情

### PUT /events/:id
修改事件，事件名只读

### DELETE /events/:id
删除事件

### GET /preset-props
获取预置属性，参数type，不传参默认返回global
```js
/* global, pageview, click */
{
  type: 'global',
}
```

## Info

```ts
type InfoDoc = {
  proj_id: ObjectId,
  proj_name: string,
  event_id: ObjectId,
  event_type: string,
  visitor_id: string,
  detail: string,
};
```

### GET /infos
获取信息列表，支持以下查询
```js
{
  page,
  pageSize,
  proj_id,
  proj_name,
  event_id,
  event_type,
  visitor_id,
  create_time,
}
```

### POST /report/:proj_id
post上报信息

### GET /report/:proj_id/bp.gif
gif上报信息

## FalsyInfo

```ts
type FalsyInfoDoc = {
  proj_id: ObjectId,
  proj_name: string,
  event_id: ObjectId,
  event_type: string,
  visitor_id: string,
  detail: string,
  error_info: string,
};
```
### GET /falsy-infos
获取验证失败信息列表，支持以下查询
```js
{
  page,
  pageSize,
  proj_id,
  proj_name,
  event_id,
  event_type,
  visitor_id,
  create_time,
}
```
