"use client";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from "wagmi";
import { useBalance } from "wagmi";
export function Profile() {
  const { address, isConnected } = useAccount();
  const { data: ensAvatar } = useEnsAvatar({ address });
  const { data: ensName } = useEnsName({ address });
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  console.log("connected to:", connectors);
  const { disconnect } = useDisconnect();

  const { data } = useBalance({ address: address });
  if (address) {
    console.log(
      "balance and address available:",
      data?.formatted,
      data?.symbol
    );
  }
  const handleConnectWallet = async () => {
    try {
      await connect();
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const handleDisconnectWallet = async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }
  };
  return (
    <div className="flex justify-center py-2 header-background space-x-12  ">
      <p className="text-2xl text-black font-bold">
        Certificate Verification System
      </p>
      {connectors.map(
        (connector) =>
          !isConnected && (
            <button
              className="border border-spacing-2 bg-green-400 p-5 rounded"
              disabled={!connector.ready}
              key={connector.id}
              onClick={() => connect({ connector })}
            >
              Log In
              {/* {connector.name} */}
              {!connector.ready && " (unsupported)"}
              {isLoading &&
                connector.id === pendingConnector?.id &&
                " (connecting)"}
            </button>
          )
      )}
      {
        <button
          className="border border-spacing-2 bg-green-400 p-5 rounded"
          onClick={handleDisconnectWallet}
        >
          Disconnect
        </button>
      }

      {error && <div>{error.message}</div>}
    </div>
  );
}
