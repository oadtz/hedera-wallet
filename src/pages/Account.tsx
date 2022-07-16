import { useEffect } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useAppContext } from "../context/AppContext";
import { getBalances } from "../services/hedera";

const Account: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const { wallet } = useAppContext();
  const { accountId } = useParams();

  const { data: balances } = useQuery(
    ["account-balances", { accountId }],
    () => {
      if (accountId && accountId in wallet.accounts) {
        const currentAccount = wallet.accounts[accountId];

        return getBalances(currentAccount.client, currentAccount.accountId);
      }
    }
  );

  useEffect(() => {
    if (accountId && !(accountId in wallet.accounts)) {
      navigate(`/login/?accountId=${accountId}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Layout>{JSON.stringify(balances)}</Layout>;
};

export default Account;
