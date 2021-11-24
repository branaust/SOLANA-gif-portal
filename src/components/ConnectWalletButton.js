import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

const ConnectWalletButton = () => {
  const { setWalletAddress } = useContext(AuthContext);

  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log(`Connected with Public Key ${response.publicKey.toString()}`);
      setWalletAddress(response.publicKey.toString());
    } else {
      alert("Solana object not found! Get a Phantom Wallet 👻");
    }
  };
  return (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );
};

export default ConnectWalletButton;
