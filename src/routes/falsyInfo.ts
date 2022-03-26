import Router from '@koa/router';
import * as ctrl from '@src/controllers/falsyInfo';

export default (router: Router): void => {
  router.get('/falsy-infos', ctrl.query);
};
