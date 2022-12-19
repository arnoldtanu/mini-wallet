import topup from '../../repo/wallet/topup.js';

export default async function topupController(userId,nominal,refId="-"){
  let data = await topup(userId,nominal,refId);
  if (data.success){
    return {
      status: "success",
      data: {
        deposit: {
          id: data.id,
          deposited_by: userId,
          status: "success",
          deposited_at: data.depositAt,
          amount: data.amount,
          reference_id: data.refId
        }
      }
    };
  } else {
    return {status: "fail", data: {title: "Wallet still disabled or deposits amount must greater than zero."}};
  }
}