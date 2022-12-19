import viewBalance from '../../repo/wallet/view-balance.js';

export default async function viewBalanceController(userId){
  let data = await viewBalance(userId);
  if (data.success){
    return {
      status: "success",
      data: {
        wallet: {
          id: data.id,
          deposited_by: userId,
          status: "enabled",
          enabled_at: data.enabledAt,
          balance: data.balance
        }
      }
    };
  } else {
    return {status: "fail", data: {title: "Wallet still disabled or deposits amount must greater than zero."}};
  }
}