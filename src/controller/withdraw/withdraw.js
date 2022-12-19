import withdraw from '../../repo/wallet/withdraw.js';

export default async function withdrawController(userId,nominal,refId="-"){
  let data = await withdraw(userId,nominal,refId);
  if (data.success){
    return {
      status: "success",
      data: {
        withdrawal: {
          id: data.id,
          withdrawn_by: userId,
          status: "success",
          withdrawn_at: data.withdrawAt,
          amount: data.amount,
          reference_id: data.refId
        }
      }
    };
  } else {
    return {status: "fail", data: {title: "Wallet still disabled or deposits amount must greater than zero."}};
  }
}