import Router from '@koa/router';
import * as ctrl from '@src/controllers/project';

export default (router: Router): void => {
  router.get('/projects', ctrl.query);

  router.post('/projects', ctrl.create);

  router.get('/projects/:id', ctrl.detail);

  router.put('/projects/:id', ctrl.update);

  router.delete('/projects/:id', ctrl.remove);
};
