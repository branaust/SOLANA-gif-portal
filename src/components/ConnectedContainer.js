import { getProvider, Program } from "@project-serum/anchor";
import React from "react";
import "../App.css";

const ConnectedContainer = ({
  createGifAccount,
  gifList,
  inputValue,
  setInputValue,
  sendGif
}) => {


  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendGif();
  };
  return !gifList ? (
    <div className="connected-container">
      <button
        className="cta-button submit-gif-button"
        onClick={createGifAccount}
      >
        Do One-Time Initialization For GIF Program Account
      </button>
    </div>
  ) : (
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
            <img src={gif.gifLink} alt={gif} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectedContainer;
