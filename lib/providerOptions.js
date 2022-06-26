import WalletConnectProvider from "@walletconnect/web3-provider";
import Torus from "@toruslabs/torus-embed";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

const providerOptions = {
  torus: {
    package: Torus, // required
  },
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: process.env.PROJECT_ID, // Required
    },
  },
  coinbasewallet: {
    package: CoinbaseWalletSDK, // Required
    options: {
      appName: "Vyeti", // Required
      infuraId: process.env.PROJECT_ID, // Required
    },
  },
};
export default providerOptions;
