import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

interface IHomeProps {
  children: React.ReactNode;
}

const Layout: React.FunctionComponent<IHomeProps> = ({ children }) => {
  const appContext = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!appContext.loggedInInfo.hederaAccount?.accountId) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appContext.loggedInInfo.hederaAccount?.accountId]);

  return <>{children}</>;
};

export default Layout;
