import classNames from "classnames";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import SendToken from "../components/SendToken";
import { useAppContext } from "../context/AppContext";
import { getBalances, getTokenInfo } from "../services/hedera";
import { HederaTokenBalance } from "../types";

const Account: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const { wallet, addToken } = useAppContext();
  const { accountId } = useParams();
  const [isSendTokenOpen, setIsSendTokenOpen] = useState(false);
  const [currentToken, setCurrentToken] = useState({} as HederaTokenBalance);

  const { data: balances, refetch: getAccountBalances } = useQuery(
    ["account-balances", { accountId }],
    () => {
      if (accountId && accountId in wallet.accounts) {
        const currentAccount = wallet.accounts[accountId];

        return getBalances(currentAccount.client, currentAccount.accountId);
      }
    }
  );

  const addTokenToWallet = async (id: string) => {
    if (accountId) {
      const currentAccount = wallet.accounts[accountId];

      const { tokenId, name, symbol } = await getTokenInfo(
        currentAccount.client,
        id
      );

      await addToken({ tokenId: tokenId.toString(), name, symbol });
    }
  };

  const handleOnSendClick = (tokenId: string) => {
    if (tokenId === "HBAR") {
      setCurrentToken({
        tokenId,
        // eslint-disable-next-line no-useless-escape
        balance: Number(balances?.hbars.toString().replace(/[^0-9\.]+/g, "")),
        name: "HBAR",
        symbol: balances?.hbars.toString().split(" ")[1] || "ℏ",
      });
    } else {
      setCurrentToken({
        tokenId,
        balance: Number(balances?.tokens?.get(tokenId.toString())),
        name: wallet.tokens[tokenId].name,
        symbol: wallet.tokens[tokenId].symbol,
      });
    }

    setIsSendTokenOpen(true);
  };

  const handleTokenSent = () => {
    setIsSendTokenOpen(false);
    getAccountBalances();
  };

  useEffect(() => {
    if (accountId && !(accountId in wallet.accounts)) {
      navigate(`/login/?accountId=${accountId}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (balances?.tokens) {
      Array.from(balances.tokens).forEach((token) => {
        const [tokenId] = token;

        if (!wallet.tokens[tokenId.toString()]) {
          addTokenToWallet(tokenId.toString());
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balances?.tokens]);

  return (
    <Layout>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-screen-lg">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Logo"
          />
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-screen-lg">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {Object.keys(wallet.accounts).map((id) => (
                <Link
                  key={id}
                  to={`/accounts/${id}`}
                  className={classNames(
                    {
                      "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300":
                        accountId !== id,
                      "border-indigo-500 text-indigo-600": accountId === id,
                    },
                    "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                  )}
                >
                  {id}
                </Link>
              ))}

              <Link
                to="/login"
                className="flex border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
              >
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Import Account
              </Link>
            </nav>
          </div>
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-screen-lg">
            <dl className="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-base font-normal text-gray-900">HBAR</dt>
                <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
                  <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                    {balances?.hbars.toString()}
                  </div>

                  <div>
                    <button
                      className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      onClick={() => handleOnSendClick("HBAR")}
                    >
                      Send
                    </button>
                  </div>
                </dd>
              </div>
              {Array.from(balances?.tokens || []).map(
                ([id, balance]) =>
                  wallet.tokens?.[id.toString()] && (
                    <div className="px-4 py-5 sm:p-6">
                      <dt className="text-base font-normal text-gray-900">
                        {wallet.tokens?.[id.toString()]?.name ||
                          "Untitled Token"}
                      </dt>
                      <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
                        <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                          {balance.toString()}{" "}
                          {wallet.tokens?.[id.toString()]?.symbol}
                        </div>

                        <div>
                          <button
                            className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                            onClick={() => handleOnSendClick(id.toString())}
                          >
                            Send
                          </button>
                        </div>
                      </dd>
                    </div>
                  )
              )}
            </dl>
          </div>
        </div>
      </div>
      {balances && currentToken && accountId && (
        <SendToken
          client={wallet.accounts[accountId].client}
          senderId={accountId}
          token={currentToken}
          isOpen={isSendTokenOpen}
          setIsOpen={setIsSendTokenOpen}
          onSent={handleTokenSent}
        />
      )}
    </Layout>
  );
};

export default Account;
