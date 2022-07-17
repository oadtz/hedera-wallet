import { Client } from "@hashgraph/sdk";

export type Wallet = {
  accounts: Record<string, HederaAccount>;
  tokens: Record<string, HederaToken>;
};

export type HederaAccount = {
  accountId: string;
  privateKey: string;
  testNet: boolean;
  client: Client;
};

export type HederaToken = {
  tokenId: string;
  name: string;
  symbol: string;
};

export type HederaTokenBalance = {
  tokenId: string;
  name: string;
  symbol: string;
  balance: number;
};
