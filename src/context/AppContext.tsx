import React, { useContext, useState } from "react";
import { LoggedInInfo } from "../types";

interface IAppContextProps {
  loggedInInfo: LoggedInInfo;
  setLoggedInInfo: (info: LoggedInInfo) => void;
  clearLoggedInInfo: () => void;
}

const Context = React.createContext({} as IAppContextProps);

const AppContext: React.FunctionComponent<{
  children: React.ReactNode;
}> = (props) => {
  const [loggedInInfo, setLoggedInInfo] = useState({} as LoggedInInfo);

  const clearLoggedInInfo = () => {
    setLoggedInInfo({} as LoggedInInfo);
  };

  return (
    <Context.Provider
      value={{
        loggedInInfo,
        setLoggedInInfo,
        clearLoggedInInfo,
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
