import React from "react"; 
import "./PurpleButton.css";

const PurpleButton  = ({ onClick, buttonText, id }) => {
    return (
      <button type="button" id={id} onClick={onClick}> {buttonText} </button>
    );
}

export default PurpleButton; 