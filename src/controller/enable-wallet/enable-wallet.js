import enableWallet from '../../repo/wallet/enable-wallet.js';

export default async function enableWalletController(userId){
  let data = await enableWallet(userId);
  if (data.success){
    return {
      status: "success",
      data: {
        wallet: {
          id: data.id,
          owned_by: userId,
          status: "enabled",
          enabled_at: data.enabledAt,
          balance: data.balance
        }
      }
    };
  } else {
    return {status: "fail", data: {title: "Wallet already enabled."}};
  }
}