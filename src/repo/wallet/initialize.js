import { runQuery, allQuery } from "../sql/sql.js";

export default async function initAccount(userId){
  try {
    let currDate = new Date();
    let data = await allQuery("SELECT createdAt FROM Wallet WHERE userId = ?;",[userId]);
    if (data.length < 1){
      await runQuery("INSERT INTO Wallet (`userId`,`walletEnabled`,`walletUpdateDate`,`createdAt`,`updatedAt`) VALUES (?,?,?,?,?);",[userId,0,currDate.toISOString(),currDate.toISOString(),currDate.toISOString()]);
    } else {
      return false;
    }
    return true;
  } catch (err){
    throw err;
  }
}