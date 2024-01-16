import React from "react"; 
import "./InstrumentText.css";

const InstrumentText = ({index, text}) => {
    return (
      <p className="instrumentText" key={index}>{text}</p>
    );
}

export default InstrumentText; 