import {findToken} from '../repo/token/token.js'

export function checkToken() {
  return async (ctx, next) => {
    let data = await findToken(ctx.request.header.authorization);
    // console.log("middleware checkToken", ctx.request.header.authorization, data);
    if (data.valid){
      ctx.state.userId = data.userId;
      return next();
    } else {
      ctx.status = 403;
      return false;
    }
  };
}