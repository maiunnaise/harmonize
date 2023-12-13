import React from "react"; 
import "./HistoryButton.css";

const HistoryButton  = ({ onClick, buttonText }) => {
    return (
      <button id="HistoryButton" onClick={onClick}> {buttonText} </button>
    );
}

export default HistoryButton; 