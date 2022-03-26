import Router from '@koa/router';
import * as ctrl from '@src/controllers/event';

export default (router: Router): void => {
  router.get('/events', ctrl.query);

  router.post('/events', ctrl.create);

  router.get('/events/:id', ctrl.detail);

  router.put('/events/:id', ctrl.update);

  router.delete('/events/:id', ctrl.remove);

  router.get('/preset-props', ctrl.pp);
};
