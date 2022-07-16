import React, { useContext, useState } from "react";
import { HederaAccount, Wallet } from "../types";

interface IAppContextProps {
  wallet: Wallet;
  addAccount: (account: HederaAccount) => void;
  clearAccounts: () => void;
}

const Context = React.createContext({} as IAppContextProps);

const AppContext: React.FunctionComponent<{
  children: React.ReactNode;
}> = (props) => {
  const [wallet, setWallet] = useState({
    accounts: {},
  });

  const clearAccounts = () => {
    setWallet({
      accounts: {},
    });
  };

  const addAccount = (account: HederaAccount) => {
    setWallet({
      accounts: {
        ...wallet.accounts,
        [account.accountId.toString()]: account,
      },
    });
  };

  return (
    <Context.Provider
      value={{
        wallet,
        addAccount,
        clearAccounts,
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
