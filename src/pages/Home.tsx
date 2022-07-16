import { useQuery } from "react-query";
import Layout from "../components/Layout";
import { useAppContext } from "../context/AppContext";
import { getBalances } from "../services/hedera";

const Home: React.FunctionComponent = () => {
  const appContext = useAppContext();

  const { data: balances } = useQuery("account-balances", () =>
    getBalances(
      appContext.loggedInInfo.hederaAccount?.accountId,
      appContext.loggedInInfo.hederaAccount?.privateKey,
      appContext.loggedInInfo.hederaAccount?.testNet
    )
  );

  return <Layout>-{JSON.stringify(balances)}</Layout>;
};

export default Home;
