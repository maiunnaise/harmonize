import React from "react"; 
import "./PurpleButton.css";

const PurpleButton  = ({ onClick, buttonText }) => {
    return (
      <button type="button"  onClick={onClick}> {buttonText} </button>
    );
}

export default PurpleButton; 