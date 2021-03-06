import { Client } from "@hashgraph/sdk";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { useAppContext } from "../context/AppContext";
import { getBalances, getClient } from "../services/hedera";

const Login: React.FunctionComponent = () => {
  const appContext = useAppContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [hederaAccount, setHederaAccount] = useState({
    accountId: searchParams.get("accountId") || "",
    privateKey: "",
    testNet: true,
  });
  const [error, setError] = useState();

  const { mutateAsync: logIn, error: logInError } = useMutation<any, any, any>(
    (client: Client) => getBalances(client, hederaAccount.accountId)
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const accountClient = getClient(
        hederaAccount.accountId,
        hederaAccount.privateKey,
        hederaAccount.testNet
      );

      const balances = await logIn(accountClient);

      if (balances) {
        appContext.addAccount({ ...hederaAccount, client: accountClient });

        navigate(`/accounts/${hederaAccount.accountId}`);
      }
    } catch (e: any) {
      setError(e.toString());
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setHederaAccount({
      ...hederaAccount,
      [field]: value,
    });
  };

  useEffect(() => {
    if (logInError) {
      setError(logInError?.message || logInError?.toString());
    } else {
      setError(undefined);
    }
  }, [logInError]);

  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Logo"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your wallet
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {!!error && <ErrorMessage message="Error" details={[error]} />}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="accountId"
                className="block text-sm font-medium text-gray-700"
              >
                Account ID
              </label>
              <div className="mt-1">
                <input
                  id="accountId"
                  name="accountId"
                  type="text"
                  required
                  placeholder="0.0.xxxx"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={hederaAccount.accountId}
                  onChange={(e) =>
                    handleInputChange("accountId", e.target.value)
                  }
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="privateKey"
                className="block text-sm font-medium text-gray-700"
              >
                Private Key
              </label>
              <div className="mt-1">
                <input
                  id="privateKey"
                  name="privateKey"
                  type="password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={hederaAccount.privateKey}
                  onChange={(e) =>
                    handleInputChange("privateKey", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="testNet"
                  name="testNet"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  checked={hederaAccount.testNet}
                  onChange={(e) =>
                    handleInputChange("testNet", e.target.checked)
                  }
                />
                <label
                  htmlFor="testNet"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Testnet Account
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
