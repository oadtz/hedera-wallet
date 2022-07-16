import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

interface IHomeProps {
  children: React.ReactNode;
}

const Layout: React.FunctionComponent<IHomeProps> = ({ children }) => {
  const { wallet } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(wallet.accounts).length === 0) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet]);

  return <>{children}</>;
};

export default Layout;
