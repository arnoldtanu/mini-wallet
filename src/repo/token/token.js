import { runQuery, allQuery } from "../sql/sql.js";
import { v4 as randomize } from "uuid";

export async function createToken(userId){
  try {
    let token = randomize();
    let currDate = new Date();
    let expiredDate = new Date(Date.now() + (15 * 60 * 1000));
    await runQuery("INSERT INTO Token (	`userId`,`token`,`createdAt`,`expiredAt`) VALUES (?,?,?,?);",[userId,token,currDate.toISOString(),expiredDate.toISOString()]);
    return token;
  } catch (err){
    throw err;
  }
}

export async function findToken(token){
  try {
    let currDate = new Date();
    let expiredDate = new Date(Date.now() + (15 * 60 * 1000));
    let userId = await allQuery("SELECT userId FROM Token WHERE token = ? AND expiredAt >= ?;",[token, currDate]);
    if (userId.length>0){
      userId = userId[0].userId;
      runQuery("UPDATE Token SET expiredAt = ? WHERE token = ?",[expiredDate.toISOString(),token]);
      return {valid: true, userId:userId};
    }
    return {valid: false}
  } catch (err){
    throw err;
  }
}