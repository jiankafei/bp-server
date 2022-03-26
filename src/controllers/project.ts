import {
  Context,
} from 'koa';
import model from '@src/models/project';
import eventModel from '@src/models/event';
import {
  getQuerys,
} from '@src/util';

export const query = async (ctx: Context): Promise<void> => {
  try {
    const querys = getQuerys(ctx.query);
    const docs = await model.find(querys).exec();
    ctx.send({
      body: docs,
    });
  } catch (error: any) {
    ctx.send({
      status: 400,
      message: error.message,
    });
  }
};

export const create = async (ctx: Context): Promise<void> => {
  try {
    const { body } = ctx.request;
    const projDoc = await model.create(body);
    await eventModel.create({
      proj_id: projDoc._id,
      proj_name: projDoc.proj_name,
      event_type: '$pageview',
      event_desc: '预置$pageview事件',
      event_props: [],
    });
    await eventModel.create({
      proj_id: projDoc._id,
      proj_name: projDoc.proj_name,
      event_type: '$pagestay',
      event_desc: '预置$pagestay事件',
      event_props: [],
    });
    await eventModel.create({
      proj_id: projDoc._id,
      proj_name: projDoc.proj_name,
      event_type: '$click',
      event_desc: '预置$click事件',
      event_props: [],
    });
    ctx.send({
      body: projDoc,
    });
  } catch (error: any) {
    ctx.send({
      status: 400,
      message: error.message,
    });
  }
};

export const detail = async (ctx: Context): Promise<void> => {
  try {
    const { id } = ctx.params;
    const doc = await model.findById(id).exec();
    ctx.send({
      body: doc,
    });
  } catch (error: any) {
    ctx.send({
      status: 400,
      message: error.message,
    });
  }
};

export const update = async (ctx: Context): Promise<void> => {
  try {
    const { id } = ctx.params;
    const { body } = ctx.request;
    const doc = await model.findByIdAndUpdate(id, body).exec();
    ctx.send({
      body: doc,
    });
  } catch (error: any) {
    ctx.send({
      status: 400,
      message: error.message,
    });
  }
};

export const remove = async (ctx: Context): Promise<void> => {
  try {
    const { id } = ctx.params;
    await model.findByIdAndRemove(id).exec();
    ctx.send();
  } catch (error: any) {
    ctx.send({
      status: 400,
      message: error.message,
    });
  }
};
