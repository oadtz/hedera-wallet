import {
  AccountBalanceQuery,
  AccountId,
  Client,
  PrivateKey,
  TokenInfoQuery,
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
