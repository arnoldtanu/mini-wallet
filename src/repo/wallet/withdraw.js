import { runQuery, allQuery } from "../sql/sql.js";
import { v1 as generateId, v4 as randomize } from "uuid";

export default async function withdraw(userId,nominal=0,refId="-"){
  try {
    let currDate = new Date();
    let data = await allQuery("SELECT walletEnabled, balance FROM Wallet W LEFT JOIN Trans T ON W.userId = T.userId WHERE W.userId = ? ORDER BY T.transDate DESC LIMIT 1;",[userId]);
    if (data.length>0 && data[0].walletEnabled !== 0 && nominal > 0){
      data = data[0];
      let balance = data.balance;
      if (!balance) balance = 0;
      if (balance < nominal) return {success: false, reason: "insufficient balance"}
      balance = balance - nominal;
      let generatedId = randomize()+generateId();
      await runQuery("INSERT INTO Trans (`id`,`userId`,`transDate`,`transTypeId`,`amount`,`balance`,`refId`) VALUES (?,?,?,?,?,?,?);",[generatedId,userId,currDate.toISOString(),4,nominal,balance,refId]);
      return {success: true, id: generatedId, userId: userId, withdrawAt: currDate.toISOString(), amount: nominal, balance: balance, refId: refId}
    }
    return {success: false};
  } catch (err){
    console.log(err);
    throw err;
  }
}