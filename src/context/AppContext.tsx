import React, { useContext, useState } from "react";
import { HederaAccount, HederaToken, Wallet } from "../types";

interface IAppContextProps {
  wallet: Wallet;
  addAccount: (account: HederaAccount) => void;
  addToken: (token: HederaToken) => void;
  clearAccounts: () => void;
}

const Context = React.createContext({} as IAppContextProps);

const AppContext: React.FunctionComponent<{
  children: React.ReactNode;
}> = (props) => {
  const [wallet, setWallet] = useState({
    accounts: {},
    tokens: {},
  });

  const clearAccounts = () => {
    setWallet({
      ...wallet,
      accounts: {},
    });
  };

  const addAccount = (account: HederaAccount) => {
    setWallet({
      ...wallet,
      accounts: {
        ...wallet.accounts,
        [account.accountId.toString()]: account,
      },
    });
  };

  const addToken = (token: HederaToken) => {
    setWallet({
      ...wallet,
      tokens: {
        ...wallet.tokens,
        [token.tokenId.toString()]: token,
      },
    });
  };

  return (
    <Context.Provider
      value={{
        wallet,
        addAccount,
        clearAccounts,
        addToken,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export const useAppContext = () => {
  return useContext(Context);
};

export default AppContext;
