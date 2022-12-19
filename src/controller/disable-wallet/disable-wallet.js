import disableWallet from '../../repo/wallet/disable-wallet.js';

export default async function enableWalletController(userId){
  let data = await disableWallet(userId);
  if (data.success){
    return {
      status: "success",
      data: {
        wallet: {
          id: data.id,
          owned_by: userId,
          status: "disabled",
          enabled_at: data.disabledAt,
          balance: data.balance
        }
      }
    };
  } else {
    return {status: "fail", data: {title: "Wallet already disabled."}};
  }
}