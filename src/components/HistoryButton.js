import React from "react"; 
import "./HistoryButton.css";
import { Link } from "react-router-dom";

const HistoryButton  = ({ onClick, buttonText, idCourse }) => {
    return (
      <Link to={`/history/${idCourse}`}>
        <button id="HistoryButton" onClick={onClick}> {buttonText} </button>
      </Link>
    );
}

export default HistoryButton; 