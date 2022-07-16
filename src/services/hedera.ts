import {
  AccountBalanceQuery,
  AccountId,
  Client,
  PrivateKey,
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
