import Koa from 'koa';
import {koaBody} from 'koa-body';
import protectedRouter from './routes/protectedRoutes.js';
import unprotectedRouter from './routes/unprotectedRoutes.js';

const app = new Koa();

app.use(koaBody());
app.use(protectedRouter.routes()).use(protectedRouter.allowedMethods());
app.use(unprotectedRouter.routes()).use(unprotectedRouter.allowedMethods());

const server = app.listen(80);
console.log("Server running on port 80...");

export default server;