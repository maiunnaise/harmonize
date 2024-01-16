import React from "react"; 
import "./HistoryButton.css";
import { Link } from "react-router-dom";

const HistoryButton  = ({ onClick, buttonText }) => {
    return (
      <Link to="/history">
        <button id="HistoryButton" onClick={onClick}> {buttonText} </button>
      </Link>
    );
}

export default HistoryButton; 