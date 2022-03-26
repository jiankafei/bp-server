import Router from '@koa/router';
import project from './project';
import event from './event';
import info from './info';
import falsyInfo from './falsyInfo';

const prefix = process.env.ROUTER_PREFIX;

const router: Router = new Router({
  prefix,
});

project(router);
event(router);
info(router);
falsyInfo(router);

export default router;
