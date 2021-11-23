import React, { useState, useEffect } from "react";
import twitterLogo from "./assets/twitter-logo.svg";
import useWindowEvent from "./hooks/useWindowEvent";
import "./App.css";

// Constants
const TWITTER_HANDLE = "_buildspace";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const TEST_GIFS = [
  "https://media.giphy.com/media/o6OA5LLKQk5ltBxNq5/giphy.gif",
  "https://media.giphy.com/media/Jo1TR2bsqRH3I7FNFk/giphy.gif",
  "https://media.giphy.com/media/fRhMTh9LuhlLSIyZLf/giphy.gif",
  "https://media.giphy.com/media/MBax1Nf7osivL1B0yc/giphy.gif",
  "https://media.giphy.com/media/OGtyRv7TNQHcVTIncb/giphy.gif",
  "https://media.giphy.com/media/QsPCsPiknQrWU/giphy.gif",
  "https://media.giphy.com/media/F1ZjBJBmzdJYXhYDAb/giphy.gif",
  "https://media.giphy.com/media/3c9GcxCpDoP6jVW3xU/giphy.gif",
  "https://media.giphy.com/media/hQpO8jEWvyBlzOFIFQ/giphy.gif",
];

const ConnectedContainer = ({ gifList, inputValue, setInputValue }) => {
  const sendGif = async () => {
    if (inputValue.length > 0) {
      console.log("Gif link:", inputValue);
    } else {
      console.log("Empty input. Try again.");
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendGif();
  };
  return (
    <div className="connected-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter gif link!"
          onChange={handleChange}
          value={inputValue}
        />
        <button type="submit" className="cta-button submit-gif-button">
          Submit
        </button>
      </form>
      <div className="gif-grid">
        {gifList.map((gif) => (
          <div className="gif-item" key={gif}>
            <img src={gif} alt={gif} />
          </div>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [gifList, setGifList] = useState([]);

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;
      if (solana?.isPhantom) {
        console.log("Phantom wallet found!");
        const response = await solana.connect({ onlyIfTrusted: true });
        console.log(
          "Connected with Public Key:",
          response.publicKey.toString()
        );
        setWalletAddress(response.publicKey.toString());
      } else {
        alert("Solana object not found! Get a Phantom Wallet 👻");
      }
    } catch (err) {
      console.log(`ERROR: `, err);
    }
  };

  useEffect(() => {
    if (walletAddress) {
      console.log("Fetching GIF list...");
      setGifList(TEST_GIFS);
    }
  }, [walletAddress]);

  useWindowEvent("load", checkIfWalletIsConnected);

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

  const ConnectWalletButton = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );

  return (
    <div className="App">
      <div className={walletAddress ? "authed-container" : "container"}>
        <div className="header-container">
          <p className="header">🖼 Mets GIF Portal</p>
          <p className="sub-text">
            View your GIF collection in the metaverse ✨
          </p>
          {!walletAddress && <ConnectWalletButton />}
          {walletAddress && (
            <ConnectedContainer
              setInputValue={setInputValue}
              inputValue={inputValue}
              gifList={gifList}
            />
          )}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
