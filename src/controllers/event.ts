import {
  Context,
} from 'koa';
import model from '@src/models/event';
import projModel from '@src/models/project';
import {
  getPagerQuerys,
  isValid,
} from '@src/util';
import presetProps, {
  clickProps,
  pageviewProps,
  pagestayProps,
} from '@src/preset-props/Props';

export const query = async (ctx: Context): Promise<void> => {
  try {
    const {
      page,
      pageSize,
      querys,
    } = getPagerQuerys(ctx.query);
    let action = model.find();
    for (const [key, val] of Object.entries(querys)) {
      action = action.where({[key]: val});
    }
    const docs = await action
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();
    const total = await model.countDocuments(querys);
    ctx.send({
      body: {
        data: docs,
        total,
      },
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
    if (isValid(body.proj_id)) {
      const projDoc = await projModel.findById(body.proj_id).exec();
      if (projDoc) {
        const doc = await model.create({
          ...body,
          proj_name: projDoc.proj_name,
        });
        ctx.send({ body: doc });
      } else {
        ctx.send({
          status: 400,
          message: `The project with id (${body.proj_id}) does not exist`
        });
      }
    } else {
      ctx.send({
        status: 400,
        message: 'proj_id is required',
      });
    }
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
    if (doc) {
      if (doc.event_type === '$click') {
        doc.event_props = clickProps;
      } else if (doc.event_type === '$pageview') {
        doc.event_props = pageviewProps;
      } else if (doc.event_type === '$pagestay') {
        doc.event_props = pagestayProps;
      }
      ctx.send({
        body: doc,
      });
    }
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

export const pp = async (ctx: Context): Promise<void> => {
  try {
    const { type = 'global' } = ctx.request.query;
    const body = presetProps[`${type}Props`];
    if (body) {
      ctx.send({
        body,
      });
    } else {
      throw new Error(`The preset props ${type} is not exist.`);
    }
  } catch (error: any) {
    ctx.send({
      status: 400,
      message: error.message,
    });
  }
};
