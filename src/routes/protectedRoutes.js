import Router from '@koa/router';
import { checkToken } from './../middleware/checkToken.js';
import enableWalletController from '../controller/enable-wallet/enable-wallet.js';
import disableWalletController from '../controller/disable-wallet/disable-wallet.js';
import topupController from '../controller/topup/topup.js';
import withdrawController from '../controller/withdraw/withdraw.js';
import viewBalanceController from '../controller/view-balance/viewBalance.js';

const protectedRouter = new Router();
protectedRouter.use(checkToken());

var failedResponse = { status: "fail", data: { title: ""} }

protectedRouter.post('/api/v1/wallet', async (ctx) => {
  ctx.body = await enableWalletController(ctx.state.userId);
});

protectedRouter.patch('/api/v1/wallet', async (ctx) => {
  ctx.body = await disableWalletController(ctx.state.userId);
});

protectedRouter.get('/api/v1/wallet', async (ctx) => {
  ctx.body = await viewBalanceController(ctx.state.userId);
});

protectedRouter.post('/api/v1/wallet/deposits', async (ctx) => {
  if (!ctx.request.body.amount){
    failedResponse.data.title = "amount is required!";
    ctx.body = failedResponse;
  } else {
    ctx.body = await topupController(ctx.state.userId,ctx.request.body.amount,ctx.request.body.reference_id);
  }
});

protectedRouter.post('/api/v1/wallet/withdrawals', async (ctx) => {
  if (!ctx.request.body.amount){
    failedResponse.data.title = "amount is required!";
    ctx.body = failedResponse;
  } else {
    ctx.body = await withdrawController(ctx.state.userId,ctx.request.body.amount,ctx.request.body.reference_id);
  }
});

export default protectedRouter;