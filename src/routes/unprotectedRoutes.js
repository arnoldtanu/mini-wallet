import Router from '@koa/router';
import initialize from '../controller/initialize-account/initaccount.js';

const unprotectedRouter = new Router();

unprotectedRouter.post('/api/v1/init', async (ctx) => {
  ctx.body = await initialize(ctx.request.body.customer_xid);;
});

export default unprotectedRouter;