import { Client } from "@hashgraph/sdk";
import { useState } from "react";
import { useMutation } from "react-query";
import { transferToken } from "../services/hedera";
import { HederaTokenBalance } from "../types";
import ErrorMessage from "./ErrorMessage";

interface ISendTokenProps {
  client: Client;
  senderId: string;
  isOpen: boolean;
  token: HederaTokenBalance;
  setIsOpen: (isOpen: boolean) => void;
  onSent: () => void;
}

const SendToken: React.FunctionComponent<ISendTokenProps> = ({
  client,
  senderId,
  token,
  isOpen,
  setIsOpen,
  onSent,
}) => {
  const [recipientId, setRecipientId] = useState("");
  const [amount, setAmount] = useState("0");
  const { mutateAsync: sendToken, error } = useMutation(() =>
    transferToken(client, senderId, recipientId, token.tokenId, Number(amount))
  );

  const handleSendToken = async (e: any) => {
    e.preventDefault();

    await sendToken();

    setRecipientId("");
    setAmount("0");

    onSent();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
          <div className="pointer-events-auto w-screen max-w-2xl">
            <form
              className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
              onSubmit={handleSendToken}
            >
              <div className="flex-1">
                <div className="bg-gray-50 px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between space-x-3">
                    <div className="space-y-1">
                      <h2
                        className="text-lg font-medium text-gray-900"
                        id="slide-over-title"
                      >
                        Send Your {token.name}
                      </h2>
                      <p className="text-sm text-gray-500">
                        Balance: {token.balance} {token.symbol}
                      </p>
                    </div>
                    <div className="flex h-7 items-center">
                      <button
                        type="button"
                        className="text-gray-400 hover:text-gray-500"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="sr-only">Close panel</span>
                        <svg
                          className="h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">
                  {!!error && (
                    <ErrorMessage
                      message="Error"
                      details={[JSON.stringify(error)]}
                    />
                  )}
                  <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                    <div>
                      <label
                        htmlFor="recipientId"
                        className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                      >
                        To Account Id
                      </label>
                    </div>
                    <div className="sm:col-span-2">
                      <input
                        type="text"
                        name="recipientId"
                        id="recipientId"
                        placeholder="0.0.xxxx"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={recipientId}
                        onChange={(e) => setRecipientId(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                    <div>
                      <label
                        htmlFor="amount"
                        className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                      >
                        Amount
                      </label>
                    </div>
                    <div className="sm:col-span-2">
                      <input
                        type="number"
                        min={0}
                        max={token.balance}
                        name="amount"
                        id="amount"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Send
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendToken;
