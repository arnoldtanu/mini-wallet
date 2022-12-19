import { allQuery } from "../sql/sql.js";

export default async function viewBalance(userId){
  try {
    let data = await allQuery("SELECT walletEnabled, walletUpdateDate, T.id as id, balance FROM Wallet W, Trans T WHERE W.userId = T.userId AND W.userId = ? ORDER BY T.transDate DESC LIMIT 1;",[userId]);
    if (data.length>0 && data[0].walletEnabled !== 0){
      data = data[0];
      let balance = data.balance;
      if (!balance) balance = 0;
      return {success: true, id: data.id, userId: userId, enabledAt: data.walletUpdateDate, balance: balance}
    }
    return {success: false};
  } catch (err){
    console.log(err);
    throw err;
  }
}