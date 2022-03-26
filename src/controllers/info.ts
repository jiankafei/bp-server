import {
  Context,
} from 'koa';
import Ajv from 'ajv';
import model from '@src/models/info';
import projModel from '@src/models/project';
import eventModel from '@src/models/event';
import falsyInfoModel from '@src/models/falsyInfo';
import {
  getPagerQuerys,
  getGifInfo,
  getDataFromUSP,
} from '@src/util';
import {
  globalScheme,
  clickScheme,
  pageviewScheme,
  pagestayScheme,
} from '@src/preset-props/Scheme';
import getLogger from '@src/getLogger';

const logger = getLogger();

// 生成校验实例
const ajv = new Ajv();

// 提前获取gif图片信息
const gifInfoPm = getGifInfo();

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
        list: docs,
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

// 创建合法的信息
type obj = {[k: string]: any};
const createProcess = async (params: obj, data: string) => {
  try {
    const { proj_id } = params;
    const { $vid, $evt, ...detail } = getDataFromUSP(data);
    if (!$vid) {
      throw new Error('vid is required');
    }
    const eventType = $evt;
    if (!eventType) {
      throw new Error('$evt is required');
    }
    const projDoc = await projModel.findById(proj_id).exec();
    if (!projDoc) {
      throw new Error(`The project with id "(${proj_id})" does not exist`);
    }
    const eventDoc = await eventModel.findOne({ event_type: eventType }).exec();
    if (!eventDoc) {
      throw new Error(`The event with type "(${eventType})" does not exist`);
    }
    let schema: obj;
    if (eventType === '$pageview') {
      schema = pageviewScheme;
    } else if (eventType === '$pagestay') {
      schema = pagestayScheme;
    } else if (eventType === '$click') {
      schema = clickScheme;
    } else {
      const eventProps = eventDoc.event_props ?? [];
      schema = {
        type: 'object',
        properties: {
          ...globalScheme.properties,
        },
      };
      for (const { name, type } of eventProps) {
        schema.properties[name] = { type, required: true };
      }
    }
    const validate = ajv.compile(schema);
    const doc: obj = {
      proj_id,
      proj_name: projDoc.proj_name,
      event_id: eventDoc._id,
      event_type: eventType,
      visitor_id: $vid,
      detail: JSON.stringify(detail),
    };
    if (validate(detail)) {
      await model.create(doc);
    } else {
      doc.error_info = JSON.stringify(validate.errors);
      logger.debug(validate.errors);
      console.log(validate.errors)
      await falsyInfoModel.create(doc);
    }
  } catch (error: any) {
    logger.debug(error.message);
    console.log(400, error.message);
  }
};

export const create = async (ctx: Context): Promise<void> => {
  createProcess(ctx.params, ctx.request.body);
  ctx.send();
};

export const gifCreate = async (ctx: Context): Promise<void> => {
  createProcess(ctx.params, ctx.request.querystring);
  try {
    const gifRes = await gifInfoPm;
    ctx.send({
      type: gifRes.fileMime,
      length: gifRes.fileSize,
      body: gifRes.file,
    });
  } catch (error) {
    const body = 'data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAAAICTAEAOw==';
    ctx.send({
      type: 'image/gif',
      length: Buffer.byteLength(body),
      body,
    });
  }
};
