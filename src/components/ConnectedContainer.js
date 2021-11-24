import React from "react";
import "../App.css";

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

export default ConnectedContainer;
