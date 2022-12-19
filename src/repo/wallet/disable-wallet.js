import { runQuery, allQuery } from "../sql/sql.js";
import { v1 as generateId, v4 as randomize } from "uuid";

export default async function disableWallet(userId){
  try {
    let currDate = new Date();
    let data = await allQuery("SELECT walletEnabled, balance FROM Wallet W LEFT JOIN Trans T ON W.userId = T.userId WHERE W.userId = ? ORDER BY T.transDate DESC LIMIT 1;",[userId]);
    if (data.length>0 && data[0].walletEnabled !== 0){
      data = data[0];
      let balance = data.balance;
      if (!balance) balance = 0;
      let generatedId = randomize()+generateId();
      await runQuery("BEGIN TRANSACTION");
      await runQuery("UPDATE Wallet SET walletEnabled = ?, walletUpdateDate = ? WHERE userId = ?",[0,currDate.toISOString(),userId]);
      await runQuery("INSERT INTO Trans (`id`,`userId`,`transDate`,`transTypeId`,`amount`,`balance`,`refId`) VALUES (?,?,?,?,?,?,?);",[generatedId,userId,currDate.toISOString(),2,0,balance,'null']);
      await runQuery("COMMIT");
      return {success: true, id: generatedId, userId: userId, disabledAt: currDate.toISOString(), balance: balance}
    }
    return {success: false};
  } catch (err){
    console.log(err);
    throw err;
  }
}