import sqlite3 from 'sqlite3'; sqlite3.verbose();
const db = new sqlite3.Database('database/wallet.db');

export function runQuery(query,param=[]){
  return new Promise((resolve, reject)=>{
    db.run(query,param,(err)=>{
      if (err) reject(err);
      resolve(true);
    });
  });
}

export function allQuery(query,param=[]){
  return new Promise((resolve, reject)=>{
    db.all(query,param,(err,rows)=>{
      if (err) reject(err);
      resolve(rows);
    });
  });
}