import {
  AccountBalanceQuery,
  AccountId,
  Client,
  Hbar,
  PrivateKey,
  TokenInfoQuery,
  TransferTransaction,
} from "@hashgraph/sdk";

export const getClient = (
  accountId: string,
  privateKey: string,
  testNet: boolean = false
): Client => {
  const client = testNet ? Client.forTestnet() : Client.forMainnet();

  client.setOperator(
    AccountId.fromString(accountId),
    PrivateKey.fromString(privateKey)
  );

  return client;
};

export const getBalances = async (client: Client, accountId: string) => {
  const query = new AccountBalanceQuery({ accountId });

  const balances = await query.execute(client);

  return balances;
};

export const getTokenInfo = async (client: Client, tokenId: string) => {
  const query = new TokenInfoQuery({ tokenId });

  const token = await query.execute(client);

  return token;
};

export const transferToken = async (
  client: Client,
  senderId: string,
  recipientId: string,
  tokenId: string,
  amount: number
) => {
  let transaction;
  if (tokenId === "HBAR") {
    transaction = new TransferTransaction()
      .addHbarTransfer(senderId, new Hbar(-amount))
      .addHbarTransfer(recipientId, new Hbar(amount));
  } else {
    transaction = new TransferTransaction()
      .addTokenTransfer(tokenId, senderId, -amount)
      .addTokenTransfer(tokenId, recipientId, amount);
  }

  const txResponse = await transaction.execute(client);

  const receipt = await txResponse.getReceipt(client);

  return receipt;
};
