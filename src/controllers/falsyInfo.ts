import {
  Context,
} from 'koa';
import model from '@src/models/falsyInfo';
import {
  getPagerQuerys,
} from '@src/util';

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
