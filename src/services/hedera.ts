import {
  AccountBalanceQuery,
  AccountId,
  Client as HederaClient,
  PrivateKey,
} from "@hashgraph/sdk";

let client: HederaClient;

export const getBalances = async (
  accountId: string,
  privateKey: string,
  forTestNet: boolean = false
) => {
  client = forTestNet ? HederaClient.forTestnet() : HederaClient.forMainnet();

  client.setOperator(
    AccountId.fromString(accountId),
    PrivateKey.fromString(privateKey)
  );

  const query = new AccountBalanceQuery({ accountId });

  const balances = await query.execute(client);

  return balances;
};
