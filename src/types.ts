export type Wallet = {
  accounts: Record<string, HederaAccount>;
};

export type HederaAccount = {
  accountId: string;
  privateKey: string;
  testNet: boolean;
};
