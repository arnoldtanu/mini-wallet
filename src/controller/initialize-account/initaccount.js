import initAccount from '../../repo/wallet/initialize.js';
import {createToken} from '../../repo/token/token.js';

export default async function initialize(userId){
  let data = await initAccount(userId);
  if (data){
    let token = await createToken(userId);
    return {status: "success", data: {token: token}};
  } else {
    return {status: "fail", data: {title: "account already initialized."}};
  }
}