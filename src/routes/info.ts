import Router from '@koa/router';
import * as ctrl from '@src/controllers/info';

export default (router: Router): void => {
  router.get('/infos', ctrl.query);

  router.post('/report/:proj_id', ctrl.create);

  router.get('/report/:proj_id/bp.gif', ctrl.gifCreate);
};
